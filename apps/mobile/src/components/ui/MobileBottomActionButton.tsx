import type { CSSProperties, ReactNode } from "react";

interface MobileBottomActionButtonProps {
  /**
   * 버튼 텍스트
   */
  label: string;
  /**
   * 버튼 클릭 핸들러
   */
  onClick: () => void;
  /**
   * 버튼 색상 (기본값: 빨간색)
   */
  variant?: "primary" | "secondary";
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 하단 안내 문구
   */
  notice?: ReactNode;
}

/**
 * 하단 고정 액션 버튼 컴포넌트
 * BuyOrderBottomSheet의 ConfirmButton 스타일을 재사용 가능한 컴포넌트로 추출
 * 
 * @param label - 버튼 텍스트
 * @param onClick - 버튼 클릭 핸들러
 * @param variant - 버튼 색상 변형
 * @param disabled - 비활성화 여부
 * @param notice - 하단 안내 문구
 */
export default function MobileBottomActionButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  notice,
}: MobileBottomActionButtonProps) {
  const buttonBgColor = variant === "primary" ? "#fa2d42" : "#333950";

  return (
    <div className="relative w-full h-[92px]">
      {/* 그라데이션 배경 */}
      <div className="absolute inset-0" data-name="button-background">
        <div className="absolute bottom-0 left-0 right-0 top-[26.09%]" data-name="Rectangle154436">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 68">
              <path d="M0 0H360V68H0V0Z" fill="var(--fill-0, white)" id="Rectangle 154436" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[73.91%] left-0 right-0 top-0" data-name="Rectangle154438">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 24">
            <path d="M0 0H360V24H0V0Z" fill="url(#paint0_linear_bottom_action)" id="Rectangle 154438" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_bottom_action" x1="180" x2="180" y1="2.5" y2="24">
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute inset-[21.74%_5.56%]">
        <button
          type="button"
          className={`absolute inset-0 cursor-pointer rounded-[8px] transition-opacity ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: buttonBgColor }}
          onClick={onClick}
          disabled={disabled}
        >
          <span className="absolute inset-[26.92%_6.25%] text-center font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[16px] font-medium leading-[24px] text-white">
            {label}
          </span>
        </button>
      </div>

      {/* 안내 문구 */}
      {notice && (
        <div className="absolute bottom-[73.91%] left-[20px] right-[20px] font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[18px] not-italic text-[#999ea4] text-[12px]">
          {notice}
        </div>
      )}
    </div>
  );
}

