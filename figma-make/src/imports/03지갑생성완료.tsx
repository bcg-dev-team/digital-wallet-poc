import { useState } from "react";
import { Check } from "lucide-react";

export default function Component03() {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const fullAddress = "0x742d35Cc1234567890abcdef123456789OAbCdEf";
  const shortAddress = "0x742d35C.....90AbCdEf";

  const copyAddress = () => {
    // Fallback method for environments where Clipboard API is blocked
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullAddress).then(() => {
          alert('주소가 복사되었습니다.');
        }).catch(() => {
          // If Clipboard API fails, use fallback
          fallbackCopy();
        });
      } else {
        // Use fallback if Clipboard API is not available
        fallbackCopy();
      }
    } catch (err) {
      // Use fallback on any error
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = fullAddress;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      alert('주소가 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다. 주소를 수동으로 복사해주세요.');
    }
    
    document.body.removeChild(textarea);
  };

  return (
    <div className="bg-white min-h-screen w-full max-w-[360px] mx-auto relative">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100">
        <button className="p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[16px] text-[#111111] ml-2">
          SOL 디지털 월렛
        </h1>
      </header>

      {/* Content */}
      <div className="px-4 pt-10 pb-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-[#2a3fec] rounded-full flex items-center justify-center">
            <Check className="w-7 h-7 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[20px] text-[#111111] text-center mb-2">
          지갑 생성 완료
        </h2>
        <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[14px] text-[#999ea4] text-center mb-10">
          이제 USDC를 입금하고 투자를 시작하세요
        </p>

        {/* Wallet Address Section */}
        <div className="mb-6">
          <h3 className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[16px] text-[#111111] mb-4">
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
                <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[14px] text-[#333950] break-all">
                  {isAddressExpanded ? fullAddress : shortAddress}
                </p>
              </div>
              <button
                onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[13px] text-[#666d79] whitespace-nowrap underline"
              >
                {isAddressExpanded ? '접기' : '전체주소보기'}
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyAddress}
            className="w-full h-[40px] bg-[#4e6aff] text-white font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[14px] rounded-md mb-3 text-center font-normal flex items-center justify-center"
          >
            주소 복사
          </button>

          {/* Auto-managed Notice */}
          <div className="flex items-center gap-2 bg-[#f4f6f9] rounded-lg px-3 py-2 text-center">
            <Check className="w-4 h-4 text-[#2a3fec] flex-shrink-0" strokeWidth={3} />
            <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[12px] text-[#2a3fec] text-center">
              주소는 자동으로 페어링되어 관리됩니다
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-[#f4f6f9] rounded-lg p-4 mb-24">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-[#ff9500] text-[18px] flex-shrink-0">!</span>
            <h4 className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[14px] text-[#111111]">
              중요 안내
            </h4>
          </div>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                지갑 주소는 신한투자증권이 안전하게 관리합니다
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                USDC 입금 시 반드시 Polygon 네트워크를 사용하세요
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#666d79] text-[12px]">•</span>
              <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[12px] text-[#666d79] leading-[18px]">
                다른 네트워크로 전송 시 자산을 잃을 수 있습니다
              </p>
            </li>
          </ul>
        </div>

        {/* Deposit Button */}
        <div className="fixed bottom-6 left-0 right-0 px-4 max-w-[360px] mx-auto">
          <button
            className="w-full bg-[#2a3fec] text-white font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[16px] rounded-lg py-[14px] text-center"
          >
            USDC 입금하기
          </button>
        </div>
      </div>
    </div>
  );
}
