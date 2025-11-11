import clsx from "clsx";
import svgPathsNav from "../../imports/svg-nvt1qhzfrf";

export interface BottomNavigationProps {
  activeTab?: "home" | "favorites" | "price" | "order" | "balance";
  onNavigateHome?: () => void;
  onNavigateFavorites?: () => void;
  onNavigatePrice?: () => void;
  onNavigateOrder?: () => void;
  onNavigateBalance?: () => void;
  onOpenMenu?: () => void;
  onOpenSettings?: () => void;
}

const TAB_ITEMS: Array<{
  key: NonNullable<BottomNavigationProps["activeTab"]>;
  label: string;
  onClickKey: keyof Pick<
    BottomNavigationProps,
    | "onNavigateHome"
    | "onNavigateFavorites"
    | "onNavigatePrice"
    | "onNavigateOrder"
    | "onNavigateBalance"
    | "onNavigateChart"
  >;
}> = [
  { key: "home", label: "홈", onClickKey: "onNavigateHome" },
  { key: "favorites", label: "관심", onClickKey: "onNavigateFavorites" },
  { key: "price", label: "현재가", onClickKey: "onNavigatePrice" },
  { key: "order", label: "주문", onClickKey: "onNavigateOrder" },
  { key: "balance", label: "잔고", onClickKey: "onNavigateBalance" },
];

function MenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex h-full w-[48px] cursor-pointer items-center justify-center"
      data-name="img_00com_qm_grd_50_menu"
      onClick={onClick}
      aria-label="전체 메뉴"
    >
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="19" height="2" rx="1" fill="#333950" />
        <rect x="0.5" y="7" width="19" height="2" rx="1" fill="#333950" />
        <rect x="0.5" y="13" width="19" height="2" rx="1" fill="#333950" />
      </svg>
    </button>
  );
}

function SettingsButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-[44px] items-center justify-center"
      data-name="ic_00com_qm_24_sld_setting"
      aria-label="설정"
    >
      <div className="flex items-center gap-[6px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={svgPathsNav.p1560c340} fill="#777E8C" />
          <path d={svgPathsNav.p2fbfa000} fill="white" />
        </svg>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={svgPathsNav.p1bae7780} stroke="#999EA4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

export default function BottomNavigation({
  activeTab = "home",
  onNavigateHome,
  onNavigateFavorites,
  onNavigatePrice,
  onNavigateOrder,
  onNavigateBalance,
  onOpenMenu,
  onOpenSettings,
}: BottomNavigationProps) {
  return (
    <nav className="relative flex h-[52px] w-full items-center bg-white">
      <div className="flex h-full flex-1">
        {TAB_ITEMS.map((item) => {
          const handler = {
            onNavigateHome,
            onNavigateFavorites,
            onNavigatePrice,
            onNavigateOrder,
            onNavigateBalance,
          }[item.onClickKey];

          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={handler}
              className="flex h-full flex-1 items-center justify-center"
              >
              <span
                className={clsx(
                  "text-[13px] leading-[20px] tracking-[-0.2px]",
                  isActive
                    ? "font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[#2a3fec]"
                    : "font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[#333950]"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <SettingsButton onClick={onOpenSettings} />
      <MenuButton onClick={onOpenMenu} />
      <div className="absolute inset-x-0 top-0 h-px bg-[#f4f4f4]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#eeeeee]" />
    </nav>
  );
}

