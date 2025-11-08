import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import svgPaths from "../imports/svg-z0o8wup3hh";
import { img } from "../imports/svg-4g4dx";
import { createPortal } from "react-dom";
import { useMobileViewportContext } from "./layout/MobileViewportContext";

interface BuyOrderBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

function ConfirmButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="absolute contents left-0 top-[394px]" data-name="button">
      <div className="absolute h-[92px] left-0 top-[394px] w-[360px]" data-name="np_02tr_btn_r8_buy_sld_n.9">
        <div className="absolute h-[92px] left-0 top-0 w-[360px]" data-name="img_00com_btnbg_360_bg">
          <div className="absolute bottom-0 left-0 right-0 top-[26.09%]" data-name="Rectangle154436">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 68">
                <path d="M0 0H360V68H0V0Z" fill="var(--fill-0, white)" id="Rectangle 154436" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[73.91%] left-0 right-0 top-0" data-name="Rectangle154438">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 24">
              <path d="M0 0H360V24H0V0Z" fill="url(#paint0_linear_3_8184)" id="Rectangle 154438" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_8184" x1="180" x2="180" y1="2.5" y2="24">
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[21.74%_5.56%]" data-name="np_02tr_btn_r8_buy_sld_n.9">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer rounded-[8px] bg-[#fa2d42]"
            onClick={onConfirm}
          >
            <span className="absolute inset-[26.92%_6.25%] text-center font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[16px] font-medium leading-[24px] text-white">
              매수주문
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Notice() {
  return (
    <div className="absolute contents font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[18px] left-[20px] not-italic text-[#999ea4] text-[12px] top-[356px]" data-name="Group824255">
      <p className="absolute bottom-[23.05%] left-[36px] top-[73.25%] w-[304px]">수수료 및 제세금은 체결 내역에서 확인하세요.</p>
      <p className="absolute left-[calc(50%-160px)] text-nowrap top-[356px] whitespace-pre">※</p>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="absolute contents inset-[33.33%_33.33%_33.32%_33.33%]" data-name="Group818705">
      <div className="absolute inset-[-9.37%_-9.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <g id="Group818705">
            <path d="M0.75 0.75L8.75 8.75263" id="Vector600" stroke="var(--stroke-0, #777E8C)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M8.75 0.75L0.750001 8.75263" id="Vector601" stroke="var(--stroke-0, #777E8C)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Reminder() {
  return (
    <div className="absolute contents font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] left-[191px] not-italic text-[13px] top-0" data-name="button">
      <div className="absolute bottom-[95.89%] flex flex-col justify-center leading-[0] left-[58.61%] right-[5.56%] text-right text-white">
        <p className="leading-[20px] whitespace-pre font-medium">다음 주문부터 그만 보기</p>
      </div>
      <div className="absolute left-[191px] size-[16px] top-[2px]" data-name="ic_00com_16_line_stopsel_o">
        <div className="absolute inset-[28.13%_18.75%_31.25%_18.75%]" style={{ maskImage: `url('${img}')` } as CSSProperties}>
          <div className="absolute inset-[-11.54%_-7.5%]" style={{ "--stroke-0": "rgba(246, 246, 249, 1)" } as CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
              <path d={svgPaths.p9eb3d00} id="Vector 633" stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="absolute contents font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] left-[20px] not-italic text-[13px] top-[120px]" data-name="text">
      <p className="absolute leading-[20px] left-[340px] text-right text-[#333950] text-nowrap top-[152px] translate-x-[-100%] whitespace-pre font-medium">라일락 - IU</p>
      <p className="absolute leading-[20px] left-[20px] text-[#777e8c] text-nowrap top-[152px] whitespace-pre font-medium">주문종목</p>
      <p className="absolute leading-[20px] left-[20px] text-[#777e8c] text-nowrap top-[216px] whitespace-pre font-medium">주문단가</p>
      <p className="absolute leading-[20px] left-[340px] text-right text-[#fa2d42] text-nowrap top-[216px] translate-x-[-100%] whitespace-pre font-medium">15,000DT</p>
      <p className="absolute leading-[20px] left-[20px] text-[#777e8c] text-nowrap top-[248px] whitespace-pre font-medium">주문수량</p>
      <p className="absolute leading-[20px] left-[340px] text-right text-[#fa2d42] text-nowrap top-[248px] translate-x-[-100%] whitespace-pre font-medium">10ST</p>
      <p className="absolute leading-[20px] left-[20px] text-[#777e8c] text-nowrap top-[280px] whitespace-pre font-medium">주문금액</p>
      <p className="absolute leading-[20px] left-[340px] text-right text-[#333950] text-nowrap top-[280px] translate-x-[-100%] whitespace-pre font-medium">150,000DT</p>
      <div className="absolute flex flex-col justify-center leading-[0] left-[20px] text-[#777e8c] text-nowrap top-[322px] translate-y-[-50%]">
        <p className="leading-[20px] whitespace-pre font-medium">쿠폰금액</p>
      </div>
      <div className="absolute flex flex-col justify-center leading-[0] left-[304px] text-[#333950] text-nowrap text-right top-[322px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[20px] whitespace-pre font-medium">30,000원 페이백 쿠폰 적용</p>
      </div>
      <div className="absolute flex flex-col justify-center leading-[0] left-[340px] text-right text-[#777e8c] text-nowrap top-[322px] translate-x-[-100%] translate-y-[-50%]">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[20px] underline whitespace-pre font-medium">변경</p>
      </div>
      <div className="absolute bottom-[58.02%] flex flex-col justify-center leading-[0] left-[20px] text-[#777e8c] top-[37.86%] w-[56px]">
        <p className="leading-[20px] font-medium">주문유형</p>
      </div>
      <p className="absolute bottom-[58.02%] leading-[20px] left-[340px] text-right text-[#333950] top-[37.86%] translate-x-[-100%] w-[224px] font-medium">지정가</p>
      <div className="absolute bottom-[71.19%] flex flex-col justify-center leading-[0] left-[20px] text-[#777e8c] top-[24.69%] w-[56px]">
        <p className="leading-[20px] font-medium">계좌번호</p>
      </div>
      <p className="absolute bottom-[71.19%] leading-[20px] left-[340px] text-right text-[#333950] top-[24.69%] translate-x-[-100%] w-[224px] font-medium">123-45-678910 [종합계좌] 김신한</p>
    </div>
  );
}

function BottomsheetContent({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="absolute contents inset-0" data-name="+ BOTTOMSHEET">
      <div className="absolute bottom-[0.21%] left-0 right-0 top-[6.58%]" data-name="bg_btmsheet.9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 453">
          <path d={svgPaths.pecfc0} fill="var(--fill-0, white)" id="bg_btmsheet.9" />
        </svg>
      </div>
      <p className="absolute inset-[15.64%_5.56%_79.42%_5.56%] font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[18px] font-bold leading-[26px] tracking-[-0.5px] text-[#111111]">
        <span className="text-[#fa2d42]">DT매수</span>
        <span>{` 주문확인`}</span>
      </p>
      <ConfirmButton onConfirm={onConfirm} />
      <Notice />
      <div
        className="absolute inset-[10.7%_5.56%_84.36%_87.78%] cursor-pointer"
        data-name="ic_00com_24_solid_close"
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(244, 246, 249, 1)" } as CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" fill="var(--fill-0, #F4F6F9)" id="Ellipse857" rx="12" ry="12" />
          </svg>
        </div>
        <CloseIcon />
      </div>
      <Reminder />
      <OrderSummary />
    </div>
  );
}

export default function BuyOrderBottomSheet({ isOpen, onClose, onConfirm }: BuyOrderBottomSheetProps) {
  const context = useMobileViewportContext();
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const portalTarget = context?.viewportRef.current ?? (typeof document !== "undefined" ? document.body : null);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className="absolute inset-0 z-[100] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`relative w-full max-w-[360px] transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[486px]" data-name="(팝업)매수주문확인">
          <BottomsheetContent onClose={onClose} onConfirm={handleConfirm} />
        </div>
      </div>
    </div>,
    portalTarget
  );
}

