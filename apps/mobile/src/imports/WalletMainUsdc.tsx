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

interface WalletMainUsdcProps {
  onNavigateToDeposit?: () => void;
  onNavigateToExchange?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToWithdrawal?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToTokenSecurities?: () => void;
  onNavigateToLilacDetail?: () => void;
  onOpenMenu?: () => void;
}

export default function WalletMainUsdc({ onNavigateToDeposit, onNavigateToExchange, onNavigateToHome, onNavigateToWithdrawal, onNavigateToHistory, onNavigateToTokenSecurities, onNavigateToLilacDetail, onOpenMenu }: WalletMainUsdcProps) {
  
  function USDCBalanceKRW() {
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

  function USDCBalanceDisplay() {
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
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-[105px]">
          <span className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] text-[16px] tracking-[-0.08px]">
            {formatNumber(usdcBalance)}
          </span>
          <span className="leading-[20px] text-[14px]">{` USDC`}</span>
        </p>
        <USDCBalanceKRW />
      </div>
    );
  }

  function DTBalanceKRW() {
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

  function DTBalanceDisplay() {
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
        <DTBalanceKRW />
      </div>
    );
  }

  function STTokenListItem({ onClick }: { onClick?: () => void }) {
    const { wallet } = useMyWallet();
    const [stBalance, setSTBalance] = useState<number>(0);

    useEffect(() => {
      const updateBalance = async () => {
        while (true) {
          let bal = await wallet.getSTBalance(SOL_ADDRESS);
          console.log("Updated ST Balance:", wallet.balance_st);
          wallet.balance_st = Number(bal);
          setSTBalance(wallet.balance_st);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      };
      updateBalance();
    }, [wallet.balance_st]);

    return (
      <>
        {stBalance > 0 && (
          <div
            className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full cursor-pointer"
            data-name="tr_list_module"
            onClick={onClick}
          >
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
              <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                  <div className="relative shrink-0 size-[36px]" data-name="Mask group">
                    <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 1" style={{ maskImage: `url('${imgImage1}')` }}>
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                    <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">라일락 - IU</p>
                    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#2d78fa] text-[16px] text-right w-[min-content]">10 ST</p>
                <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
                  <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2d78fa] text-[12px] text-nowrap text-right">
                    <p className="leading-[18px] whitespace-pre">-1.35%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const { wallet, isInitialized } = useMyWallet();

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        await wallet.initialize();
        const bal = await wallet.getSTBalance(SOL_ADDRESS);
        wallet.balance_st = Number(bal);
        console.log('[WalletMainUsdc] Wallet initialized');
      } catch (error) {
        console.error('[WalletMainUsdc] Failed to initialize wallet:', error);
      }
    };
    initializeWallet();
  }, [isInitialized, wallet]);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full pb-[72px]" data-name="04.홈-디지털월렛 메인-USDC탭">
      <div className="content-stretch flex flex-col h-[1149px] items-start relative shrink-0 w-full" data-name="contents+footer">
        <MobilePageHeader title="SOL 디지털 월렛" onBack={onNavigateToHome} />

        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="all_contents">
          {/* 01_container */}
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="01_container">
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-0 pt-[12px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
                        <p className="leading-[20px] whitespace-pre">총 자산</p>
                      </div>
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
                    </div>
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[26px] text-center text-nowrap tracking-[-0.13px]">
                        <p className="leading-[32px] whitespace-pre">32,850,000</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white box-border content-stretch flex items-center justify-between pb-0 pt-[8px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
                  <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
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
                  </div>
                </div>
              </div>

              <div className="relative shrink-0 w-full">
                <div className="flex flex-col justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center pb-0 pt-[20px] px-[20px] relative w-full">
                    <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
                    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">투자 자산(75.2%)</p>
                      <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">24,700,000 원</p>
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
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">디지털 자산(12.8%)</p>
                      <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">4,210,000 원</p>
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
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium relative shrink-0 text-[#777e8c] text-[13px]">예치금(9.7%)</p>
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold relative shrink-0 text-[#333950] text-[14px] text-right">3,190,000 원</p>
                    </div>
                    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium relative shrink-0 text-[#777e8c] text-[13px]">기타자산(2.3%)</p>
                      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold relative shrink-0 text-[#333950] text-[14px] text-right">760,000 원</p>
                    </div>
                    <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white relative shrink-0 w-full" data-name="container">
              <div className="flex flex-col justify-center size-full">
                <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center p-[20px] relative w-full">
                  <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="index_area">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
                      <ActionCard icon="💰" title="입금" variant="deposit" onClick={onNavigateToDeposit} />
                      <ActionCard icon="💵" title="출금" variant="withdraw" onClick={onNavigateToWithdrawal} />
                      <ActionCard icon="📊" title="거래내역" variant="history" onClick={onNavigateToHistory} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>
          </div>

          {/* 보유 토큰 섹션 */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-0 pt-[32px] px-0 relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
                <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre">보유 토큰</p>
              </div>

              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                {/* USDC 토큰 */}
                <div className="relative shrink-0 w-full">
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
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

                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
                        <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
                          <div className="size-full">
                            <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
                              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">보유량</p>
                              <USDCBalanceDisplay />
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" className="w-[320px]" onClick={onNavigateToDeposit}>입금하기</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DT 토큰 */}
                <div className="relative shrink-0 w-full">
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
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
                        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">(1DT = 1KRW)</p>
                      </div>

                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
                        <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
                          <div className="size-full">
                            <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
                              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre">보유량</p>
                              <DTBalanceDisplay />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-[8px] w-full" data-name="button">
                          <Button variant="secondary" className="flex-1" onClick={onNavigateToExchange}>환전하기</Button>
                          <Button variant="primary" className="flex-1" onClick={onNavigateToWithdrawal}>출금하기</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>
          </div>

          {/* 음악 저작권 토큰(ST) 섹션 */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-0 pt-[32px] px-0 relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
            <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
                <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre">음악 저작권 토큰(ST)</p>
              </div>

              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-[20px] pt-0 px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tab_com_grd">
                    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
                      <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_n.9">
                        <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.08px]">
                          <p className="leading-[24px] whitespace-pre">최근 본</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
                      <div className="bg-[#4d54ff] box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_o.9">
                        <div className="flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.08px]">
                          <p className="leading-[24px] whitespace-pre">보유</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col items-start px-[20px] py-0 relative shrink-0 w-[360px]" data-name="list">
                    <STTokenListItem onClick={onNavigateToLilacDetail} />

                    {/* Dynamite - BTS 토큰 */}
                    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
                      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
                        <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                          <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                            <div className="relative shrink-0 size-[36px]" data-name="Mask group">
                              <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 2" style={{ maskImage: `url('${imgImage1}')` }}>
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                              <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">Dynamite - BTS</p>
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                                <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                          <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content]">30 ST</p>
                          <div className="bg-[#fcf4f4] box-border content-stretch flex gap-[10px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
                            <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap text-right">
                              <p className="leading-[18px] whitespace-pre">+3.99%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#555c6e] text-[14px] text-center w-[min-content]">
              <p className="leading-[20px]">전체 보기</p>
            </div>

            <div className="relative shrink-0 w-full">
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[20px] py-0 relative w-full">
                  <div className="bg-[#f1f2ff] relative rounded-[4px] shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative w-full">
                        <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Info outline">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                            <g id="Group">
                              <g id="Vector"></g>
                              <path d={svgPaths.p2435f600} fill="var(--fill-0, #2A3FEC)" id="Vector_2" />
                            </g>
                          </svg>
                        </div>
                        <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2a3fec] text-[11px] text-nowrap whitespace-pre">DT는 원화(KRW)에 페깅됩니다 (1DT = 1KRW)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>
          </div>
        </div>
      </div>

      <MobileAppFooter activeTab="balance" onOpenMenu={onOpenMenu} />
    </div>
  );
}
