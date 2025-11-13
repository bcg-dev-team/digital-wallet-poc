import svgPaths from "../imports/svg-t0e5ct7xxk";
import { img, imgRectangle157576 } from "../imports/svg-9558m";
import svgPathsNav from "../imports/svg-nvt1qhzfrf";
import { img as imgNav, imgRectangle157576 as imgRectangle157576Nav } from "../imports/svg-dlk75";

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">총 거래</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px]">47건</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
      <NpIndexCardFlat />
    </div>
  );
}

function IndexArea() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="index_area">
      <Scroll />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">수익</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px]">156,800원</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat1() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">배당</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px]">32,250원</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat2() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <IndexArea />
      <NpIndexCardFlat1 />
      <NpIndexCardFlat2 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="container">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-center text-nowrap whitespace-pre">당월 거래 요약</p>
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Container />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-[#ecf5ec] box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[2px] relative rounded-[4px] shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#169246] text-[11px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">완료</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap whitespace-pre">출금 | DT → USDC</p>
      <Frame42 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">환율</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">1,350.00 원</p>
    </div>
  );
}

function Text() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">출금 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,000 USDC</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame8 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">수령 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,348,650 DT</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] items-start justify-between leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0">TxHash</p>
      <p className="relative shrink-0">0xab123...def456</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">14:23 완료</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame11 />
      <Frame9 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text />
      <Text1 />
      <Frame10 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame40 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame39 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame12 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#77738c] text-[14px] text-nowrap whitespace-pre">2025.10.23</p>
      <List />
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[40px] items-center left-0 pb-[60px] pt-0 px-0 top-[84px] w-[360px]">
      <Frame45 />
      <Frame6 />
    </div>
  );
}

function Group() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[234px] mt-[11px] place-items-start relative" data-name="Group820325">
      <div className="[grid-area:1_/_1] ml-0 mt-0 size-[28px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="+ HEADER">
      <div className="[grid-area:1_/_1] h-[52px] ml-0 mt-0 relative w-[360px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 52">
          <path d="M0 0H360V52H0V0Z" fill="var(--fill-0, white)" id="bg" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[32.474px] ml-[12px] mt-[13.918px] relative w-[28px]" data-name="ic_00com_28_line_arrow_l_111">
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
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[28px] justify-center ml-[40px] mt-[30px] not-italic relative text-[#111111] text-[16px] translate-y-[-50%] w-[200px]">
        <p className="leading-[24px]">디지털 자산 거래 내역</p>
      </div>
      <Group />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[40px] items-start left-0 top-0 w-[360px]">
      <Frame4 />
    </div>
  );
}

// Bottom Navigation Components
function GroupNav1() {
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

function ComponentNav() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="1">
      <GroupNav1 />
    </div>
  );
}

function GroupNav5() {
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

function ComponentNav1() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="2">
      <GroupNav5 />
    </div>
  );
}

function GroupNav2() {
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

function ComponentNav2() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="3">
      <GroupNav2 />
    </div>
  );
}

function GroupNav3() {
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

function ComponentNav3() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="4">
      <GroupNav3 />
    </div>
  );
}

function GroupNav4() {
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

function ComponentNav4() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="5">
      <GroupNav4 />
    </div>
  );
}

function GroupNav() {
  return (
    <div className="absolute inset-[16.667%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgNav}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group 822201">
          <path d={svgPathsNav.p1560c340} fill="var(--fill-0, #777E8C)" id="Subtract" />
          <path clipRule="evenodd" d={svgPathsNav.p2fbfa000} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract_2" />
        </g>
      </svg>
    </div>
  );
}

function ComponentNav5() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-start px-[8px] py-[14px] relative shrink-0" data-name="7">
      <div className="relative shrink-0 size-[24px]" data-name="ic_00com_qm_24_sld_setting">
        <GroupNav />
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute content-stretch flex items-start left-[8px] top-0" data-name="menu">
      <ComponentNav />
      <ComponentNav1 />
      <ComponentNav2 />
      <ComponentNav3 />
      <ComponentNav4 />
      <ComponentNav5 />
    </div>
  );
}

function GroupNav6() {
  return (
    <div className="absolute contents inset-[25.7%_31.82%_53.7%_31.82%]" data-name="Group830159">
      <div className="absolute bg-white inset-[25.7%_31.82%_71.3%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-4.85px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157576" style={{ maskImage: `url('${imgRectangle157576Nav}')` }} />
      <div className="absolute bg-white inset-[34.5%_31.82%_62.5%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-9.25px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157577" style={{ maskImage: `url('${imgRectangle157576Nav}')` }} />
      <div className="absolute bg-white inset-[43.3%_31.82%_53.7%_31.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-13.65px] mask-size-[20px_20px] rounded-[15.556px]" data-name="Rectangle157578" style={{ maskImage: `url('${imgRectangle157576Nav}')` }} />
    </div>
  );
}

function Maskgroup() {
  return (
    <div className="absolute contents inset-[16%_27.27%_44%_27.27%]" data-name="Maskgroup">
      <GroupNav6 />
    </div>
  );
}

function Img00ComQmGrd50Menu() {
  return (
    <div className="absolute h-[50px] left-[316px] top-px w-[44px]" data-name="img_00com_qm_grd_50_menu">
      <div className="absolute inset-0" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 50">
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_20_1065)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_20_1065" x1="0" x2="45.3146" y1="0" y2="1.22123">
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
          <path d={svgPathsNav.p1bae7780} id="Path" stroke="var(--stroke-0, #999EA4)" strokeLinecap="round" strokeLinejoin="round" />
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

function BottomNav() {
  return (
    <div className="absolute bottom-0 left-0 content-stretch flex flex-col items-start w-full">
      <Quickmenu />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="13.디지털자산거래내역">
      <Frame5 />
      <Frame43 />
      <BottomNav />
    </div>
  );
}