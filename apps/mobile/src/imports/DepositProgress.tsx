import svgPaths from "./svg-t342ueqplb";
import { img, img1 } from "./svg-ojjt5";
import { Button } from "@digital-wallet/ui";
import { useNavigate } from "react-router-dom";
import { AVAILABLE_USDC_AMOUNT, formatNumber } from "../constants/wallet";
import { useDeposit } from "../contexts/DepositContext";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="USDC 입금" onBack={onNavigateBack} />;
}

function Frame2117921381({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[360px]">
      <Header onNavigateBack={onNavigateBack} />
    </div>
  );
}

function Btn({ onNavigateNext }: { onNavigateNext?: () => void }) {
  return (
    <MobileStickyFooter className="z-10">
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={onNavigateNext}
      >
        다음
      </Button>
    </MobileStickyFooter>
  );
}

function Icon() {
  return (
    <div className="absolute inset-[9.38%_6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_-6px] mask-size-[64px_64px]" data-name="icon" style={{ maskImage: `url('${img}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 52">
        <g id="icon">
          <path d={svgPaths.p177e2b00} fill="var(--fill-0, #F1F2FF)" id="Exclude" />
          <path d={svgPaths.p241a2000} fill="var(--fill-0, #B8CCFF)" id="Vector 685" />
          <path d={svgPaths.p1e44cf00} fill="var(--fill-0, #2A3FEC)" id="Rectangle 155090" />
          <path d={svgPaths.p1e118200} fill="var(--fill-0, #2A3FEC)" id="Rectangle 155093" />
          <path d={svgPaths.p453ce00} fill="var(--fill-0, #B8CCFF)" id="Rectangle 155878" />
          <path d={svgPaths.p163d7f00} fill="var(--fill-0, white)" id="Rectangle 155877" />
        </g>
      </svg>
    </div>
  );
}

function Frame2117921400() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-[#111111] text-[20px] tracking-[-0.1px] w-full">
        입금을 처리하고 있어요
      </p>
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#999ea4] text-[14px] w-full">블록체인에서 트랜잭션을 확인하고 있어요</p>
    </div>
  );
}

function Frame2117921401() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-[242px]">
      <div className="relative shrink-0 size-[64px]" data-name="ic_08ac_64_loading">
        <Icon />
      </div>
      <Frame2117921400 />
    </div>
  );
}

function Frame2117921396() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start ml-[30px] mt-0 not-italic relative w-[143px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#333950] text-[14px] w-full">
        MetaMask 승인 완료
      </p>
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#999ea4] text-[12px] w-full">2025.10.23 14:23:51</p>
    </div>
  );
}

function Group79() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[20px_20px]" style={{ maskImage: `url('${img1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 79">
          <rect fill="var(--fill-0, #2A3FEC)" height="20" id="Rectangle 153538" rx="10" width="20" />
          <path d={svgPaths.p34cba900} id="Vector 5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group823352() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[20px_20px]" style={{ maskImage: `url('${img1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 823352">
          <circle cx="10" cy="10" fill="var(--fill-0, #2A3FEC)" id="Ellipse 977" r="10" />
          <path d={svgPaths.p2b76b080} id="Vector 5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group80() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[20px_20px]" style={{ maskImage: `url('${img1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 79">
          <rect fill="var(--fill-0, #2A3FEC)" height="20" id="Rectangle 153538" rx="10" width="20" />
          <path d={svgPaths.p34cba900} id="Vector 5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group823353() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[20px_20px]" style={{ maskImage: `url('${img1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 823352">
          <circle cx="10" cy="10" fill="var(--fill-0, #2A3FEC)" id="Ellipse 977" r="10" />
          <path d={svgPaths.p2b76b080} id="Vector 5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Process() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="process">
      <div className="[grid-area:1_/_1] ml-0 mt-[78px] relative size-[20px]" data-name="ic_00com_20_sld_number_2">
        <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-0 justify-center leading-[0] not-italic text-[13px] text-center text-white">
          <p className="leading-[20px]">2</p>
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-0 mt-[146px] relative size-[20px]" data-name="ic_00com_20_sld_number_3">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, #CCCFD3)" id="Ellipse 912" r="10" />
          </svg>
        </div>
        <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-0 justify-center leading-[0] not-italic text-[13px] text-center text-white">
          <p className="leading-[20px]">3</p>
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-0 mt-[214px] relative size-[20px]" data-name="ic_00com_20_sld_number_3">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, #CCCFD3)" id="Ellipse 912" r="10" />
          </svg>
        </div>
        <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-0 justify-center leading-[0] not-italic text-[13px] text-center text-white">
          <p className="leading-[20px]">4</p>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[48px] items-center justify-center ml-[10px] mt-[30px] relative w-px">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#2a3fec] h-[48px] w-px" data-name="line" />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[48px] items-center justify-center ml-[10px] mt-[98px] relative w-px">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#dddddd] h-[48px] w-px" data-name="line" />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[48px] items-center justify-center ml-[10px] mt-[166px] relative w-px">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#dddddd] h-[48px] w-px" data-name="line" />
        </div>
      </div>
      <Frame2117921396 />
      <div className="[grid-area:1_/_1] ml-0 mt-[10px] relative size-[20px]" data-name="ic_00com_20_sld_check_circle">
        <div className="absolute inset-0" data-name="btn_check_r_o">
          <Group79 />
          <Group823352 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-0 mt-[78px] relative size-[20px]" data-name="ic_00com_20_sld_check_circle">
        <div className="absolute inset-0" data-name="btn_check_r_o">
          <Group80 />
          <Group823353 />
        </div>
      </div>
    </div>
  );
}

function Frame2117918851() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Process />
    </div>
  );
}

function Frame2117921398() {
  return (
    <div className="absolute content-stretch flex flex-col h-[42px] items-start left-[54px] not-italic top-[170px] w-[143px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#333950] text-[14px] w-full">
        입금 확인 및 반영
      </p>
      <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px relative shrink-0 text-[#999ea4] text-[12px] w-full">대기중</p>
    </div>
  );
}

function Frame2117921397() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[54px] not-italic top-[102px] w-[143px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#333950] text-[14px] w-full">
        블록체인 컨펌 대기중
      </p>
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#2a3fec] text-[12px] w-full">예상 시간: 2-5분</p>
    </div>
  );
}

function Frame2117921399() {
  return (
    <div className="absolute content-stretch flex flex-col h-[42px] items-start left-[54px] not-italic top-[238px] w-[143px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#aaaeb3] text-[14px] w-full">환전 가능</p>
      <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px relative shrink-0 text-[#999ea4] text-[12px] w-full">대기중</p>
    </div>
  );
}

function Frame2117921402() {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col items-end px-[24px] py-[32px] relative w-full">
          <Frame2117918851 />
          <Frame2117921398 />
          <Frame2117921397 />
          <Frame2117921399 />
        </div>
      </div>
    </div>
  );
}

function CheckSmall() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check small">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check small">
          <path d={svgPaths.p679e100} fill="var(--fill-0, #333950)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2117921404() {
  const { txid, depositAmount } = useDeposit();
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] gap-[4px] items-start leading-[16px] not-italic relative shrink-0 text-[11px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#77738c]">금액</p>
      <p className="relative shrink-0 text-[#333950]">
        {depositAmount} USDC
      </p>
    </div>
  );
}

function Frame2117921405() {
  const { txid, depositAmount } = useDeposit();
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] gap-[4px] items-start leading-[16px] not-italic relative shrink-0 text-[11px] text-nowrap whitespace-pre">
      <p className="relative shrink-0 text-[#77738c]">TxHash</p>
      <p className="relative shrink-0 text-[#333950]">{txid ? `${txid.slice(0, 7)}...${txid.slice(-6)}` : 'N/A'}</p>
    </div>
  );
}

function Frame2117921406() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame2117921404 />
      <Frame2117921405 />
    </div>
  );
}

function Frame2117921384({ txid }: { txid?: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#333950] text-[12px] text-nowrap whitespace-pre">
        트랜잭션 정보
      </p>
      <Frame2117921406 />
    </div>
  );
}

function Frame2117921408() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <CheckSmall />
      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
        <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#333950] text-[12px] text-nowrap whitespace-pre">트랜잭션 정보</p>
        <Frame2117921404 />
        <Frame2117921405 />
      </div>
    </div>
  );
}

function Frame2117921407() {
  const { txid } = useDeposit();
  const navigate = useNavigate();

  const handleOpenExplorer = () => {
    if (txid) {
      // navigate(`/explorer/tx/${txid}`);
      window.open(`https://amoy.polygonscan.com/tx/${txid}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenExplorer}
      disabled={!txid}
      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div aria-hidden="true" className="absolute border border-[#2a3fec] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#2a3fec] text-[11px] text-nowrap whitespace-pre">
        탐색기에서 보기
      </p>
    </button>
  );
}

function Frame2117921371() {
  return (
    <div className="bg-neutral-50 relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Frame2117921408 />
          <Frame2117921407 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921403() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame2117921402 />
      <Frame2117921371 />
    </div>
  );
}

function Contents() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[50px] items-center left-[20px] top-[80px] w-[320px]" data-name="+ CONTENTS">
      <Frame2117921401 />
      <Frame2117921403 />
    </div>
  );
}

interface DepositProgressProps {
  onNavigateNext?: () => void;
  onNavigateBack?: () => void;
}

export default function DepositProgress({ onNavigateNext, onNavigateBack }: DepositProgressProps) {
  return (
    <div className="bg-white relative flex size-full min-h-full flex-col" data-name="06.입금진행중">
      <Frame2117921381 onNavigateBack={onNavigateBack} />
      <Btn onNavigateNext={onNavigateNext} />
      <Contents />
    </div>
  );
}