import { useState } from "react";
import svgPaths from "./svg-3j7okfeojy";
import { Button } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  USDC_CONTRACT_ADDRESS,
  formatCurrency,
  formatNumber,
  getERC20Balance,
  switchNetwork,
  KRW_USD_EXCHANGE_RATE
} from "../constants/wallet";


import { metaMaskWallet } from "./metaMask";

interface DepositStep1Props {
  onNavigateBack?: () => void;
  onNavigateNext?: () => void;
}

const MASKED_ADDRESS = "0x9f8e...7b6a";
const NETWORK_NAME = "Polygon Amoy Testnet";

const GradientBar = () => (
  <div className="h-1 w-full rounded-full bg-[#eeeeee]">
    <div className="h-1 w-1/2 rounded-full bg-gradient-to-r from-[#4A2AEC] to-[#3860FF]" />
  </div>
);

const MetaMaskIllustration = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <g>
      <path d={svgPaths.p18d7e200} fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pa6ea1f2} fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pc502a00} fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pa572b50} fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p84dd4f0} fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p3c205b80} fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p2e350080} fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pba62300} fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pc47ce00} fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p251d4000} fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p3fac3b00} fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p69bd080} fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#2A3FEC" />
    <path d="M6 10L8.4 12.4L14 6.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_refresh)">
      <path d={svgPaths.p211eec00} fill="#999EA4" />
    </g>
    <defs>
      <clipPath id="clip0_refresh">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ApproxIcon = () => (
  <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
    <path d={svgPaths.p3060fd40} fill="#777E8C" />
  </svg>
);

const AvailableBalanceCard = ({ usdcBalance, rate }: { usdcBalance: number; rate: number }) => (
  <div className="bg-white box-border flex w-full flex-col gap-[6px] items-start rounded-xl border border-[#ebedf5] px-5 pb-5 pt-3.5 shadow-[0px_4px_18px_rgba(17,17,17,0.04)]">
    <div className="flex flex-col items-start">
      <span className="font-['Spoqa Han Sans Neo',sans-serif] text-[14px] text-[#999ea4]">사용 가능한 USDC</span>
    </div>
    <div className="mt-2 flex items-center gap-2">
      <span className="font-['Spoqa Han Sans Neo',sans-serif] text-[26px] font-bold leading-[32px] tracking-[-0.13px] text-[#111111]">
        {formatNumber(usdcBalance)} USDC
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f6f9]">
        <div className="-rotate-180 scale-y-[-1]">
          <RefreshIcon />
        </div>
      </span>
    </div>
    <div className="flex items-center gap-1 font-['Spoqa Han Sans Neo',sans-serif] text-[13px] text-[#999ea4]">
      <ApproxIcon />
      {/* <span>{formatCurrency(AVAILABLE_USDC_KRW)}</span> */}
      <span>{formatCurrency(rate * usdcBalance)}</span>
    </div>
  </div>
);

export default function DepositStep1({ onNavigateBack, onNavigateNext }: DepositStep1Props) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [usdcBalance, setUsedBalance] = useState<number>(0);
  const [krwRate, setKrwRate] = useState<number>(0);

  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|iPhone|iPad|iPod/i.test(ua);
  };
  const redirectToMetaMask = () => {
    const dappUrl = encodeURIComponent('digital-wallet-poc-mobile.vercel.app');
    const metamaskConnectLink = `https://metamask.app.link/dapp/${dappUrl}/deposit/connect-wallet`;
    // const paymentUrl = 'https://metamask.app.link/send/0x8B0180f2101c8260d49339abfEe87927412494B4@80002/transfer?address=0x13795956edd9CDcC373d14c4D4F8D792e20fB1Fb&uint256=1e6';
    //window.location.href = metamaskDeepLink;
    window.location.href = metamaskConnectLink;
  };
  const handleConnect = async () => {
    setKrwRate(KRW_USD_EXCHANGE_RATE);
    await metaMaskWallet.initialize(80002);
    setAddress(metaMaskWallet.account);
    setUsedBalance(metaMaskWallet.balance);
    setIsConnected(true);
  };

  return (
    <div className="relative flex min-h-full w-full flex-col bg-white">
      <MobilePageHeader title="USDC 입금" onBack={onNavigateBack} />

      <div className="px-4 pt-4">
        <GradientBar />
      </div>

      <main className="flex-1 overflow-y-auto px-5 pb-28 pt-10">
        <section className="text-left">
          <div className="text-[20px] font-semibold leading-[28px] tracking-[-0.5px] text-[#111111]">
            <p className="mb-1">MetaMask에</p>
            <p>연결하세요</p>
          </div>
        </section>

        <section className="mt-8 flex flex-col items-center gap-6">
          <MetaMaskIllustration />
          {!isConnected ? (
            <Button
              variant="primary"
              size="default"
              className="w-full max-w-[320px] font-semibold"
              customColor="#FF9954"
              onClick={handleConnect}
            >
              MetaMask 연결하기
            </Button>
          ) : (
            <></>
          )}
        </section>

        {isConnected && (
          <section className="mt-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-md bg-[#f4f6f9] p-4">
                <CheckCircle />
                <div>
                  <p className="text-[12px] font-medium text-[#333950]">지갑 연결됨</p>
                  <p className="mt-1 text-[11px] leading-[16px] text-[#77738c]">
                    주소: {address}
                    <br />
                    네트워크: {NETWORK_NAME}
                  </p>
                </div>
              </div>
            </div>
            <AvailableBalanceCard usdcBalance={usdcBalance} rate={krwRate} />
          </section>
        )}
      </main>

      {isConnected && (
        <MobileStickyFooter>
          <Button variant="primary" size="lg" className="w-full" onClick={onNavigateNext}>
            다음
          </Button>
        </MobileStickyFooter>
      )}
    </div>
  );
}

