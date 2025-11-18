import { useMemo } from "react";
import { Button } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";

import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  formatCurrency,
  formatNumber,
  KRW_USD_EXCHANGE_RATE,
} from "../constants/wallet";
import eventBannerImage from "../assets/699cfa03a5e35518b3e7e62482a35f444b42cc86.png";

interface WithdrawalCompleteProps {
  onNavigateBack?: () => void;
  onNavigateToWallet?: () => void;
  onNavigateToHistory?: () => void;
  onOpenExplorer?: () => void;
}

const TRANSACTION_HASH = "0xab123...def567";
const DEFAULT_AMOUNT = AVAILABLE_USDC_AMOUNT;

export default function WithdrawalComplete({
  onNavigateBack,
  onNavigateToWallet,
  onNavigateToHistory,
  onOpenExplorer,
}: WithdrawalCompleteProps) {
  const shortTxid = `${TRANSACTION_HASH.slice(0, 8)}.....${TRANSACTION_HASH.slice(-8)}`;
  const formattedAmount = useMemo(() => formatNumber(DEFAULT_AMOUNT), []);
  const formattedKrw = useMemo(() => formatCurrency(DEFAULT_AMOUNT * KRW_USD_EXCHANGE_RATE), []);
  const completedAt = useMemo(() => {
    const now = new Date();
    return now.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  const handleOpenExplorer = () => {
    window.open(`https://amoy.polygonscan.com/tx/${TRANSACTION_HASH}`, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="bg-white flex min-h-full w-full max-w-[360px] flex-col">
      <MobilePageHeader title="USDC 출금" onBack={onNavigateBack} />

      <main className="flex-1 overflow-y-auto px-5 pb-32 pt-10">
        <section className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2a3fec]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M20.6667 9.33325L11.6667 18.3333L7.33337 13.9999"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="font-['Spoqa Han Sans Neo',sans-serif] text-[20px] font-semibold leading-[28px] text-[#111111]">
              출금이 완료됐어요
            </h2>
            <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] text-[#777e8c]">
              USDC가 성공적으로 출금되었어요
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-6">
          <div className="rounded-[12px] border border-[#ebedf5] bg-white px-4 py-5 shadow-[0px_4px_16px_rgba(17,17,17,0.06)]">
            <div className="space-y-3">
              <Row label="출금 금액" value={`${formattedAmount} USDC`} />
              <Row label="원화 환산" value={formattedKrw} helper="실시간 환율 기준" />
              <Row label="출금 시각" value={completedAt} />
            </div>
            <div className="mt-4 h-px w-full bg-[#eeeeee]" />
            <div className="mt-4 space-y-3">
              <Row label="트랜잭션 해시" value={shortTxid} />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleOpenExplorer}
              >
                탐색기에서 보기
              </Button>
            </div>
          </div>

          <EventBanner />

          <div className="rounded-[12px] border border-[#ebedf5] px-4 py-5">
            <h3 className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] font-semibold text-[#111111]">
              계좌개설을 추천해 준 신한투자증권 직원이 있나요?
            </h3>
            <button
              type="button"
              className="mt-2 text-right text-[13px] font-['Spoqa Han Sans Neo',sans-serif] font-medium text-[#999ea4] underline decoration-solid underline-offset-4"
            >
              직원 찾기
            </button>
          </div>
        </section>
      </main>

      <MobileStickyFooter>
        <div className="flex w-full gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={onNavigateToHistory}
          >
            거래내역 보기
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onNavigateToWallet}
          >
            지갑 보기
          </Button>
        </div>
      </MobileStickyFooter>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  helper?: string;
}

function Row({ label, value, helper }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[13px] font-medium text-[#777e8c]">
          {label}
        </p>
        {helper && (
          <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[11px] text-[#aaaeb3]">
            {helper}
          </p>
        )}
      </div>
      <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] font-semibold text-[#333950]">
        {value}
      </p>
    </div>
  );
}

function EventBanner() {
  return (
    <div className="relative overflow-hidden rounded-[12px] bg-gradient-to-r from-[#4434FF] to-[#5E49FF] px-5 py-6 text-white shadow-[0px_10px_24px_rgba(68,52,255,0.2)]">
      <div className="relative z-10 space-y-0">
        <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[13px] font-semibold leading-[20px]">
          신규개설 이벤트 대상자시네요!
        </p>
        <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] font-semibold leading-[20px] opacity-90">
          고객님께 투자금 2만원 드려요
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1 font-['Spoqa Han Sans Neo',sans-serif] text-[13px] font-medium opacity-60 decoration-solid underline-offset-4 pt-3"
        >
          자세히보기
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <img
        src={eventBannerImage}
        alt=""
        className="pointer-events-none absolute right-[-24px] top-[58px] w-[200px] -translate-y-1/2 select-none"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22320%22%20height%3D%22104%22%20viewBox%3D%220%200%20320%20104%22%20fill%3D%22none%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M223.847%20-55H368V104H226.233C194.096%2094.9455%20163.537%2080.208%20123.658%2053.4627C66.0249%2014.9272%200%2092.3868%200%2016.0331C0%20-60.3205%2055.1694%20-55%2091.7197%20-55C117.935%20-55%20136.689%20-38.4575%20169.169%20-38.4575C187.48%20-38.4575%20207.357%20-49.0465%20223.847%20-55Z%22%20fill%3D%22url(%23paint0_linear)%22/%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear%22%20x1%3D%2292%22%20y1%3D%22-55%22%20x2%3D%2292%22%20y2%3D%22104%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234434FF%22%20stop-opacity%3D%220.4%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235E49FF%22%20stop-opacity%3D%220%22/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%27)] opacity-50" />
    </div>
  );
}

