import { useMemo, useState } from "react";
import { Button, Card } from "@digital-wallet/ui";
import MobileAppFooter from "../components/layout/MobileAppFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import imgLilac from "../assets/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png";
import imgDynamite from "../assets/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png";
import imgBungee from "../assets/c07375a0ac069eb65d39e36b0f1fdae69675787b.png";
import imgOnlyOneOf from "../assets/37ac58a7f911dc76efb484419f1aff741808dcec.png";
import portfolioBg from "../assets/17717fbf1b1d1eeefabee394f7e3735b3f13956c.png";

type TabKey = "popular" | "favorite" | "holding";

interface TokenItem {
  id: string;
  title: string;
  artist: string;
  evaluation: string;
  quantity: string;
  change: number;
  image: string;
}

interface TokenSecuritiesProps {
  onSelectFirst?: () => void;
  onNavigateBack?: () => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "popular", label: "인기" },
  { key: "favorite", label: "관심" },
  { key: "holding", label: "보유" },
];

const TOKEN_DATA: Record<TabKey, TokenItem[]> = {
  popular: [
    {
      id: "lilac",
      title: "라일락 - IU",
      artist: "평가액 750,000원",
      evaluation: "평가액 750,000원",
      quantity: "50 ST",
      change: -1.35,
      image: imgLilac,
    },
    {
      id: "dynamite",
      title: "Dynamite - BTS",
      artist: "평가액 640,000원",
      evaluation: "평가액 640,000원",
      quantity: "30 ST",
      change: 3.99,
      image: imgDynamite,
    },
    {
      id: "bungee",
      title: "Bungee - 백현",
      artist: "평가액 520,000원",
      evaluation: "평가액 520,000원",
      quantity: "10 ST",
      change: -0.35,
      image: imgBungee,
    },
  ],
  favorite: [
    {
      id: "onlyoneof",
      title: "얼음과 불의 노래 - 온리원오브",
      artist: "평가액 430,000원",
      evaluation: "평가액 430,000원",
      quantity: "5 ST",
      change: 10.31,
      image: imgOnlyOneOf,
    },
  ],
  holding: [
    {
      id: "lilac",
      title: "라일락 - IU",
      artist: "평가액 750,000원",
      evaluation: "평가액 750,000원",
      quantity: "50 ST",
      change: -1.35,
      image: imgLilac,
    },
    {
      id: "dynamite",
      title: "Dynamite - BTS",
      artist: "평가액 640,000원",
      evaluation: "평가액 640,000원",
      quantity: "30 ST",
      change: 3.99,
      image: imgDynamite,
    },
  ],
};

const SUMMARY_CARDS = [
  {
    label: "총 보유 자산",
    value: "1,666,656원",
    helper: "전일 대비 +2.1%",
  },
  {
    label: "보유 종목",
    value: "3개",
    helper: "관심 종목 12개",
  },
];

export default function TokenSecurities({ onSelectFirst, onNavigateBack }: TokenSecuritiesProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("popular");

  const tokenList = useMemo(() => TOKEN_DATA[activeTab], [activeTab]);

  return (
    <div className="bg-[#f6f7fb] flex min-h-full w-full max-w-[360px] flex-col">
      <MobilePageHeader
        title="음악 저작권 토큰"
        onBack={onNavigateBack}
        className="border-[#ebedf5] bg-white"
      />

      <main className="flex-1 overflow-y-auto pb-28">
        <nav className="mt-6 flex gap-4 px-5">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 rounded-full px-3 py-2 text-[14px] ${
                  isActive ? "bg-[#111111] font-semibold text-white" : "bg-white text-[#888e98]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <section className="mt-4 flex flex-col gap-3 px-5">
          {tokenList.map((token, index) => (
            <TokenRow
              key={token.id}
              item={token}
              onClick={index === 0 ? onSelectFirst : undefined}
            />
          ))}
        </section>

        <section className="mt-8 px-5">
          <Card className="rounded-[16px] border border-[#ebedf5] bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-[#777e8c]">서비스 이용은 어떠셨나요?</p>
                <p className="text-[16px] font-semibold text-[#333950]">설문에 참여하고 리워드를 받아보세요.</p>
              </div>
              <div className="flex items-center justify-center rounded-full bg-[#f4f6f9] p-2">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4L12 10L8 16" stroke="#333950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <MobileAppFooter activeTab="balance" />
    </div>
  );
}

function TokenRow({ item, onClick }: { item: TokenItem; onClick?: () => void }) {
  const isPositive = item.change >= 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-[16px] bg-white px-4 py-3 shadow-[0px_8px_18px_rgba(17,17,17,0.06)]"
    >
      <div className="flex items-center gap-3">
        <img src={item.image} alt="" className="h-10 w-10 rounded-full object-cover" />
        <div className="text-left">
          <p className="text-[16px] font-semibold text-[#111111]">{item.title}</p>
          <p className="text-[12px] text-[#888e98]">{item.evaluation}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[16px] font-semibold text-[#333950]">{item.quantity}</p>
        <span
          className={`mt-1 inline-flex items-center rounded-full px-2 py-[2px] text-[12px] font-medium ${
            isPositive ? "bg-[#fff2f2] text-[#fa2d42]" : "bg-[#f3f9fe] text-[#2d78fa]"
          }`}
        >
          {isPositive ? "+" : ""}
          {item.change.toFixed(2)}%
        </span>
      </div>
    </button>
  );
}

