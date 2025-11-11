import { Link } from "react-router-dom";

interface RouteEntry {
  label: string;
  path: string;
  description?: string;
}

interface Section {
  title: string;
  items: RouteEntry[];
}

const SECTIONS: Section[] = [
  {
    title: "MY홈 & 메뉴",
    items: [
      { label: "MY홈", path: "/", description: "앱의 기본 랜딩 화면" },
      { label: "전체 메뉴", path: "/menu", description: "전역 메뉴 모음" },
    ],
  },
  {
    title: "지갑 온보딩",
    items: [
      { label: "지갑 시작", path: "/wallet/start", description: "온보딩 시작 화면" },
      { label: "자산 선택", path: "/wallet/asset" },
      { label: "네트워크 선택", path: "/wallet/network" },
      { label: "지갑 생성 완료", path: "/wallet/creation-complete" },
    ],
  },
  {
    title: "지갑 대시보드 & 기타",
    items: [
      { label: "지갑 대시보드", path: "/wallet", description: "자산 요약" },
      { label: "거래 내역", path: "/transaction-history" },
      { label: "USDC 출금", path: "/withdrawal" },
    ],
  },
  {
    title: "USDC 입금 플로우",
    items: [
      { label: "1단계: MetaMask 연결", path: "/deposit/connect-wallet" },
      { label: "2단계: 연결 완료", path: "/deposit/wallet-connected" },
      { label: "3단계: 금액 입력", path: "/deposit/amount" },
      { label: "4단계: 입금 진행 중", path: "/deposit/processing" },
      { label: "5단계: 입금 완료", path: "/deposit/completion" },
    ],
  },
  {
    title: "토큰 증권 & 거래",
    items: [
      { label: "토큰 증권 메인", path: "/token-securities", description: "인기/관심/보유" },
      { label: "라일락(LILAC) 상세", path: "/token-securities/lilac" },
      { label: "라일락 매수 주문", path: "/token-securities/lilac/trade" },
    ],
  },
];

export function ScreenSummaryPanel() {
  return (
    <aside className="flex h-screen w-[420px] flex-col gap-4 overflow-y-auto border-r border-[#d9dde6] bg-white/95 px-6 py-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2a3fec]">
          SOL 디지털 월렛
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#111111]">Quick Access</h1>
        <p className="mt-2 text-sm text-[#777e8c]">
          원하는 화면 선택 시 우측 모바일 영역에 해당 화면이 표시됩니다.
        </p>
      </header>

      <nav className="flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <section key={section.title} className="rounded-xl border border-[#e5e8f2] bg-white px-4 py-3">
            <h2 className="text-sm font-semibold text-[#333950]">{section.title}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex flex-col gap-0.5 rounded-lg border border-transparent bg-[#f4f6f9] px-3 py-2 text-sm transition hover:border-[#2a3fec] hover:bg-white"
                  >
                    <span className="font-medium text-[#2a3fec]">{item.label}</span>
                    <span className="text-xs text-[#777e8c]">{item.path}</span>
                    {item.description ? (
                      <span className="text-xs text-[#999ea4]">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}

export default function ScreenIndex() {
  return (
    <div className="flex min-h-screen bg-[#eef1f6]">
      <ScreenSummaryPanel />
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-s rounded-2xl bg-white px-6 py-8 text-center shadow-lg">
          <h2 className="text-lg font-semibold text-[#2a3fec]">테스트 가이드</h2>
          <p className="mt-3 text-sm text-[#777e8c]">
            좌측 패널에서 원하는 화면 선택 시 우측 모바일 영역에 해당 화면이 표시됩니다.
          </p>
        </div>
      </main>
    </div>
  );
}

