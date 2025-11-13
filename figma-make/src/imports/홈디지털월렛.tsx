import svgPaths from "./svg-5lp5l9p5tf";
import imgImage12 from "figma:asset/904161eaaeda9a6e1380789b5df872e0184f6ddd.png";
import imgImage13 from "figma:asset/034a0093adcbb8be6bca570d81a33610166d62db.png";
import imgImage2 from "figma:asset/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png";
import imgImage3 from "figma:asset/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png";
import { imgImage1, img, img1, imgRectangle157576 } from "./svg-mxll4";

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_5553)" id="Help">
          <g id="Vector"></g>
          <path d={svgPaths.pe934c00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_5553">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre font-bold">총 자산</p>
      </div>
      <Help />
    </div>
  );
}

function Refresh() {
  return (
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
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[26px] text-center text-nowrap tracking-[-0.13px]">
        <p className="leading-[32px] whitespace-pre font-bold">32,850,000</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]">
      <Frame18 />
      <Frame17 />
    </div>
  );
}

function TabL1SldContainer() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-0 pt-[12px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <Frame15 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre font-medium">$25,569 (환율: 1,300원)</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame25 />
    </div>
  );
}

function TabL1SldContainer1() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-between pb-0 pt-[8px] px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <Frame19 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <TabL1SldContainer />
      <TabL1SldContainer1 />
    </div>
  );
}

function Frame16() {
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
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre font-medium">850,000원 (+3.6%)</p>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre font-bold">24,700,000 원</p>
      <Frame16 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre font-medium">투자 자산(75.2%)</p>
      <Frame34 />
    </div>
  );
}

function Frame20() {
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
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre font-medium">320,000원 (+8.2%)</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre font-bold">4,210,000 원</p>
      <Frame20 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre font-medium">디지털 자산(12.8%)</p>
      <Frame35 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] relative shrink-0 text-[#777e8c] text-[13px] font-medium">예치금(9.7%)</p>
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] relative shrink-0 text-[#333950] text-[14px] text-right font-bold">3,190,000 원</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-full whitespace-pre" data-name="text">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] relative shrink-0 text-[#777e8c] text-[13px] font-medium">기타자산(2.3%)</p>
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] relative shrink-0 text-[#333950] text-[14px] text-right font-bold">760,000 원</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-white relative shrink-0 w-full">
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

function Frame31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame33 />
      <Frame32 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[16px]">💰</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px] font-bold">입금</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat() {
  return (
    <div className="basis-0 bg-[#ffe8e8] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[16px]">💵</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px] font-bold">출금</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat1() {
  return (
    <div className="basis-0 bg-[#f1f2ff] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[16px]">📊</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px] font-bold">거래내역</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat2() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
      <NpIndexCardFlat />
      <NpIndexCardFlat1 />
      <NpIndexCardFlat2 />
    </div>
  );
}

function IndexArea() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="index_area">
      <Scroll />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="container">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center p-[20px] relative w-full">
          <IndexArea />
        </div>
      </div>
    </div>
  );
}

function Component01Container() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start ml-0 mt-0 relative w-[360px]" data-name="01_container">
      <Frame31 />
      <Container />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre font-bold">보유 토큰</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="image 12">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage12} />
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] text-center text-nowrap tracking-[-0.5px]">
        <p className="whitespace-pre">
          <span className="leading-[24px] text-[16px] font-bold">USDC</span>
          <span className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[18px] not-italic text-[#111111] text-[12px] font-medium">(Polygon)</span>
        </p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre font-medium">0 원</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-[105px]">
        <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] text-[16px] tracking-[-0.08px] font-bold">1,000</span>
        <span className="leading-[20px] text-[14px] font-medium">{` USDC`}</span>
      </p>
      <Frame27 />
    </div>
  );
}

function Group3() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre font-medium">보유량</p>
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
      <Group3 />
      <div className="h-[40px] relative shrink-0 w-[320px]" data-name="Button/btn_main">
        <div className="absolute bg-[#4d54ff] inset-0 rounded-[6px]" data-name="btn_main_n.9" />
        <p className="absolute font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[27.5%_6.25%_26.35%_6.25%] leading-[20px] not-italic text-[14px] text-center text-white font-medium">입금하기</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
          <Frame38 />
          <List />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[184px]">
      <div className="relative shrink-0 size-[24px]" data-name="image 13">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[187.38%] left-[-90.78%] max-w-none top-[-43.69%] w-[281.55%]" src={imgImage13} />
        </div>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] text-center text-nowrap tracking-[-0.5px]">
        <p className="whitespace-pre">
          <span className="leading-[24px] text-[16px] font-bold">DT</span>
          <span className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[18px] not-italic text-[#111111] text-[12px]">(Deposit Coin)</span>
        </p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame39 />
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre font-medium">(1DT = 1KRW)</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre font-medium">1,328,850 원</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[0px]">
        <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] text-[16px] tracking-[-0.08px] font-bold">1,348,850</span>
        <span className="leading-[20px] text-[14px] font-medium">{` USDC`}</span>
      </p>
      <Frame28 />
    </div>
  );
}

function Group4() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-full" data-name="Group826114">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-nowrap whitespace-pre font-medium">보유량</p>
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Np00ComBtnL1SubN() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="np_00com_btn_l1_sub_n.9">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[156px]" data-name="np_00com_h40_sld_3_n.9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 156 40">
          <path d={svgPaths.p28cc4c00} fill="var(--fill-0, #F4F6F9)" id="np_00com_h40_sld_3_n.9" />
        </svg>
      </div>
      <p className="[grid-area:1_/_1] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] ml-[78px] mt-[10px] not-italic relative text-[#333950] text-[13px] text-center translate-x-[-50%] w-[64px] font-medium">환전하기</p>
    </div>
  );
}

function Np00ComBtnL1SubN1() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[164px] mt-0 place-items-start relative" data-name="np_00com_btn_l1_sub_n.9">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[156px]" data-name="np_00com_h40_sld_3_n.9">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 156 40">
          <path d={svgPaths.p28cc4c00} fill="var(--fill-0, #4D54FF)" id="np_00com_h40_sld_3_n.9" />
        </svg>
      </div>
      <p className="[grid-area:1_/_1] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] ml-[78px] mt-[10px] not-italic relative text-[13px] text-center text-white translate-x-[-50%] w-[64px]">출금하기</p>
    </div>
  );
}

function Button() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="button">
      <Np00ComBtnL1SubN />
      <Np00ComBtnL1SubN1 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="list">
      <Group4 />
      <Button />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[20px] py-0 relative w-full">
          <Frame37 />
          <List1 />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame3 />
      <Frame36 />
    </div>
  );
}

function Component() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col gap-[20px] items-center ml-0 mt-[432px] overflow-clip pb-0 pt-[32px] px-0 relative w-[360px]" data-name="실시간순위_거래대금">
      <Frame12 />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre font-bold">음악 저작권 토큰(ST)</p>
    </div>
  );
}

function NpComTabGrdN() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="np_com_tab_grd_n.9">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre">최근 본</p>
      </div>
    </div>
  );
}

function NpComTabGrdO() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[20px] shrink-0 bg-[#4d54ff]" data-name="np_com_tab_grd_o.9">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre font-bold">보유</p>
      </div>
    </div>
  );
}

function TabL1SldContainer2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center pb-[20px] pt-0 px-[20px] relative shrink-0 w-[360px]" data-name="tab_l1_sld_container">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tab_com_grd">
        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
          <NpComTabGrdN />
        </div>
        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0" data-name="np_com_tab_grd">
          <NpComTabGrdO />
        </div>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">라일락 - IU</p>
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
        <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2d78fa] text-[16px] text-right w-[min-content] font-bold">50 ST</p>
        <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d78fa] text-[12px] text-nowrap text-right">
            <p className="leading-[18px] whitespace-pre">-1.35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrListModule() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
      <ListContents />
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">Dynamite - BTS</p>
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
      <Component11 />
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
        <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content] font-bold">30 ST</p>
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

function List2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[20px] py-0 relative shrink-0 w-[360px]" data-name="list">
      <TrListModule />
      <TrListModule1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <List2 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <TabL1SldContainer2 />
      <Frame2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame4 />
      <Frame24 />
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

function Frame23() {
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

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[20px] py-0 relative w-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Component12() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col gap-[20px] items-center ml-0 mt-[856px] overflow-clip pb-0 pt-[32px] px-0 relative w-[360px]" data-name="실시간순위_거래대금">
      <Frame13 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#555c6e] text-[14px] text-center w-[min-content]">
        <p className="leading-[20px]">전체 보기</p>
      </div>
      <Frame30 />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="absolute h-[26.667px] left-[calc(100%-16px)] top-[15.33px] translate-x-[-50%] translate-y-[-50%] w-[24px]" data-name="02">
      <img alt="" className="block max-w-none size-full" src={img} />
    </div>
  );
}

function Txt() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-nowrap" data-name="txt">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#777e8c] text-[12px]">
        <p className="leading-[18px] text-nowrap whitespace-pre">지금까지 경험은 어떠셨나요?</p>
      </div>
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#333950] text-[16px] tracking-[-0.5px] whitespace-pre">고객님의 의견이 궁금해요!</p>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="contents">
      <div className="overflow-visible relative shrink-0 size-[32px]" data-name="ic_fx_usersurvey_32">
        <Component10 />
      </div>
      <Txt />
    </div>
  );
}

function Ic00Com20Line125Right() {
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
                <Ic00Com20Line125Right />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <CsIntroModule />
      <div className="h-px relative shrink-0 w-[320px]" data-name="divider">
        <div className="absolute bg-[#eeeeee] inset-0" data-name="np_00com_dv_320x1_sld.9" />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[20px] py-0 relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">개인정보처리방침</p>
          <div className="bg-[#cccfd3] h-[8px] shrink-0 w-px" />
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#777e8c] text-[13px] text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">신용정보활용체제</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#777e8c] text-[13px] text-nowrap whitespace-pre">투자 유의사항</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center px-[20px] py-0 relative w-full">
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame8 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="bg-[#f6f6f9] box-border content-stretch flex flex-col gap-[24px] items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full" data-name="Footer Menu">
        <Frame9 />
        <Frame11 />
      </div>
    </div>
  );
}

function Quick() {
  return (
    <div className="[grid-area:1_/_1] bg-[#f6f6f9] box-border content-stretch flex flex-col h-[235px] items-start ml-0 mt-[1232px] pb-0 pt-[20px] px-0 relative w-[360px]" data-name="+Quick_주식">
      <Frame14 />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Component01Container />
      <Component />
      <Component12 />
      <Quick />
    </div>
  );
}

function ContentsFooter() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[1519px] items-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-[52px] px-0 top-0 w-[360px]" data-name="contents+footer">
      <Group11 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Group829739">
      <div className="absolute left-0 size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_38.46%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">홈</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="1">
      <Group5 />
    </div>
  );
}

function Group9() {
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
      <Group9 />
    </div>
  );
}

function Group6() {
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
      <Group6 />
    </div>
  );
}

function Group7() {
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
      <Group7 />
    </div>
  );
}

function Group8() {
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
      <Group8 />
    </div>
  );
}

function Group2() {
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
        <Group2 />
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

function Group10() {
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
      <Group10 />
    </div>
  );
}

function Img00ComQmGrd50Menu() {
  return (
    <div className="absolute h-[50px] left-[316px] top-px w-[44px]" data-name="img_00com_qm_grd_50_menu">
      <div className="absolute inset-0" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 50">
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_19_2135)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_19_2135" x1="0" x2="45.3146" y1="0" y2="1.22123">
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

function Ic00Com16LineRight999Ea() {
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
        <Ic00Com16LineRight999Ea />
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

function Quickmenu() {
  return (
    <div className="bg-white h-[52px] relative shrink-0 w-[360px]" data-name="quickmenu">
      <Inner />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0">
      <Quickmenu />
    </div>
  );
}

function Quick1() {
  return (
    <div className="absolute bg-[#f6f6f9] h-[52px] left-0 top-[1467px] w-[360px]" data-name="+ QUICK">
      <Frame />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[234px] top-[11px]" data-name="Group820325">
      <div className="absolute left-[234px] size-[28px] top-[11px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-0 top-0" data-name="+ HEADER">
      <div className="absolute h-[52px] left-0 top-0 w-[360px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 52">
          <path d="M0 0H360V52H0V0Z" fill="var(--fill-0, white)" id="bg" />
        </svg>
      </div>
      <div className="absolute inset-[1.79%_88.89%_94.02%_3.33%]" data-name="ic_00com_28_line_arrow_l_111">
        <div className="absolute inset-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector"></g>
          </svg>
        </div>
        <div className="absolute inset-[21.43%_35.71%]" data-name="Vector">
          <div className="absolute inset-[-4.04%_-9.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 21">
              <path d={svgPaths.p2c0ecd80} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[2.09%_57.78%_94.32%_11.11%] justify-center leading-[0] not-italic text-[#111111] text-[16px]">
        <p className="leading-[24px]">SOL 디지털 월렛</p>
      </div>
      <Group1 />
    </div>
  );
}

export default function Component13() {
  return (
    <div className="relative size-full" data-name="홈-디지털월렛">
      <Quick1 />
      <Header />
      <ContentsFooter />
    </div>
  );
}