import svgPaths from "./svg-oxjwg5mas1";
import img1 from "../assets/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png";
import img2 from "../assets/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png";
import img3 from "../assets/c07375a0ac069eb65d39e36b0f1fdae69675787b.png";
import img4 from "../assets/37ac58a7f911dc76efb484419f1aff741808dcec.png";
import img20251027421571 from "../assets/17717fbf1b1d1eeefabee394f7e3735b3f13956c.png";
import { Img5, img, img6, imgRectangle157576 } from "./svg-n1neo";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import MobileAppFooter from "../components/layout/MobileAppFooter";

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="토큰 증권 거래" onBack={onNavigateBack} />;
}

function Frame2117918802() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-center text-nowrap tracking-[-0.5px]">
        <p className="leading-[24px] whitespace-pre text-[rgb(136,142,152)]">인기</p>
      </div>
    </div>
  );
}

function NpTabLineC111N9() {
  return <div className="h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_n.9" />;
}

function Frame2117918803() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.5px]">
        <p className="leading-[24px] whitespace-pre">관심</p>
      </div>
    </div>
  );
}

function NpTabLineC111N10() {
  return <div className="h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_n.9" />;
}

function Frame2117918804() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888e98] text-[16px] text-center text-nowrap tracking-[-0.5px]">
        <p className="leading-[24px] whitespace-pre font-bold text-[rgb(17,17,17)]">보유</p>
      </div>
    </div>
  );
}

function NpTabLineC111O9() {
  return <div className="bg-[#111111] h-[2px] rounded-[10px] shrink-0 w-full" data-name="np_tab_line_c111_o.9" />;
}

function Component() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">라일락 - IU</p>
      <Component />
    </div>
  );
}

function Ci() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
      <div className="relative shrink-0 size-[36px]" data-name="Mask group">
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 1" style={{ maskImage: `url('${img}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
        </div>
      </div>
      <Component6 />
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

function TrListModule({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full cursor-pointer" 
      data-name="tr_list_module"
      onClick={onClick}
      data-interactive="true"
    >
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
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 2" style={{ maskImage: `url('${img}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
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

function Component12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component13() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">Bungee - 백현</p>
      <Component12 />
    </div>
  );
}

function Ci2() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
      <div className="relative shrink-0 size-[36px]" data-name="Mask group">
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 1" style={{ maskImage: `url('${img}')` }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img1} />
            <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img3} />
          </div>
        </div>
      </div>
      <Component13 />
    </div>
  );
}

function LeftInfo2() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
      <Ci2 />
    </div>
  );
}

function ListContents2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
      <LeftInfo2 />
      <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
        <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2d78fa] text-[16px] text-right w-[min-content] font-bold">10 ST</p>
        <div className="bg-[#f3f9fe] box-border content-stretch flex gap-[8px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d78fa] text-[12px] text-nowrap text-right">
            <p className="leading-[18px] whitespace-pre">-0.35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrListModule2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
      <ListContents2 />
    </div>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="종목부가정보">
      <p className="[white-space-collapse:collapse] basis-0 font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#888e98] text-[12px] text-nowrap">평가액 750,000원</p>
    </div>
  );
}

function Component15() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="종목명&부가정보">
      <p className="[white-space-collapse:collapse] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333950] text-[16px] text-nowrap w-full">얼음과 불의 노래 - 온리원오브</p>
      <Component14 />
    </div>
  );
}

function Ci3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="CI&종목정보">
      <div className="relative shrink-0 size-[36px]" data-name="Mask group">
        <div className="absolute aspect-[36/36] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[36px_36px] right-0 top-0" data-name="image 2" style={{ maskImage: `url('${img}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img4} />
        </div>
      </div>
      <Component15 />
    </div>
  );
}

function LeftInfo3() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left info">
      <Ci3 />
    </div>
  );
}

function ListContents3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="list_contents">
      <LeftInfo3 />
      <div className="content-stretch flex flex-col items-end relative shrink-0 w-[80px]" data-name="현재가&등락률_두줄">
        <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#fa2d42] text-[16px] text-right w-[min-content] font-bold">5 ST</p>
        <div className="bg-[#fcf4f4] box-border content-stretch flex gap-[10px] items-center justify-end px-[4px] py-px relative rounded-[4px] shrink-0" data-name="tradingflag_h20">
          <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[12px] text-nowrap text-right">
            <p className="leading-[18px] whitespace-pre">+10.31%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrListModule3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start justify-center max-w-[320px] overflow-clip px-0 py-[12px] relative shrink-0 w-full" data-name="tr_list_module">
      <ListContents3 />
    </div>
  );
}

function List({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[20px] py-0 relative shrink-0 w-[360px]" data-name="list">
      <TrListModule onClick={onSelectFirst} />
      <TrListModule1 />
      <TrListModule2 />
      <TrListModule3 />
    </div>
  );
}

function Frame2117921332({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <List onSelectFirst={onSelectFirst} />
    </div>
  );
}

function Frame2117918841({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip pl-[20px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="Tab_line">
        <div className="absolute bottom-0 flex h-px items-center justify-center left-0 w-[360px]">
          <div className="flex-none scale-y-[-100%]">
            <div className="bg-[#eeeeee] h-px w-[360px]" data-name="line" />
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
          <Frame2117918802 />
          <NpTabLineC111N9 />
        </div>
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
          <Frame2117918803 />
          <NpTabLineC111N10 />
        </div>
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0" data-name="linetab_unit">
          <Frame2117918804 />
          <NpTabLineC111O9 />
        </div>
      </div>
      <Frame2117921332 onSelectFirst={onSelectFirst} />
    </div>
  );
}

function Frame2117921143({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame2117918841 onSelectFirst={onSelectFirst} />
    </div>
  );
}

function Component16({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip pb-0 pt-[16px] px-0 relative shrink-0 w-[360px]" data-name="실시간순위_거래대금">
      <Frame2117921143 onSelectFirst={onSelectFirst} />
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function Frame2117918996() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#111111] text-[18px] text-nowrap tracking-[-0.5px] whitespace-pre">메뉴 바로가기</p>
    </div>
  );
}

function Frame2117919114() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[320px]">
      <Frame2117918996 />
      <div className="h-[150px] relative shrink-0 w-[320px]" data-name="스크린샷, 2025-10-27 오후 4.21.57 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[520.19%] left-[-6.56%] max-w-none top-[-182.09%] w-[112.5%]" src={img20251027421571} />
        </div>
      </div>
      <div className="absolute bg-[#f3f2f8] h-[20px] left-[17px] top-[78px] w-[68px]" />
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] left-[50.5px] not-italic text-[#333950] text-[13px] text-center text-nowrap top-[85px] tracking-[-0.65px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[18px] whitespace-pre">SOL 디지털 월렛</p>
      </div>
    </div>
  );
}

function Frame2117918999() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame2117919114 />
    </div>
  );
}

function Component8() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-center px-0 py-[32px] relative shrink-0 w-[360px]" data-name="8">
      <Frame2117918999 />
    </div>
  );
}

function Frame2117919025() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <div className="h-[10px] relative shrink-0 w-[360px]" data-name="divider">
        <div className="absolute bg-[#f6f6f9] inset-0" data-name="np_00com_dv_360x10_sld.9" />
      </div>
    </div>
  );
}

function AllContents({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="all_contents">
      <Component16 onSelectFirst={onSelectFirst} />
      <Component8 />
      <Frame2117919025 />
    </div>
  );
}

function Component02() {
  return (
    <div className="absolute h-[26.667px] left-[calc(100%-16px)] top-[15.33px] translate-x-[-50%] translate-y-[-50%] w-[24px]" data-name="02">
      <div className="size-full">
        <Img5 />
      </div>
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
    <div className="absolute inset-[16.667%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px] mask-size-[24px_24px]" style={{ maskImage: `url('${img6}')` }}>
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
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_6_4299)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_6_4299" x1="0" x2="45.3146" y1="0" y2="1.22123">
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

function Quickmenu() {
  return (
    <div className="bg-white h-[52px] relative shrink-0 w-[360px]" data-name="quickmenu">
      <Inner />
    </div>
  );
}

function Frame1707480888() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0">
      <Quickmenu />
    </div>
  );
}

function Quick() {
  return (
    <div className="bg-[#f6f6f9] h-[52px] relative shrink-0 w-full" data-name="+ QUICK">
      <Frame1707480888 />
    </div>
  );
}

function Quick1() {
  return (
    <div className="bg-[#f6f6f9] box-border content-stretch flex flex-col h-[235px] items-start pb-0 pt-[20px] px-0 relative shrink-0 w-[360px]" data-name="+Quick_주식">
      <Frame2117921334 />
      <Quick />
    </div>
  );
}

function ContentsFooter({ onSelectFirst }: { onSelectFirst?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="contents+footer">
      <AllContents onSelectFirst={onSelectFirst} />
    </div>
  );
}

interface TokenSecuritiesMainProps {
  onSelectFirst?: () => void;
  onNavigateBack?: () => void;
  onOpenMenu?: () => void;
}

export default function TokenSecuritiesMain({ onSelectFirst, onNavigateBack, onOpenMenu }: TokenSecuritiesMainProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full pb-[72px]" data-name="10.음악저작권토큰증권">
      <Header onNavigateBack={onNavigateBack} />
      <ContentsFooter onSelectFirst={onSelectFirst} />
      <MobileAppFooter activeTab="balance" onOpenMenu={onOpenMenu} />
    </div>
  );
}