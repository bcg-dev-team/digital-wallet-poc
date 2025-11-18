import type { CSSProperties, ReactNode } from "react";
import { imgRectangle157576 } from "../../imports/svg-lwrrr";
import svgPaths from "../../imports/svg-p8d53q79zu";

/**
 * 탭 메뉴를 위한 props
 */
export interface TabMenuProps {
  activeTab: "home" | "favorites" | "price" | "order" | "balance";
  onNavigateHome?: () => void;
  onNavigateFavorites?: () => void;
  onNavigatePrice?: () => void;
  onNavigateOrder?: () => void;
  onNavigateBalance?: () => void;
}

/**
 * 하단 네비게이션 Inner 컴포넌트
 * TokenTrading의 Inner 함수를 그대로 공통화
 */
export interface BottomNavigationInnerProps extends TabMenuProps {
  onOpenMenu?: () => void;
  children?: ReactNode; // 추가 컨텐츠 (선택적)
}

// =====================
// 탭 버튼 컴포넌트들 (TokenTrading에서 가져옴)
// =====================

function Group829739({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[8px] top-0" data-name="Group829739">
      <div className="absolute left-[8px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_87.18%_30.77%_8.97%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap cursor-pointer" : "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_87.18%_30.77%_8.97%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">홈</p>
      </button>
    </div>
  );
}

function Group830148({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[60px] top-0" data-name="Group830148">
      <div className="absolute left-[60px] size-[52px] top-0" data-name="Rectangle157471">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_68.59%_30.77%_23.72%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap cursor-pointer" : "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_68.59%_30.77%_23.72%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">관심</p>
      </button>
    </div>
  );
}

function Group829740({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[112px] top-0" data-name="Group829740">
      <div className="absolute left-[112px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute bottom-[30.77%] flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] left-[38.46%] not-italic right-1/2 text-[#2a3fec] text-[13px] text-center text-nowrap top-[30.77%] cursor-pointer" : "absolute bottom-[30.77%] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] left-[38.46%] not-italic right-1/2 text-[#333950] text-[13px] text-center text-nowrap top-[30.77%] cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">현재가</p>
      </button>
    </div>
  );
}

function Group829741({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[164px] top-0" data-name="Group829741">
      <div className="absolute left-[164px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_35.26%_30.77%_57.05%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap cursor-pointer" : "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_35.26%_30.77%_57.05%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">주문</p>
      </button>
    </div>
  );
}

function Group829742({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[216px] top-0" data-name="Group829742">
      <div className="absolute left-[216px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_18.59%_30.77%_73.72%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap cursor-pointer" : "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_18.59%_30.77%_73.72%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">잔고</p>
      </button>
    </div>
  );
}

function Group830150({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <div className="absolute contents left-[268px] top-0">
      <div className="absolute left-[268px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <button
        type="button"
        className={isActive ? "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_1.92%_30.77%_90.39%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap cursor-pointer" : "absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_1.92%_30.77%_90.39%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap cursor-pointer"}
        onClick={onClick}
      >
        <p className="leading-[20px] whitespace-pre">차트</p>
      </button>
    </div>
  );
}

function Frame826325({ activeTab, onNavigateHome, onNavigateFavorites, onNavigatePrice, onNavigateOrder, onNavigateBalance }: TabMenuProps) {
  return (
    <div className="absolute h-[52px] left-0 top-0 w-[312px]" data-name="Frame826325">
      <Group829739 isActive={activeTab === "home"} onClick={onNavigateHome} />
      <Group830148 isActive={activeTab === "favorites"} onClick={onNavigateFavorites} />
      <Group829740 isActive={activeTab === "price"} onClick={onNavigatePrice} />
      <Group829741 isActive={activeTab === "order"} onClick={onNavigateOrder} />
      <Group829742 isActive={activeTab === "balance"} onClick={onNavigateBalance} />
      <Group830150 isActive={false} onClick={() => {}} />
    </div>
  );
}

function Group830159() {
  return (
    <div className="absolute contents inset-[25.7%_31.82%_53.7%_31.82%]" data-name="Group830159">
      <div className="absolute bg-white inset-[25.7%_31.82%_71.3%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-4.85px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157576" style={{ maskImage: `url('${imgRectangle157576}')` } as CSSProperties} />
      <div className="absolute bg-white inset-[34.5%_31.82%_62.5%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-9.25px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157577" style={{ maskImage: `url('${imgRectangle157576}')` } as CSSProperties} />
      <div className="absolute bg-white inset-[43.3%_31.82%_53.7%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-13.65px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157578" style={{ maskImage: `url('${imgRectangle157576}')` } as CSSProperties} />
    </div>
  );
}

function Maskgroup() {
  return (
    <div className="absolute contents inset-[16%_27.27%_44%_27.27%]" data-name="Maskgroup">
      <Group830159 />
    </div>
  );
}

function Img00ComQmGrd50Menu({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="absolute h-[50px] left-[316px] top-px w-[44px] cursor-pointer"
      data-name="img_00com_qm_grd_50_menu"
      onClick={onClick}
      aria-label="전체 메뉴"
    >
      <div className="absolute inset-0" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 50">
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_7_968)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_7_968" x1="0" x2="45.3146" y1="0" y2="1.22123">
              <stop stopColor="#4A2AEC" />
              <stop offset="1" stopColor="#3860FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Maskgroup />
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[56%_27.27%_20%_29.55%] justify-center leading-[0] not-italic text-[10px] text-center text-nowrap text-white">
        <p className="leading-[12px] whitespace-pre">메뉴</p>
      </div>
    </button>
  );
}

/**
 * 하단 네비게이션 Inner 컴포넌트
 * TokenTrading의 Inner 함수를 그대로 공통화
 */
export default function BottomNavigationInner({
  activeTab,
  onNavigateHome,
  onNavigateFavorites,
  onNavigatePrice,
  onNavigateOrder,
  onNavigateBalance,
  onOpenMenu,
  children,
}: BottomNavigationInnerProps) {
  return (
    <div className="absolute contents left-0 top-0" data-name="inner">
      <Frame826325
        activeTab={activeTab}
        onNavigateHome={onNavigateHome}
        onNavigateFavorites={onNavigateFavorites}
        onNavigatePrice={onNavigatePrice}
        onNavigateOrder={onNavigateOrder}
        onNavigateBalance={onNavigateBalance}
      />
      <Img00ComQmGrd50Menu onClick={onOpenMenu} />
      <div className="absolute inset-[1.92%_12.22%_1.92%_81.11%]" data-name="img_00com_qm_24_nextarrow">
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none h-[50px] rotate-[180deg] scale-y-[-100%] w-[24px]">
              <div className="bg-gradient-to-r from-[#ffffff] from-[60.417%] size-full to-[rgba(255,255,255,0)]" data-name="dim" />
            </div>
          </div>
          <div className="absolute inset-[34%_16.67%]" data-name="ic_00com_16_line_right_999ea4">
            <div className="absolute inset-0" data-name="gudie" />
            <div className="absolute bottom-1/4 flex items-center justify-center left-[37.5%] right-[37.5%] top-1/4">
              <div className="flex-none h-[4px] rotate-[270deg] w-[8px]">
                <div className="relative size-full" data-name="Path">
                  <div className="absolute inset-[-12.5%_-6.25%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
                      <path d={svgPaths.p1564e690} id="Path" stroke="#999EA4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {children}
      <div className="absolute bg-[#f4f4f4] bottom-[98.08%] left-0 right-0 top-0" data-name="divider" />
      <div className="absolute bg-[#eeeeee] bottom-0 left-0 right-0 top-[98.08%]" data-name="Rectangle153280" />
    </div>
  );
}

