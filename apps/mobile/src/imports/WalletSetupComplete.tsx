import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button, SmallButton } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import { TopSlidePopup } from "../components/ui/TopSlidePopup";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import { useMyWallet } from "../contexts/WalletContext";

interface WalletSetupCompleteProps {
  onNavigateBack?: () => void;
  onNavigateToDeposit?: () => void;
}

export default function WalletSetupComplete({ onNavigateBack, onNavigateToDeposit }: WalletSetupCompleteProps) {
  const { wallet, setMyAddress } = useMyWallet();
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fullAddress = wallet.getAddress();
  const shortAddress = `${fullAddress.slice(0, 8)}.....${fullAddress.slice(-8)}`;

  useEffect(() => {
    setMyAddress(fullAddress);
  }, [fullAddress, setMyAddress]);


  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const fallbackCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = fullAddress;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      showToast("주소가 복사되었어요");
    } catch {
      showToast("복사에 실패했습니다. 주소를 수동으로 복사해주세요.");
    }

    document.body.removeChild(textarea);
  };

  const copyAddress = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullAddress);
        showToast("주소가 복사되었어요");
        return;
      }
    } catch {
      // ignore and fallback
    }
    fallbackCopy();
  };

  return (
    <div className="bg-white min-h-full w-full max-w-[360px] mx-auto relative flex flex-col">
      <TopSlidePopup
        message={toastMessage ?? ""}
        open={toastMessage !== null}
        onOpenChange={(open) => {
          if (!open) {
            setToastMessage(null);
          }
        }}
      />
      {/* Header */}
      <MobilePageHeader title="SOL 디지털 월렛" onBack={onNavigateBack} className="border-[#f1f2f6]" />

      {/* Content */}
      <div className="px-4 pt-10 pb-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-[#2a3fec] rounded-full flex items-center justify-center">
            <Check className="w-7 h-7 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center font-['Spoqa Han Sans Neo',sans-serif] text-[20px] font-semibold text-[#111111]">
          지갑 생성 완료
        </h2>
        <p className="mb-10 text-center font-['Spoqa Han Sans Neo',sans-serif] text-[14px] text-[#999ea4]">
          이제 USDC를 입금하고 투자를 시작하세요
        </p>

        {/* Wallet Address Section */}
        <div className="mb-6">
          <h3 className="mb-4 font-['Spoqa Han Sans Neo',sans-serif] text-[16px] font-semibold text-[#111111]">
            생성된 지갑 주소
          </h3>

          {/* Network Info */}
          <div className="mb-3">
            <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[14px] text-[#111111]">
              Polygon Network
            </span>
            <span className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[14px] text-[#999ea4] ml-1">
              (USDC 입금용)
            </span>
          </div>

          {/* Address Box */}
          <div className="bg-[#f4f6f9] rounded-lg p-4 mb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-3">
                <p className="break-all font-['Spoqa Han Sans Neo',sans-serif] text-[14px] text-[#333950]">
                  {isAddressExpanded ? fullAddress : shortAddress}
                </p>
              </div>
              <SmallButton
                onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                className="bg-transparent px-0 py-0 text-[#666d79] underline hover:bg-transparent active:bg-transparent"
              >
                {isAddressExpanded ? '접기' : '전체주소보기'}
              </SmallButton>
            </div>
          </div>

          {/* Copy Button */}
          <Button variant="primary" size="default" className="mb-3 w-full" onClick={copyAddress}>
            주소 복사
          </Button>

          {/* Auto-managed Notice */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-[#f4f6f9] px-3 py-3 text-center">
            <Check className="h-4 w-4 flex-shrink-0 text-[#2a3fec]" strokeWidth={3} />
            <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[12px] text-[#2a3fec]">
              주소는 자동으로 페어링되어 관리됩니다
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-[#f4f6f9] rounded-lg p-4 mb-24">
          <div className="mb-3 flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="8" fill="#DCE1F1" />
                <path d="M8 4V8.5M8 11.5V12" stroke="#2A3FEC" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <h4 className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] font-semibold text-[#111111]">
              중요 안내
            </h4>
          </div>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                지갑 주소는 신한투자증권이 안전하게 관리합니다
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                USDC 입금 시 반드시 Polygon 네트워크를 사용하세요
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa Han Sans Neo',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                다른 네트워크로 전송 시 자산을 잃을 수 있습니다
              </p>
            </li>
          </ul>
        </div>

        <MobileStickyFooter className="px-4">
          <Button variant="primary" size="lg" className="w-full" onClick={onNavigateToDeposit}>
            USDC 입금하기
          </Button>
        </MobileStickyFooter>
      </div>
    </div>
  );
}
