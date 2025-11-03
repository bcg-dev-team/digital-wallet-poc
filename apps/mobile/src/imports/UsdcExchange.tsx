import svgPaths from "./svg-1smkh0pnj5";
import { img } from "./svg-ojjt5";
import { Button } from "@digital-wallet/ui";

function Group820325() {
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
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[27.835px] justify-center ml-[40px] mt-[30.155px] not-italic relative text-[#111111] text-[16px] translate-y-[-50%] w-[112px]">
        <p className="leading-[24px]">USDC 입금</p>
      </div>
      <Group820325 />
    </div>
  );
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
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">환율 정보</p>
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
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[26px] text-center text-nowrap tracking-[-0.13px]">
        <p className="leading-[32px] whitespace-pre">1,350.00원</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Frame2117921420() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame2117921337 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">마지막 업데이트: 11:00</p>
      </div>
    </div>
  );
}

function Frame2117921335() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921338 />
      <Frame2117921420 />
    </div>
  );
}

function Frame2117921336() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">(한국은행 매매기준율)</p>
      </div>
    </div>
  );
}

function Frame2117921419() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame2117921335 />
      <Frame2117921336 />
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

function Frame2117921422() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame2117921419 />
      <Frame2117921371 />
    </div>
  );
}

function Frame2117921389() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center p-[2px] relative rounded-[4px] shadow-[0px_0px_3px_0px_rgba(17,17,17,0.18)] shrink-0 w-[47px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333950] text-[11px] text-center w-[43px]">
        <p className="leading-[16px]">직접입력</p>
      </div>
    </div>
  );
}

function Frame2117921388() {
  return (
    <div className="bg-[#e7eaef] box-border content-stretch flex gap-[4px] h-[28px] items-center p-[4px] relative rounded-[6px] shrink-0 w-[106px]">
      <Frame2117921389 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center w-[47px]">
        <p className="leading-[16px]">최대한도</p>
      </div>
    </div>
  );
}

function Frame2117921340() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[321px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">금액 입력</p>
      <Frame2117921388 />
    </div>
  );
}

function Np00ComInputLineN9() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[320px]" data-name="np_00com_input_line_n.9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 40">
        <g id="np_00com_input_line_n.9">
          <path d="M0 0H320V40H0V0Z" fill="var(--fill-0, white)" id="Rectangle 155810" />
          <path d="M0 40H320V38H0V40Z" fill="var(--fill-0, #F4F4F4)" id="np_00com_input_line_n.9_2" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute inset-[10%_10%_9.97%_10%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-2.001px] mask-size-[20px_20px]" data-name="icon" style={{ maskImage: `url('${img}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <ellipse cx="8" cy="8.0023" fill="var(--fill-0, #CCCFD3)" id="Ellipse 857" rx="8" ry="8.0023" />
          <g id="Group 818705">
            <path d="M5.5 5.50158L10.5 10.503" id="Vector 600" stroke="var(--stroke-0, white)" strokeLinecap="round" />
            <path d="M10.5 5.50158L5.5 10.503" id="Vector 601" stroke="var(--stroke-0, white)" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2117921392() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap text-right tracking-[-0.07px]">
        <p className="leading-[24px] whitespace-pre">USDC</p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="ico_input_del">
        <Icon />
      </div>
    </div>
  );
}

function Frame2117921390() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[320px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap text-right">
        <p className="leading-[24px] whitespace-pre">1,000</p>
      </div>
      <Frame2117921392 />
    </div>
  );
}

function Frame2117921391() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-start ml-0 mt-0 px-0 py-[8px] relative w-[320px]">
      <Np00ComInputLineN9 />
      <Frame2117921390 />
    </div>
  );
}

function Group823159() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative">
      <Frame2117921391 />
    </div>
  );
}

function Group824693() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <Group823159 />
    </div>
  );
}

function Input() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="input">
      <Group824693 />
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center ml-0 mt-[56px] not-italic relative text-[#aaaeb3] text-[11px] text-nowrap translate-y-[-50%]">
        <p className="leading-[16px] whitespace-pre">최대 한도 76,520 USDC</p>
      </div>
    </div>
  );
}

function Np00ComInputLineN10() {
  return (
    <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[320px]" data-name="np_00com_input_line_n.9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 40">
        <g id="np_00com_input_line_n.9">
          <path d="M0 0H320V40H0V0Z" fill="var(--fill-0, white)" id="Rectangle 155810" />
          <path d="M0 40H320V38H0V40Z" fill="var(--fill-0, #F4F4F4)" id="np_00com_input_line_n.9_2" />
        </g>
      </svg>
    </div>
  );
}

function Group823160() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center ml-[74px] mt-[12px] not-italic relative text-[#111111] text-[16px] text-nowrap text-right translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[24px] whitespace-pre">1,350,000</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute inset-[10%_10%_9.97%_10%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2px_-2.001px] mask-size-[20px_20px]" data-name="icon" style={{ maskImage: `url('${img}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <ellipse cx="8" cy="8.0023" fill="var(--fill-0, #CCCFD3)" id="Ellipse 857" rx="8" ry="8.0023" />
          <g id="Group 818705">
            <path d="M5.5 5.50158L10.5 10.503" id="Vector 600" stroke="var(--stroke-0, white)" strokeLinecap="round" />
            <path d="M10.5 5.50158L5.5 10.503" id="Vector 601" stroke="var(--stroke-0, white)" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2117921418() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap text-right">
        <p className="leading-[24px] whitespace-pre">DT</p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="ico_input_del">
        <Icon1 />
      </div>
    </div>
  );
}

function Frame2117921415() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex items-center justify-between ml-[0.5px] mt-[8px] relative w-[319.5px]">
      <Group823160 />
      <Frame2117921418 />
    </div>
  );
}

function Group824694() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Np00ComInputLineN10 />
      <Frame2117921415 />
    </div>
  );
}

function Frame2117921417() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start leading-[0] ml-0 mt-0 relative w-[320px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#999ea4] text-[11px] w-[min-content]">
        <p className="leading-[16px]">예상 수령액</p>
      </div>
      <Group824694 />
    </div>
  );
}

function Input1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="input">
      <Frame2117921417 />
    </div>
  );
}

function Frame2117921414() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0">
      <Input />
      <Input1 />
    </div>
  );
}

function Frame2117921383() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <Frame2117921340 />
      <Frame2117921414 />
    </div>
  );
}

function Frame2117921394() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
      <Frame2117921383 />
    </div>
  );
}

function Frame2117921416() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame2117921394 />
    </div>
  );
}

function Frame2117921421() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame2117921422 />
      <Frame2117921416 />
    </div>
  );
}

function Frame830609() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[20px] relative w-full">
          <div className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#111111] text-[20px] text-nowrap tracking-[-0.5px] whitespace-pre">
            <p className="mb-0">환전할 금액을</p>
            <p>입력해주세요</p>
          </div>
          <Frame2117921421 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921386() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame830609 />
    </div>
  );
}

function Frame2117921381() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header />
      <Frame2117921386 />
    </div>
  );
}

function Frame2117921423() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-0 top-0 w-[360px]">
      <Frame2117921381 />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
    </div>
  );
}

function Frame2117921431() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">환전 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">1,000 USDC</p>
    </div>
  );
}

function Text() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921431 />
    </div>
  );
}

function Frame2117921432() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">적용 환율</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,350.00원/USD</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921432 />
    </div>
  );
}

function Frame2117921435() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">예상 수령</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,350,000 DT</p>
    </div>
  );
}

function Frame2117921436() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Text />
      <Text1 />
      <Frame2117921435 />
    </div>
  );
}

function Frame2117921433() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">브릿지 수수료</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,350 DT(0.1%)</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921433 />
    </div>
  );
}

function Frame2117921434() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="leading-[20px] relative shrink-0 text-[#777e8c] text-[13px]">최종 수령액</p>
      <p className="leading-[20px] relative shrink-0 text-[#2a3fec] text-[14px] text-right">1.348,650 DT(=1,348,650원)</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921434 />
    </div>
  );
}

function Frame2117921439() {
  return (
    <div className="content-stretch flex gap-[206px] items-center justify-end relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">※ 예상 소요시간: 3-5분</p>
    </div>
  );
}

function Frame2117921438() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Text3 />
      <Frame2117921439 />
    </div>
  );
}

function Frame2117921437() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[16px] items-start ml-0 mt-0 relative w-[320px]">
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921436 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Text2 />
      <Frame2117921438 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame2117921437 />
    </div>
  );
}

function Frame2117921424() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[20px] top-[578px] w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">환전 요약</p>
      <List />
    </div>
  );
}

function Btn() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pb-[20px] px-[20px] bg-gradient-to-t from-white via-white to-transparent pt-[24px]">
      <div className="flex gap-[8px] w-full">
        <Button 
          variant="secondary" 
          size="lg"
          className="flex-1"
        >
          취소
        </Button>
        <Button 
          variant="primary" 
          size="lg"
          className="flex-1"
        >
          환전하기
        </Button>
      </div>
    </div>
  );
}

export default function Component08UsdcDt() {
  return (
    <div className="bg-white relative w-full min-h-screen" data-name="08.USDC->DT환전">
      <Frame2117921423 />
      <Frame2117921424 />
      <Btn />
    </div>
  );
}