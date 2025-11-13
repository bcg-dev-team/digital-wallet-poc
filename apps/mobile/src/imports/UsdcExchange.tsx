import { useMemo, useState } from "react";
import { Button, Input, SmallButton } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  formatCurrency,
  formatNumber,
} from "../constants/wallet";

const dtPerUsdc = AVAILABLE_USDC_KRW / AVAILABLE_USDC_AMOUNT;

type AmountMode = "manual" | "max";

const parseNumber = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
};

const formatDecimal = (value: number) =>
  new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(value);

interface UsdcExchangeProps {
  onNavigateBack?: () => void;
  onSubmit?: (params: { usdcAmount: number; expectedDt: number }) => void;
}

export default function UsdcExchange({ onNavigateBack, onSubmit }: UsdcExchangeProps) {
  const [amountMode, setAmountMode] = useState<AmountMode>("manual");
  const [usdcAmount, setUsdcAmount] = useState<string>("");

  const usdcNumeric = useMemo(() => parseNumber(usdcAmount), [usdcAmount]);
  const expectedDt = useMemo(() => usdcNumeric * dtPerUsdc, [usdcNumeric]);

  const handleAmountChange = (value: string) => {
    const numeric = parseNumber(value);
    setAmountMode("manual");
    setUsdcAmount(numeric ? formatNumber(numeric) : "");
  };

  const handleSelectManual = () => {
    setAmountMode("manual");
    setUsdcAmount("");
  };

  const handleSelectMax = () => {
    setAmountMode("max");
    setUsdcAmount(formatNumber(AVAILABLE_USDC_AMOUNT));
  };

  const isNextDisabled = usdcNumeric <= 0;

  const handleSubmit = () => {
    if (isNextDisabled) return;
    onSubmit?.({ usdcAmount: usdcNumeric, expectedDt });
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
      <MobilePageHeader title="USDC 환전" onBack={onNavigateBack} />

      <main className="flex-1 overflow-y-auto px-5 pb-28 pt-8">
        <section className="space-y-2 text-left">
          <h2 className="text-[20px] font-semibold text-[#111111]">환전 금액을 입력하세요</h2>
          <p className="text-[14px] text-[#777e8c]">
            최대 {formatNumber(AVAILABLE_USDC_AMOUNT)} USDC까지 DT로 환전할 수 있어요.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#111111]">환전 USDC 수량</span>
              <div className="flex items-center gap-2 rounded-[6px] bg-[#e7eaef] p-1">
                <SmallButton
                  variant={amountMode === "manual" ? "primary" : "default"}
                  className="px-3"
                  onClick={handleSelectManual}
                >
                  직접입력
                </SmallButton>
                <SmallButton
                  variant={amountMode === "max" ? "primary" : "default"}
                  className="px-3"
                  onClick={handleSelectMax}
                >
                  최대한도
                </SmallButton>
              </div>
            </div>
            <Input
              value={usdcAmount}
              placeholder="환전할 USDC 수량을 입력하세요"
              onChange={(event) => handleAmountChange(event.target.value)}
              inputMode="numeric"
              suffix={<span className="pr-4 text-[14px] text-[#111111]">USDC</span>}
            />
          </div>

          <div className="rounded-[16px] border border-[#ebedf5] bg-[#f8f9fd] px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#777e8c]">예상 수령액</span>
              <span className="text-[16px] font-semibold text-[#111111]">
                {expectedDt > 0 ? formatDecimal(expectedDt) : "0"} DT
              </span>
            </div>
            <p className="mt-2 text-[12px] text-[#999ea4]">
              1 USDC ≈ {formatDecimal(dtPerUsdc)} DT 기준으로 계산됩니다.
            </p>
          </div>

          <div className="rounded-[12px] bg-[#f4f6f9] px-4 py-3 text-[13px] text-[#555d6d]">
            <p>환전 완료 후 DT는 지갑 보유 자산에 추가됩니다.</p>
          </div>
        </section>
      </main>

      <MobileStickyFooter>
        <Button variant="primary" size="lg" className="w-full" disabled={isNextDisabled} onClick={handleSubmit}>
          다음
        </Button>
      </MobileStickyFooter>
    </div>
  );
}