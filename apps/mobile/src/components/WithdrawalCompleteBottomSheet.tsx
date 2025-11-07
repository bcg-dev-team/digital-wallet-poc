import svgPaths from "../imports/svg-sdfhfa2u61";
import { useEffect } from "react";

interface WithdrawalCompleteBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: () => void;
}

function Frame() {
  return (
    <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[10px] items-center p-[16px] relative rounded-[999px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[30px]" data-name="Icon/Check-circle">
        <div className="absolute inset-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector"></g>
          </svg>
        </div>
        <div className="absolute aspect-[20/20] left-[16.67%] right-[16.67%] top-1/2 translate-y-[-50%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(42, 63, 236, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p25adcd00} fill="var(--fill-0, #2A3FEC)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-[#131313] text-center tracking-[-0.35px] w-full">
      <p className="font-['Pretendard_GOV:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[18px] w-full font-semibold">출금신청 완료</p>
      <p className="font-['Pretendard_GOV:Regular',sans-serif] leading-[20px] relative shrink-0 text-[16px] w-full">출금신청이 성공적으로 완료되었어요</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

interface Frame3Props {
  onClose: () => void;
}

function Frame3({ onClose }: Frame3Props) {
  return (
    <div className="bg-white relative rounded-tl-[24px] rounded-tr-[24px] shrink-0 w-full" onClick={onClose}>
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-center pb-[36px] pt-[12px] px-[24px] relative w-full">
          <div className="bg-[#d9d9d9] h-[4px] rounded-[999px] shrink-0 w-[34px]" />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function WithdrawalCompleteBottomSheet({ isOpen, onClose, onNavigate }: WithdrawalCompleteBottomSheetProps) {
  useEffect(() => {
    if (isOpen && onNavigate) {
      const timer = setTimeout(() => {
        onNavigate();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onNavigate]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[360px] animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="content-stretch flex flex-col items-start relative w-full" data-name="바텀시트-주문실행완료">
          <Frame3 onClose={onClose} />
          <div className="bg-white h-[34px] relative shrink-0 w-full" data-name="Global/Indicator-bottom">
            <div className="absolute bg-[#242424] bottom-[8px] h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}

