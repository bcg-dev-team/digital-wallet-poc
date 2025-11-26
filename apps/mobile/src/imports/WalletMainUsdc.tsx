import { useState, useEffect } from "react";
import svgPaths from "./svg-h4gtpjdft2";
import imgImage12 from "figma:asset/904161eaaeda9a6e1380789b5df872e0184f6ddd.png";
import imgImage13 from "figma:asset/034a0093adcbb8be6bca570d81a33610166d62db.png";
import imgImage2 from "figma:asset/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png";
import imgImage3 from "figma:asset/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png";
import { imgImage1, img, img1, imgRectangle157576 } from "./svg-d2lo7";
import { Button, ActionCard } from "@digital-wallet/ui";
import { myWallet, SOL_ADDRESS, USDC_CONTRACT_ADDRESS } from "./myWallet";
import { useMyWallet } from "../contexts/WalletContext";

import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  formatCurrency,
  formatNumber,
  KRW_USD_EXCHANGE_RATE,
} from "../constants/wallet";
import MobileAppFooter from "../components/layout/MobileAppFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";

function Header({ onNavigateToHome }: { onNavigateToHome?: () => void }) {
  return <MobilePageHeader title="SOL 디지털 월렛" onBack={onNavigateToHome} />;
}

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_5228)" id="Help">
          <g id="Vector"></g>
          <path d={svgPaths.pe934c00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_5228">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2117921338() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">총 자산</p>
      </div>
      <Help />
    </div>
  );
}

function Refresh() {
  return (
    <div className="relative size-[20px]" data-name="Refresh">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_5454)" id="Refresh">
          <g id="Vector"></g>
          <path d={svgPaths.p211eec00} fill="var(--fill-0, #999EA4)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_5454">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2117921337() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[26px] text-center text-nowrap tracking-[-0.13px]">
        <p className="leading-[32px] whitespace-pre">32,850,000</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Frame2117921335() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]">
      <Frame2117921338 />
      <Frame2117921337 />
    </div>
  );
}

function TabL1SldContainer() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-0 pt-[12px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <Frame2117921335 />
    </div>
  );
}

function Frame2117921374() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">$25,569 (환율: 1,300원)</p>
      </div>
    </div>
  );
}

function Frame2117921339() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame2117921374 />
    </div>
  );
}

function TabL1SldContainer1() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-between pb-0 pt-[8px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <Frame2117921339 />
    </div>
  );
}

function Frame2117921481() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <TabL1SldContainer />
      <TabL1SldContainer1 />
    </div>
  );
}

function Frame2117921336() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="ico_tr_price_up">
        <div className="absolute inset-0" data-name="guide" />
        <div className="absolute bottom-1/4 left-[8.33%] right-[8.33%] top-[8.33%]" data-name="Triangle">
          <div className="absolute bottom-0 left-[4.82%] right-[4.82%] top-[6.65%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 7">
              <path clipRule="evenodd" d={svgPaths.p31a44100} fill="var(--fill-0, #FA2D42)" fillRule="evenodd" id="Triangle" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">850,000원 (+3.6%)</p>
      </div>
    </div>
  );
}

function Frame2117921482() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">24,700,000 원</p>
      <Frame2117921336 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">투자 자산(75.2%)</p>
      <Frame2117921482 />
    </div>
  );
}

function Frame2117921340() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="ico_tr_price_up">
        <div className="absolute inset-0" data-name="guide" />
        <div className="absolute bottom-1/4 left-[8.33%] right-[8.33%] top-[8.33%]" data-name="Triangle">
          <div className="absolute bottom-0 left-[4.82%] right-[4.82%] top-[6.65%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 7">
              <path clipRule="evenodd" d={svgPaths.p31a44100} fill="var(--fill-0, #FA2D42)" fillRule="evenodd" id="Triangle" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">320,000원 (+8.2%)</p>
      </div>
    </div>
  );
}

function Frame2117921483() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">4,210,000 원</p>
      <Frame2117921340 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">디지털 자산(12.8%)</p>
      <Frame2117921483 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium relative shrink-0 text-[#777e8c] text-[13px]">예치금(9.7%)</p>
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold relative shrink-0 text-[#333950] text-[14px] text-right">3,190,000 원</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium relative shrink-0 text-[#777e8c] text-[13px]">기타자산(2.3%)</p>
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold relative shrink-0 text-[#333950] text-[14px] text-right">760,000 원</p>
    </div>
  );
}

function Frame2117921480() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center pb-0 pt-[20px] px-[20px] relative w-full">
          <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
          <Text />
          <Text1 />
          <Text2 />
          <Text3 />
          <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
        </div>
      </div>
    </div>
  );
}

function Frame2117921385() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame2117921481 />
      <Frame2117921480 />
    </div>
  );
}

function Scroll({ onNavigateToDeposit, onNavigateToWithdrawal, onNavigateToHistory }: { onNavigateToDeposit?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
      <ActionCard
        icon="💰"
        title="입금"
        variant="deposit"
        onClick={onNavigateToDeposit}
      />
      <ActionCard
        icon="💵"
        title="출금"
        variant="withdraw"
        onClick={onNavigateToWithdrawal}
      />
      <ActionCard
        icon="📊"
        title="거래내역"
        variant="history"
        onClick={onNavigateToHistory}
      />
    </div>
  );
}

function IndexArea({ onNavigateToDeposit, onNavigateToWithdrawal, onNavigateToHistory }: { onNavigateToDeposit?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="index_area">
      <Scroll onNavigateToDeposit={onNavigateToDeposit} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} />
    </div>
  );
}

function Container({ onNavigateToDeposit, onNavigateToWithdrawal, onNavigateToHistory }: { onNavigateToDeposit?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="container">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center p-[20px] relative w-full">
          <IndexArea onNavigateToDeposit={onNavigateToDeposit} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} />
        </div>
      </div>
    </div>
  );
}

function Component01Container({ onNavigateToDeposit, onNavigateToWithdrawal, onNavigateToHistory }: { onNavigateToDeposit?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="01_container">
      <Frame2117921385 />
      <Container onNavigateToDeposit={onNavigateToDeposit} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Frame2117918982() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre">보유 토큰</p>
    </div>
  );
}

function Frame2117921510() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="image 12">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage12} />
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] text-center text-nowrap tracking-[-0.5px]">
        <p className="whitespace-pre">
          <span className="leading-[24px] text-[16px]">USDC</span>
          <span className="font-medium leading-[18px] not-italic text-[#111111] text-[12px]">(Polygon)</span>
        </p>
      </div>
    </div>
  );
}

function Frame2117921376() {
  const { wallet } = useMyWallet();
  const [usdcBalance, setUsdcBalance] = useState<number>(0);

  useEffect(() => {
    setUsdcBalance(wallet.balance);
  }, [wallet.balance]);

  useEffect(() => {
    setUsdcBalance(wallet.balance);
    const updateBalance = async () => {
      while (true) {
        let bal = await wallet.getUSDCBalance(SOL_ADDRESS);
        wallet.balance = Number(bal);
        setUsdcBalance(wallet.balance);
        console.log("Updated USDC Balance:", wallet.balance);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

    };
    updateBalance();
  }, [wallet.balance]);

  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">
        약 {formatCurrency(usdcBalance * KRW_USD_EXCHANGE_RATE)}
      </p>
    </div>
  );
}

function Frame2117921375() {
  const { wallet } = useMyWallet();
  const [usdcBalance, setUsdcBalance] = useState<number>(0);

  // useEffect(() => {
  //   setUsdcBalance(wallet.balance);
  // }, [wallet.balance]);

  useEffect(() => {
    setUsdcBalance(wallet.balance);
  }, [wallet.balance]);

  useEffect(() => {
    setUsdcBalance(wallet.balance);
    const updateBalance = async () => {
      while (true) {
        let bal = await wallet.getUSDCBalance(SOL_ADDRESS);
        wallet.balance = Number(bal);
        setUsdcBalance(wallet.balance);
        console.log("Updated USDC Balance:", wallet.balance);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

    };
    updateBalance();
  }, [wallet.balance]);

  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-[105px]">
        <span className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] text-[16px] tracking-[-0.08px]">
          {formatNumber(usdcBalance)}
        </span>
        <span className="leading-[20px] text-[14px]">{` USDC`}</span>
      </p>
      <Frame2117921376 />
    </div>
  );
}

function Group826114() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">보유량</p>
          <Frame2117921375 />
        </div>
      </div>
    </div>
  );
}

function List({ onNavigateToDeposit }: { onNavigateToDeposit?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
      <Group826114 />
      <Button
        variant="primary"
        className="w-[320px]"
        onClick={onNavigateToDeposit}
      >
        입금하기
      </Button>
    </div>
  );
}

function Frame2117921364({ onNavigateToDeposit }: { onNavigateToDeposit?: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
          <Frame2117921510 />
          <List onNavigateToDeposit={onNavigateToDeposit} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921511() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[184px]">
      <div className="relative shrink-0 size-[24px]" data-name="image 13">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[187.38%] left-[-90.78%] max-w-none top-[-43.69%] w-[281.55%]" src={imgImage13} />
        </div>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] text-center text-nowrap tracking-[-0.5px]">
        <p className="whitespace-pre">
          <span className="leading-[24px] text-[16px]">DT</span>
          <span className="font-['Spoqa_Han_Sans_Neo',sans-serif] leading-[18px] not-italic text-[#111111] text-[12px]">(Deposit Coin)</span>
        </p>
      </div>
    </div>
  );
}

function Frame2117921509() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame2117921511 />
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">(1DT = 1KRW)</p>
    </div>
  );
}

function Frame2117921377() {
  const { wallet } = useMyWallet();
  const [dtBalance, setDTBalance] = useState<number>(0);

  useEffect(() => {
    setDTBalance(wallet.balance_dt);
  }, [wallet.balance_dt]);

  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">{formatCurrency(dtBalance)}</p>
    </div>
  );
}

function Frame2117921378() {
  const { wallet } = useMyWallet();
  const [dtBalance, setDTBalance] = useState<number>(0);

  useEffect(() => {
    setDTBalance(wallet.balance_dt);

    const updateBalance = async () => {

      while (true) {
        let bal = await wallet.getDTBalance(SOL_ADDRESS);
        wallet.balance_dt = Number(bal);
        setDTBalance(wallet.balance_dt);
        console.log("Updated DT Balance:", wallet.balance_dt);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

    };
    updateBalance();

  }, [wallet.balance_dt]);

  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[0px]">
        <span className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] text-[16px] tracking-[-0.08px]">{formatNumber(dtBalance)}</span>
        <span className="leading-[20px] text-[14px]">{` DT`}</span>
      </p>
      <Frame2117921377 />
    </div>
  );
}

function Group826115() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">보유량</p>
          <Frame2117921378 />
        </div>
      </div>
    </div>
  );
}

function ButtonGroup({ onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="flex gap-[8px] w-full" data-name="button">
      <Button
        variant="secondary"
        className="flex-1"
        onClick={onNavigateToExchange}
      >
        환전하기
      </Button>
      <Button
        variant="primary"
        className="flex-1"
        onClick={onNavigateToWithdrawal}
      >
        출금하기
      </Button>
    </div>
  );
}

function List1({ onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
      <Group826115 />
      <ButtonGroup onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
    </div>
  );
}

function Frame2117921365({ onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
          <Frame2117921509 />
          <List1 onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921508({ onNavigateToDeposit, onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToDeposit?: () => void; onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame2117921364 onNavigateToDeposit={onNavigateToDeposit} />
      <Frame2117921365 onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
    </div>
  );
}

function Frame2117921143({ onNavigateToDeposit, onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToDeposit?: () => void; onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame2117918982 />
      <Frame2117921508 onNavigateToDeposit={onNavigateToDeposit} onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
    </div>
  );
}

function Component({ onNavigateToDeposit, onNavigateToExchange, onNavigateToWithdrawal }: { onNavigateToDeposit?: () => void; onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-0 pt-[32px] px-0 relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
      <Frame2117921143 onNavigateToDeposit={onNavigateToDeposit} onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Frame2117918983() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre">음악 저작권 토큰(ST)</p>
    </div>
  );
}

function NpComTabGrdN9() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_n.9">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre">최근 본</p>
      </div>
    </div>
  );
}

function NpComTabGrdO9() {
  return (
    <div className="bg-[#4d54ff] box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_o.9">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre">보유</p>
      </div>
    </div>
  );
}

function TabL1SldContainer2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-[20px] pt-0 px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tab_com_grd">
        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
          <NpComTabGrdN9 />
        </div>
        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
          <NpComTabGrdO9 />
        </div>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component8() {



  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">라일락 - IU</p>
      <Component6 />
    </div>
  );
}

function Ci() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
      <div className="relative shrink-0 size-[36px]" data-name="Mask group">
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 1" style={{ maskImage: `url('${imgImage1}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
        </div>
      </div>
      <Component8 />
    </div>
  );
}

function LeftInfo() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
      <Ci />
    </div>
  );
}

function ListContents() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
      <LeftInfo />
      <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#2d78fa] text-[16px] text-right w-[min-content]">10 ST</p>
        <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2d78fa] text-[12px] text-nowrap text-right">
            <p className="leading-[18px] whitespace-pre">-1.35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrListModule({ onClick }: { onClick?: () => void }) {
  const { wallet } = useMyWallet();
  const [stBalance, setSTBalance] = useState<number>(0);

  useEffect(() => {

    const updateBalance = async () => {

      while (true) {
        let bal = await wallet.getSTBalance(SOL_ADDRESS);
        // console.log('[WalletMainUsdc] Initial balance fetch...', bal);
        console.log("Updated ST Balance:", wallet.balance_st);
        wallet.balance_st = Number(bal);
        setSTBalance(wallet.balance_st);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

    };
    updateBalance();
    // while (true) {
    //   let balAfter = await wallet.getSTBalance(SOL_ADDRESS);
    //   console.log('[WalletMainUsdc] Waiting for balance update...', balAfter);
    //   wallet.balance_st = Number(balAfter);
    //   setSTBalance(wallet.balance_st);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }
  }, [wallet.balance_st]);

  return (
    <>
      {stBalance > 0 && (
        <div
          className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full cursor-pointer"
          data-name="tr_list_module"
          onClick={onClick}
        >
          <ListContents />
        </div>
      )}
    </>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component10() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">Dynamite - BTS</p>
      <Component9 />
    </div>
  );
}

function Ci1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
      <div className="relative shrink-0 size-[36px]" data-name="Mask group">
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 2" style={{ maskImage: `url('${imgImage1}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
      </div>
      <Component10 />
    </div>
  );
}

function LeftInfo1() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
      <Ci1 />
    </div>
  );
}

function ListContents1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
      <LeftInfo1 />
      <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content]">30 ST</p>
        <div className="bg-[#fcf4f4] box-border content-stretch flex gap-[10px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap text-right">
            <p className="leading-[18px] whitespace-pre">+3.99%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrListModule1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
      <ListContents1 />
    </div>
  );
}

function List2({ onNavigateToLilacDetail }: { onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[20px] py-0 relative shrink-0 w-[360px]" data-name="list">
      <TrListModule onClick={onNavigateToLilacDetail} />
      <TrListModule1 />
    </div>
  );
}

function Frame2117918841({ onNavigateToLilacDetail }: { onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <List2 onNavigateToLilacDetail={onNavigateToLilacDetail} />
    </div>
  );
}

function Frame2117921373({ onNavigateToLilacDetail }: { onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <TabL1SldContainer2 />
      <Frame2117918841 onNavigateToLilacDetail={onNavigateToLilacDetail} />
    </div>
  );
}

function Frame2117921144({ onNavigateToLilacDetail }: { onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame2117918983 />
      <Frame2117921373 onNavigateToLilacDetail={onNavigateToLilacDetail} />
    </div>
  );
}

function Group() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <g id="Group">
        <g id="Vector"></g>
        <path d={svgPaths.p2435f600} fill="var(--fill-0, #2A3FEC)" id="Vector_2" />
      </g>
    </svg>
  );
}

function InfoOutline() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Info outline">
      <Group />
    </div>
  );
}

function Frame2117921371() {
  return (
    <div className="bg-[#f1f2ff] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative w-full">
          <InfoOutline />
          <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2a3fec] text-[11px] text-nowrap whitespace-pre">DT는 원화(KRW)에 페깅됩니다 (1DT = 1KRW)</p>
        </div>
      </div>
    </div>
  );
}

function Frame2117921380() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[20px] py-0 relative w-full">
          <Frame2117921371 />
        </div>
      </div>
    </div>
  );
}

function Component11({ onNavigateToLilacDetail }: { onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-0 pt-[32px] px-0 relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
      <Frame2117921144 onNavigateToLilacDetail={onNavigateToLilacDetail} />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#555c6e] text-[14px] text-center w-[min-content]">
        <p className="leading-[20px]">전체 보기</p>
      </div>
      <Frame2117921380 />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function AllContents({ onNavigateToDeposit, onNavigateToExchange, onNavigateToWithdrawal, onNavigateToHistory, onNavigateToTokenSecurities, onNavigateToLilacDetail }: { onNavigateToDeposit?: () => void; onNavigateToExchange?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void; onNavigateToTokenSecurities?: () => void; onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="all_contents">
      <Component01Container onNavigateToDeposit={onNavigateToDeposit} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} />
      <Component onNavigateToDeposit={onNavigateToDeposit} onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} />
      <Component11 onNavigateToLilacDetail={onNavigateToLilacDetail} />
    </div>
  );
}

function Component02() {
  return (
    <div className="absolute h-[26.667px] left-[calc(100%-16px)] top-[15.33px] translate-x-[-50%] translate-y-[-50%] w-[24px]" data-name="02">
      <svg className="block max-w-none size-full" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11.3333H24V22C24 23.4728 22.8061 24.6667 21.3333 24.6667H2.66667C1.19391 24.6667 0 23.4728 0 22V11.3333Z" fill="#1644B3" />
        <path d="M10.2284 2.24146C11.2387 1.34336 12.7613 1.34336 13.7716 2.24146L24 11.3333H0L10.2284 2.24146Z" fill="#205CD7" />
        <path d="M2 2.66667C2 1.19391 3.19391 0 4.66667 0H19.3333C20.8061 0 22 1.19391 22 2.66667V19.3333C22 20.8061 20.8061 22 19.3333 22H4.66667C3.19391 22 2 20.8061 2 19.3333V2.66667Z" fill="white" />
        <path d="M6 5.33333H15.3333" stroke="#5D6378" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 9.33333H10" stroke="#5D6378" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 12L16.9918 23.6819C18.316 24.5923 17.6717 26.6667 16.0648 26.6667H2.66667C1.19391 26.6667 0 25.4728 0 24V12Z" fill="#80B7FD" />
        <path d="M24 12V24C24 25.4728 22.8061 26.6667 21.3333 26.6667H2.66667L24 12Z" fill="#619FFB" />
      </svg>
    </div>
  );
}

function Txt() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-nowrap" data-name="txt">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#777e8c] text-[12px]">
        <p className="leading-[18px] text-nowrap whitespace-pre">지금까지 경험은 어떠셨나요?</p>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#333950] text-[16px] tracking-[-0.5px] whitespace-pre font-bold">고객님의 의견이 궁금해요!</p>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="contents">
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="ic_fx_usersurvey_32">
        <Component02 />
      </div>
      <Txt />
    </div>
  );
}

function Ic00Com20Line125Right333950() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g id="ic_00com_20_line1.25_right_333950">
        <g id="gudie"></g>
        <path d={svgPaths.p1b1d8200} id="Path" stroke="var(--stroke-0, #777E8C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
      </g>
    </svg>
  );
}

function CsIntroModule() {
  return (
    <div className="relative shrink-0 w-full" data-name="cs_intro_module">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[20px] py-0 relative w-full">
          <Contents />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <div className="relative size-[20px]" data-name="ic_00com_20_line_arrow">
                <Ic00Com20Line125Right333950 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2117920823() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <CsIntroModule />
      <div className="h-px relative shrink-0 w-[320px]" data-name="divider">
        <div className="absolute bg-[#eeeeee] inset-0" data-name="np_00com_dv_320x1_sld.9" />
      </div>
    </div>
  );
}

function Frame1707488966() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[20px] py-0 relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[14px] text-nowrap whitespace-pre font-bold">개인정보처리방침</p>
          <div className="bg-[#cccfd3] h-[8px] shrink-0 w-px" />
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#777e8c] text-[13px] text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre font-bold text-[14px]">신용정보활용체제</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2117920945() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">투자 유의사항</p>
    </div>
  );
}

function Frame2117920822() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center px-[20px] py-0 relative w-full">
          <Frame2117920945 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921106() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame1707488966 />
      <Frame2117920822 />
    </div>
  );
}

function Frame2117921334() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="bg-[#f6f6f9] box-border content-stretch flex flex-col gap-[24px] items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full" data-name="Footer Menu">
        <Frame2117920823 />
        <Frame2117921106 />
      </div>
    </div>
  );
}

function Group829739() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group829739">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_38.46%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">홈</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="1">
      <Group829739 />
    </div>
  );
}

function Group830148() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group830148">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157471">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_26.92%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">관심</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="2">
      <Group830148 />
    </div>
  );
}

function Group829740() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group829740">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_15.38%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">현재가</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="3">
      <Group829740 />
    </div>
  );
}

function Group829741() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group829741">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_26.92%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">주문</p>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="4">
      <Group829741 />
    </div>
  );
}

function Group829742() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group829742">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_26.92%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">잔고</p>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="5">
      <Group829742 />
    </div>
  );
}

function Group822201() {
  return (
    <div className="absolute inset-[16.667%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px] mask-size-[24px_24px]" style={{ maskImage: `url('${img1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group 822201">
          <path d={svgPaths.p1560c340} fill="var(--fill-0, #777E8C)" id="Subtract" />
          <path clipRule="evenodd" d={svgPaths.p2fbfa000} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract_2" />
        </g>
      </svg>
    </div>
  );
}

function Component7() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-start px-[8px] py-[14px] relative shrink-0" data-name="7">
      <div className="relative shrink-0 size-[24px]" data-name="ic_00com_qm_24_sld_setting">
        <Group822201 />
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute content-stretch flex items-start left-[8px] top-0" data-name="menu">
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
      <Component7 />
    </div>
  );
}

function Group830159() {
  return (
    <div className="absolute contents inset-[25.7%_31.82%_53.7%_31.82%]" data-name="Group830159">
      <div className="absolute bg-white inset-[25.7%_31.82%_71.3%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-4.85px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157576" style={{ maskImage: `url('${imgRectangle157576}')` }} />
      <div className="absolute bg-white inset-[34.5%_31.82%_62.5%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-9.25px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157577" style={{ maskImage: `url('${imgRectangle157576}')` }} />
      <div className="absolute bg-white inset-[43.3%_31.82%_53.7%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-13.65px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157578" style={{ maskImage: `url('${imgRectangle157576}')` }} />
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

function Img00ComQmGrd50Menu() {
  return (
    <div className="absolute h-[50px] left-[316px] top-px w-[44px]" data-name="img_00com_qm_grd_50_menu">
      <div className="absolute inset-0" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 50">
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_1_5074)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_5074" x1="0" x2="45.3146" y1="0" y2="1.22123">
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
    </div>
  );
}

function Ic00Com16LineRight999Ea4() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="ic_00com_16_line_right_999ea4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ic_00com_16_line_right_999ea4">
          <g id="gudie"></g>
          <path d={svgPaths.p1bae7780} id="Path" stroke="var(--stroke-0, #999EA4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Img00ComQm24Nextarrow() {
  return (
    <div className="absolute left-[4px] size-[16px] top-[17px]" data-name="img_00com_qm_24_nextarrow">
      <div className="absolute inset-0" data-name="ic_00com_16_line_arrow">
        <Ic00Com16LineRight999Ea4 />
      </div>
    </div>
  );
}

function Inner() {
  return (
    <div className="absolute h-[52px] left-0 top-0 w-[360px]" data-name="inner">
      <Menu />
      <Img00ComQmGrd50Menu />
      <div className="absolute inset-[1.92%_12.22%_1.92%_81.11%]" data-name="img_00com_qm_24">
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none h-[50px] rotate-[180deg] scale-y-[-100%] w-[24px]">
            <div className="bg-gradient-to-r from-[#ffffff] from-[60.417%] size-full to-[rgba(255,255,255,0)]" data-name="dim" />
          </div>
        </div>
        <Img00ComQm24Nextarrow />
      </div>
      <div className="absolute bottom-0 h-px left-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#eeeeee] inset-0" />
      </div>
      <div className="absolute h-px left-0 top-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f4f4f4] inset-0" />
      </div>
    </div>
  );
}

function ContentsFooter({ onNavigateToDeposit, onNavigateToExchange, onNavigateToHome, onNavigateToWithdrawal, onNavigateToHistory, onNavigateToTokenSecurities, onNavigateToLilacDetail }: { onNavigateToDeposit?: () => void; onNavigateToExchange?: () => void; onNavigateToHome?: () => void; onNavigateToWithdrawal?: () => void; onNavigateToHistory?: () => void; onNavigateToTokenSecurities?: () => void; onNavigateToLilacDetail?: () => void }) {
  return (
    <div className="content-stretch flex flex-col h-[1149px] items-start relative shrink-0 w-full" data-name="contents+footer">
      <Header onNavigateToHome={onNavigateToHome} />
      <AllContents onNavigateToDeposit={onNavigateToDeposit} onNavigateToExchange={onNavigateToExchange} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} onNavigateToTokenSecurities={onNavigateToTokenSecurities} onNavigateToLilacDetail={onNavigateToLilacDetail} />
    </div>
  );
}

interface Component04UsdcProps {
  onNavigateToDeposit?: () => void;
  onNavigateToExchange?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToWithdrawal?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToTokenSecurities?: () => void;
  onNavigateToLilacDetail?: () => void;
  onOpenMenu?: () => void;
}

export default function Component04Usdc({ onNavigateToDeposit, onNavigateToExchange, onNavigateToHome, onNavigateToWithdrawal, onNavigateToHistory, onNavigateToTokenSecurities, onNavigateToLilacDetail, onOpenMenu }: Component04UsdcProps) {
  const { wallet, isInitialized } = useMyWallet();

  useEffect(() => {
    const initializeWallet = async () => {
      // if (!isInitialized) {
      try {
        await wallet.initialize();

        const bal = await wallet.getSTBalance(SOL_ADDRESS);
        wallet.balance_st = Number(bal);

        // // 업데이트 1초단위 확인
        // let balAfter = await wallet.getSTBalance(SOL_ADDRESS);
        // while (Number(balAfter) == Number(bal)) {
        //   balAfter = await wallet.getSTBalance(SOL_ADDRESS);
        //   console.log('[WalletMainUsdc] Waiting for balance update...', balAfter);
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        // }

        // alert('Wallet has been initialized successfully.');
        console.log('[WalletMainUsdc] Wallet initialized');
      } catch (error) {
        console.error('[WalletMainUsdc] Failed to initialize wallet:', error);
      }
      // }
    };
    initializeWallet();
  }, [isInitialized, wallet]);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full pb-[72px]" data-name="04.홈-디지털월렛 메인-USDC탭">
      <ContentsFooter onNavigateToDeposit={onNavigateToDeposit} onNavigateToExchange={onNavigateToExchange} onNavigateToHome={onNavigateToHome} onNavigateToWithdrawal={onNavigateToWithdrawal} onNavigateToHistory={onNavigateToHistory} onNavigateToTokenSecurities={onNavigateToTokenSecurities} onNavigateToLilacDetail={onNavigateToLilacDetail} />
      <MobileAppFooter activeTab="balance" onOpenMenu={onOpenMenu} />
    </div>
  );
}

function Component18({ onSelectFirst }: { onSelectFirst?: () => void }) {
  const handleClick = () => {
    if (onSelectFirst) {
      onSelectFirst();
    }
  };

  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-center overflow-clip relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
      <div className="h-[104px] relative shrink-0 w-[320px] cursor-pointer" data-name="img_08ac_bn_320x104_multi_01" onClick={handleClick}>
        <div className="absolute inset-0" data-name="np_00com_bn_4434ff_sld.9">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage12} />
        </div>
      </div>
      <Frame2117921143 />
    </div>
  );
}