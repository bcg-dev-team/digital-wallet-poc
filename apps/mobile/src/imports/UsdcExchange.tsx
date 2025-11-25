import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import { Clock, Info, RefreshCw } from "lucide-react";
import { Button, Input, SmallButton } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import { AVAILABLE_USDC_AMOUNT, AVAILABLE_USDC_KRW, formatCurrency, formatNumber, KRW_USD_EXCHANGE_RATE } from "../constants/wallet";
import { USDC_CONTRACT_ADDRESS } from "./myWallet";
import { useMyWallet } from "../contexts/WalletContext";
import api from "../api/api";
import { ethers } from "ethers";
import { useDeposit } from "../contexts/DepositContext";

const dtPerUsdc = AVAILABLE_USDC_KRW / AVAILABLE_USDC_AMOUNT;
const BRIDGE_FEE_RATE = 0.001;

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
  const { wallet } = useMyWallet();
  const { setExchangeAmount } = useDeposit();
  const [amountMode, setAmountMode] = useState<AmountMode>("manual");
  const [usdcAmount, setUsdcAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const usdcNumeric = useMemo(() => parseNumber(usdcAmount), [usdcAmount]);
  const expectedDt = useMemo(() => usdcNumeric * KRW_USD_EXCHANGE_RATE, [usdcNumeric]);
  const bridgeFeeDt = useMemo(() => (expectedDt ? expectedDt * BRIDGE_FEE_RATE : 0), [expectedDt]);
  const finalDt = useMemo(() => Math.max(expectedDt - bridgeFeeDt, 0), [expectedDt, bridgeFeeDt]);

  const lastUpdatedTime = useMemo(
    () =>
      new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    []
  );

  const handleAmountChange = (value: string) => {
    const numeric = parseNumber(value);
    setAmountMode("manual");
    setUsdcAmount(numeric ? formatNumber(numeric) : "");
  };

  const handleSelectManual = () => {
    setAmountMode("manual");
    setUsdcAmount("");
  };

  const handleSelectMax = async () => {
    setAmountMode("max");
    setUsdcAmount(formatNumber(wallet.balance));
  };

  const isSubmitDisabled = usdcNumeric <= 0 || isLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) {
      return;
    }
    setIsLoading(true);
    document.body.style.cursor = 'wait';

    // alert(`환전 요청 금액: ${usdcNumeric} USDC\n예상 수령액: ${Math.round(finalDt)} DT`);

    const usedNum = ethers.parseUnits(usdcNumeric.toString(), 18);

    const addr = wallet.getAddress();
    try {
      const response = await api.post("/swap", {
        holder: addr,
        amount: usedNum.toString()
      });

      //alert(response.data);

      if (response.status == 200) {
        // return { success: 200, data: response.data };
        alert("환전 요청이 성공적으로 접수되었습니다.");
        alert(response.data)
      }
    } catch (err: Error | any) {
      alert("환전 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      alert(err.message);
      setIsLoading(false);
      document.body.style.cursor = 'default';
      return;
      // if (err.status == 422) {
      //   return { success: 422, err_msg: err.message };
      // } else {
      //   return { success: -1, err_msg: err.message };
      // }
    }

    if (setExchangeAmount) {
      setExchangeAmount(usdcNumeric);
    }
    if (!onSubmit) {
      alert("onSubmit is not defined");
      return;
    }
    onSubmit?.({ usdcAmount: usdcNumeric, expectedDt });
    setIsLoading(false);
    document.body.style.cursor = 'default';
  };

  const summaryRows = [
    {
      label: "환전 금액",
      value: usdcNumeric > 0 ? `${formatNumber(usdcNumeric)} USDC` : "0 USDC",
    },
    {
      label: "적용 환율",
      value: `${formatDecimal(KRW_USD_EXCHANGE_RATE)}원/USD`,
    },
    {
      label: "예상 수령",
      value: expectedDt > 0 ? `${formatNumber(Math.round(expectedDt))} DT` : "0 DT",
    },
    {
      label: "브릿지 수수료",
      value: `${expectedDt > 0 ? formatNumber(Math.round(bridgeFeeDt)) : "0"} DT(${(BRIDGE_FEE_RATE * 100).toFixed(1)}%)`,
    },
  ];

  const finalReceiveLabel =
    finalDt > 0
      ? `${formatNumber(Math.round(finalDt))} DT (=${formatCurrency(Math.round(finalDt))})`
      : "0 DT (=0원)";

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
      <MobilePageHeader title="USDC 환전" onBack={onNavigateBack} />

      <main className="flex-1 overflow-y-auto text-left">
        <section className="space-y-6 px-5 pb-10 pt-8">
          <div className="space-y-1">
            <p className="text-[20px] font-bold leading-[28px] text-[#111111]">환전할 금액을</p>
            <p className="text-[20px] font-bold leading-[28px] text-[#111111]">입력해주세요</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-[#111111]">환율 정보</span>
              <Info className="size-[16px] text-[#2a3fec]" strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[26px] font-bold leading-[32px] text-[#111111]">
                  {formatDecimal(KRW_USD_EXCHANGE_RATE)}원
                </span>
                <button
                  type="button"
                  className="rounded-full p-1 text-[#999ea4] transition-colors hover:text-[#2a3fec]"
                  aria-label="환율 새로 고침"
                >
                  <RefreshCw className="size-[18px]" strokeWidth={2} />
                </button>
              </div>
              <span className="text-[11px] text-[#999ea4]">마지막 업데이트: {lastUpdatedTime}</span>
            </div>
            <p className="text-[11px] text-[#999ea4]">(한국은행 매매기준율)</p>
          </div>

          <div className="flex items-center gap-2 rounded-[4px] bg-[#f1f2ff] px-[10px] py-[6px] text-[11px] text-[#2a3fec]">
            <Info className="size-[14px]" strokeWidth={2} aria-hidden="true" />
            <span>DT는 원화(KRW)에 페깅됩니다 (1DT = 1KRW)</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#111111]">환전 금액(USDC)</span>
                <div className="flex items-center gap-2 rounded-[6px] bg-[#e7eaef] p-1">
                  <SmallButton
                    variant={amountMode === "manual" ? "primary" : "default"}
                    className={clsx(
                      "px-3",
                      amountMode === "manual" && "shadow-[0px_0px_4px_rgba(17,17,17,0.18)]"
                    )}
                    onClick={handleSelectManual}
                  >
                    직접입력
                  </SmallButton>
                  <SmallButton
                    variant={amountMode === "max" ? "primary" : "default"}
                    className={clsx(
                      "px-3",
                      amountMode === "max" && "shadow-[0px_0px_4px_rgba(17,17,17,0.18)]"
                    )}
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

            <div className="space-y-2">
              <span className="text-[14px] font-medium text-[#999ea4]">예상 수령액</span>
              <Input
                value={expectedDt > 0 ? formatDecimal(expectedDt) : "0"}
                readOnly
                inputMode="numeric"
                className="text-[#333950]"
                suffix={<span className="pr-4 text-[14px] text-[#111111]">DT</span>}
              />
            </div>
          </div>
        </section>

        <div className="h-[10px] w-full bg-[#f6f6f9]" />

        <section className="space-y-6 px-5 py-10">
          <h3 className="text-[14px] font-bold text-[#111111]">환전 요약</h3>
          <div className="rounded-[12px] border border-[#ebedf5] bg-white px-5 py-4">
            {summaryRows.map((row, index) => (
              <div key={row.label}>
                {index > 0 && <div className="my-3 h-px w-full bg-[#eeeeee]" />}
                <div className="flex items-start justify-between text-[13px] text-[#777e8c]">
                  <span className="font-medium">{row.label}</span>
                  <span className="text-[14px] font-medium text-[#333950]">{row.value}</span>
                </div>
              </div>
            ))}
            <div className="my-3 h-px w-full bg-[#eeeeee]" />
            <div className="flex items-start justify-between text-[13px] text-[#2a3fec]">
              <span className="font-medium">최종 수령액</span>
              <span className="text-[14px] font-bold text-[#2a3fec]">{finalReceiveLabel}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-[#777e8c]">
              <Clock className="size-[14px]" strokeWidth={2} aria-hidden="true" />
              <span>※ 예상 소요시간: 3-5분</span>
            </div>
          </div>
        </section>
      </main>

      <MobileStickyFooter>
        <div className="flex w-full items-center gap-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={() => onNavigateBack?.()}>
            취소
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            환전하기
          </Button>
        </div>
      </MobileStickyFooter>
    </div>
  );
}