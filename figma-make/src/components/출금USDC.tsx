import svgPaths from "../imports/svg-dz0g5a5ljj";
import { img } from "../imports/svg-ltgsr";
import { useState, useEffect } from "react";
import WithdrawalCompleteBottomSheet from "./WithdrawalCompleteBottomSheet";

interface BtnMainNProps {
  onClick: () => void;
}

function BtnMainN({ onClick }: BtnMainNProps) {
  return (
    <div className="absolute bottom-0 contents left-[51.88%] right-0 top-0" data-name="btn_main_n.9" onClick={onClick}>
      <div className="absolute bg-[#2a3fec] bottom-0 left-[51.88%] right-0 rounded-[8px] top-0" data-name="btn_main_n.9" />
      <p className="absolute font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[26.92%_3.75%_26.92%_55.63%] leading-[24px] not-italic text-[16px] text-center text-white font-medium">출금신청</p>
    </div>
  );
}

function Np00ComBtnL1SubN() {
  return (
    <div className="absolute bottom-0 contents left-0 right-[51.88%] top-0" data-name="np_00com_btn_l1_sub_n.9">
      <div className="absolute bg-[#f4f6f9] bottom-0 left-0 right-[51.88%] rounded-[8px] top-0" data-name="btn_main_c_n.9" />
      <p className="absolute font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[26.92%_58.13%_26.92%_6.25%] leading-[24px] not-italic text-[#333950] text-[16px] text-center font-medium">취소</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[234px] mt-[11px] place-items-start relative" data-name="Group820325">
      <div className="[grid-area:1_/_1] ml-0 mt-0 size-[28px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0 sticky top-0" data-name="+ HEADER">
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
        <p className="leading-[24px] font-medium">USDC 출금</p>
      </div>
      <Group3 />
    </div>
  );
}

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

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre font-bold">보유 DT</p>
      </div>
      <Help />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 text-[#111111] text-center text-nowrap w-[280px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[24px] tracking-[-0.12px]">
        <p className="leading-[32px] text-nowrap whitespace-pre font-bold">1,348,850 DT</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[16px]">
        <p className="leading-[24px] text-nowrap whitespace-pre font-medium">≈1,348,850 원</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[20px] py-[16px] relative w-full">
          <Frame39 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame27 />
    </div>
  );
}

function Help1() {
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre font-bold">환율 정보</p>
      </div>
      <Help1 />
    </div>
  );
}

function Refresh() {
  return (
    <div className="relative size-[16px]" data-name="Refresh">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_10_320)" id="Refresh">
          <g id="Vector"></g>
          <path d={svgPaths.p1275ce80} fill="var(--fill-0, #999EA4)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_10_320">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[18px] text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[26px] whitespace-pre font-bold">1,350.00원</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame3 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">마지막 업데이트: 11:00</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame28 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">(한국은행 매매기준율)</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame7 />
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

function Frame9() {
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

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame32 />
      <Frame9 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame40 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[20px] relative w-full">
          <div className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#111111] text-[20px] text-nowrap tracking-[-0.5px] whitespace-pre">
            <p className="mb-0 font-bold">출금할 금액을</p>
            <p className="font-bold">입력해주세요</p>
          </div>
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header />
      <Frame />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center p-[2px] relative rounded-[4px] shadow-[0px_0px_3px_0px_rgba(17,17,17,0.18)] shrink-0 w-[47px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333950] text-[11px] text-center w-[43px]">
        <p className="leading-[16px] font-medium">직접입력</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#e7eaef] box-border content-stretch flex gap-[4px] h-[28px] items-center p-[4px] relative rounded-[6px] shrink-0 w-[106px]">
      <Frame15 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center w-[47px]">
        <p className="leading-[16px] font-medium">최대한도</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[321px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre font-bold">출금 금액(DT)</p>
      <Frame14 />
    </div>
  );
}

function Np00ComInputLineN() {
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

function Frame19() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap text-right tracking-[-0.07px]">
        <p className="leading-[24px] whitespace-pre font-medium">DT</p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="ico_input_del">
        <Icon />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[320px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap text-right tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre font-bold">0</p>
      </div>
      <Frame19 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-start ml-0 mt-0 px-0 py-[8px] relative w-[320px]">
      <Np00ComInputLineN />
      <Frame16 />
    </div>
  );
}

function Group4() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <Frame17 />
    </div>
  );
}

function Group7() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative">
      <Group4 />
    </div>
  );
}

function Input() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="input">
      <Group7 />
    </div>
  );
}

function Np00ComInputLineN1() {
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

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center ml-[10px] mt-[12px] not-italic relative text-[#111111] text-[16px] text-nowrap text-right tracking-[-0.08px] translate-x-[-100%] translate-y-[-50%]">
        <p className="leading-[24px] whitespace-pre font-bold">0</p>
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

function Frame21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap text-right tracking-[-0.07px]">
        <p className="leading-[24px] whitespace-pre font-medium">USDC</p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="ico_input_del">
        <Icon1 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex items-center justify-between ml-[0.5px] mt-[8px] relative w-[319.5px]">
      <Group5 />
      <Frame21 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Np00ComInputLineN1 />
      <Frame24 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start leading-[0] ml-0 mt-0 relative w-[320px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#999ea4] text-[11px] w-[min-content]">
        <p className="leading-[16px] font-medium">예상 수령액</p>
      </div>
      <Group8 />
    </div>
  );
}

function Input1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="input">
      <Frame26 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0">
      <Input />
      <Input1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <Frame6 />
      <Frame23 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
      <Frame12 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[20px] py-0 relative w-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[321px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre font-bold">외부 지갑 주소</p>
    </div>
  );
}

function Np00ComInputLineN2() {
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

function Frame18() {
  return <div className="content-stretch flex items-center justify-between shrink-0 w-[320px]" />;
}

function Frame22() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-start ml-0 mt-0 px-0 py-[8px] relative w-[320px]">
      <Np00ComInputLineN2 />
      <Frame18 />
    </div>
  );
}

function Group6() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <Frame22 />
    </div>
  );
}

function Group9() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative">
      <Group6 />
    </div>
  );
}

function Input2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="input">
      <Group9 />
    </div>
  );
}

function Radio() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="radio">
      <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[10px] items-start ml-0 mt-0 px-[8px] py-[10px] relative rounded-[6px] w-[156px]" data-name="radio_box_line_h40">
        <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="basis-0 flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px] text-center">
          <p className="leading-[20px] font-medium">QR코드 스캔</p>
        </div>
      </div>
      <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[10px] items-start ml-[164px] mt-0 px-[8px] py-[10px] relative rounded-[6px] w-[156px]" data-name="radio_box_line_h40">
        <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="basis-0 flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px] text-center">
          <p className="leading-[20px] font-medium">최근 주소</p>
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full">
      <Input2 />
      <Radio />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">※ 반드시 Polygon 네트워크 주소를 입력해주세요</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-center px-[20px] py-0 relative shrink-0">
      <Frame8 />
      <Frame42 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame11 />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
      <Frame25 />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
      <Frame13 />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px] font-medium">출금 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre font-medium">1,350,000 DT</p>
    </div>
  );
}

function Text() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] font-medium">적용 환율</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right font-medium">1,350.00원/USD</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame34 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] font-medium">예상 수령</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right font-medium">1,000 USDC</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Text />
      <Text1 />
      <Frame36 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] font-medium">브릿지 수수료</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right font-medium">1,350 DT(0.1%)</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame35 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[16px] items-start ml-0 mt-0 relative w-[320px]">
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame37 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Text2 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame38 />
    </div>
  );
}

function Group1() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <g id="Group">
        <g id="Vector"></g>
        <path d={svgPaths.p2435f600} fill="var(--fill-0, #FA2D42)" id="Vector_2" />
      </g>
    </svg>
  );
}

function InfoOutline1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Info outline">
      <Group1 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <InfoOutline1 />
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#fa2d42] text-[11px] text-nowrap whitespace-pre font-medium">주의사항</p>
    </div>
  );
}

function Group2() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <g id="Group">
        <g id="Vector"></g>
        <path d={svgPaths.p2435f600} fill="var(--fill-0, #FA2D42)" id="Vector_2" />
      </g>
    </svg>
  );
}

function InfoOutline2() {
  return (
    <div className="opacity-0 overflow-clip relative shrink-0 size-[14px]" data-name="Info outline">
      <Group2 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <InfoOutline2 />
      <ul className="[white-space-collapse:collapse] block font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#fa2d42] text-[11px] text-nowrap">
        <li className="mb-0 ms-[16.5px]">
          <span className="leading-[16px]">출금 후에는 취소가 불가능해요</span>
        </li>
        <li className="ms-[16.5px]">
          <span className="leading-[16px]">주소 확인은 필수에요. 오입력 시 복구가 불가능해요</span>
        </li>
      </ul>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <Frame43 />
      <Frame44 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#ffe8e8] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center px-[10px] py-[12px] relative w-full">
          <Frame45 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[20px] items-start pb-0 pt-[40px] px-0 relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre font-bold">출금 정보</p>
      <List />
      <Frame10 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[360px] pb-[120px]">
      <Frame30 />
      <Frame31 />
    </div>
  );
}

interface BoxbtnProps {
  onWithdrawal: () => void;
}

function Boxbtn({ onWithdrawal }: BoxbtnProps) {
  return (
    <div className="absolute inset-[21.74%_5.56%]" data-name="boxbtn">
      <BtnMainN onClick={onWithdrawal} />
      <Np00ComBtnL1SubN />
    </div>
  );
}

interface Box2BtnSldH52Default2A3FecFloatingProps {
  onWithdrawal: () => void;
}

function Box2BtnSldH52Default2A3FecFloating({ onWithdrawal }: Box2BtnSldH52Default2A3FecFloatingProps) {
  return (
    <div className="fixed bottom-0 h-[92px] left-0 w-[360px] z-50" data-name="box2btn_sld_h52_default_2A3FEC_floating">
      <div className="absolute bottom-0 left-0 right-0 top-[26.09%]" data-name="Rectangle154436">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 68">
          <path d="M0 0H360V68H0V0Z" fill="var(--fill-0, white)" id="Rectangle154436" />
        </svg>
      </div>
      <div className="absolute bottom-[73.91%] left-0 right-0 top-0" data-name="Rectangle154438">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 24">
          <path d="M0 0H360V24H0V0Z" fill="url(#paint0_linear_3_8184)" id="Rectangle 154438" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_8184" x1="180" x2="180" y1="2.5" y2="24">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Boxbtn onWithdrawal={onWithdrawal} />
    </div>
  );
}

interface BtnProps {
  onWithdrawal: () => void;
}

function Btn({ onWithdrawal }: BtnProps) {
  return (
    <div className="absolute bottom-0 contents left-0" data-name="+ BTN">
      <Box2BtnSldH52Default2A3FecFloating onWithdrawal={onWithdrawal} />
    </div>
  );
}

interface ComponentProps {
  onNavigateToHistory?: () => void;
}

export default function Component({ onNavigateToHistory }: ComponentProps = {}) {
  const [isWithdrawalComplete, setIsWithdrawalComplete] = useState(false);

  const handleWithdrawal = () => {
    // 출금 로직 구현
    setIsWithdrawalComplete(true);
  };

  const handleNavigate = () => {
    if (onNavigateToHistory) {
      onNavigateToHistory();
    }
  };

  return (
    <div className="bg-white relative size-full" data-name="12.출금">
      <Btn onWithdrawal={handleWithdrawal} />
      <Frame41 />
      <WithdrawalCompleteBottomSheet 
        isOpen={isWithdrawalComplete} 
        onClose={() => setIsWithdrawalComplete(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}