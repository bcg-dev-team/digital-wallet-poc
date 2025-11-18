import MobilePageHeader from "../components/ui/MobilePageHeader";
import MobileAppFooter from "../components/layout/MobileAppFooter";

function Group820325() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[234px] mt-[11px] place-items-start relative" data-name="Group820325">
      <div className="[grid-area:1_/_1] ml-0 mt-0 size-[28px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="디지털 자산 거래 내역" onBack={onNavigateBack} />;
}

function Frame2117921381({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header onNavigateBack={onNavigateBack} />
    </div>
  );
}

function Frame2117921423({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-0 top-0 w-[360px]">
      <Frame2117921381 onNavigateBack={onNavigateBack} />
    </div>
  );
}

function Frame2117919085() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">총 거래</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px] font-bold">47건</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat9() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame2117919085 />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="scroll">
      <NpIndexCardFlat9 />
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

function Frame2117919086() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">수익</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px] font-bold">156,800원</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat10() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame2117919086 />
        </div>
      </div>
    </div>
  );
}

function Frame2117919087() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[#77738c] text-[12px] w-full">
        <p className="leading-[18px]">배당</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#333950] text-[14px] w-full">
        <p className="leading-[20px] font-bold">32,250원</p>
      </div>
    </div>
  );
}

function NpIndexCardFlat11() {
  return (
    <div className="basis-0 bg-[#f4f6f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="np_index_card_flat.9">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
          <Frame2117919087 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921478() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <IndexArea />
      <NpIndexCardFlat10 />
      <NpIndexCardFlat11 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="container">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-[20px] py-0 relative w-full">
          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-center text-nowrap whitespace-pre font-bold">당월 거래 요약</p>
          <Frame2117921478 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921479() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Container />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
    </div>
  );
}

function Frame2117921476() {
  return (
    <div className="bg-[#ecf5ec] box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[2px] relative rounded-[4px] shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#169246] text-[11px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">완료</p>
      </div>
    </div>
  );
}

function Frame2117921473() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap whitespace-pre font-bold">환전 | USDC → DT</p>
      <Frame2117921476 />
    </div>
  );
}

function Frame2117921431() {
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
      <Frame2117921431 />
    </div>
  );
}

function Frame2117921432() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">환전 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,000 USDC</p>
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

function Frame2117921434() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">환전 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,348,650 DT</p>
    </div>
  );
}

function Frame2117921435() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] items-start justify-between leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0">TxHash</p>
      <p className="relative shrink-0">0xab123...def456</p>
    </div>
  );
}

function Frame2117921433() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">14:23 완료</p>
    </div>
  );
}

function Frame2117921474() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2117921435 />
      <Frame2117921433 />
    </div>
  );
}

function Frame2117921436() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text />
      <Text1 />
      <Frame2117921434 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921474 />
    </div>
  );
}

function Frame2117921437() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame2117921473 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921436 />
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

function Frame2117921480() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] items-center justify-between not-italic relative shrink-0 text-nowrap w-full whitespace-pre">
      <p className="leading-[20px] relative shrink-0 text-[#333950] text-[14px] font-bold">매수 | 라일락(LILAC)-IU</p>
      <p className="leading-[24px] relative shrink-0 text-[#2d78fa] text-[16px] text-right tracking-[-0.08px] font-bold">-150,150 원</p>
    </div>
  );
}

function Frame2117921438() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">수량</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">10 ST</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921438 />
    </div>
  );
}

function Frame2117921439() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">15,000 원</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921439 />
    </div>
  );
}

function Frame2117921440() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] items-start justify-between leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0">예상 연배당</p>
      <p className="relative shrink-0">12,750 원</p>
    </div>
  );
}

function Frame2117921441() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">14:23 완료</p>
    </div>
  );
}

function Frame2117921481() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2117921440 />
      <Frame2117921441 />
    </div>
  );
}

function Frame2117921442() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text2 />
      <Text3 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921481 />
    </div>
  );
}

function Frame2117921443() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame2117921480 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921442 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame2117921443 />
    </div>
  );
}

function Frame2117921424() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#77738c] text-[14px] text-nowrap whitespace-pre">2025.10.23</p>
      <List />
      <List1 />
    </div>
  );
}

function Frame2117921482() {
  return (
    <div className="bg-[#fcf4f4] box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[2px] relative rounded-[4px] shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ff7a00] text-[11px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">처리중</p>
      </div>
    </div>
  );
}

function Frame2117921483() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#333950] text-[14px] text-nowrap whitespace-pre font-bold">출금 | DT → USDC</p>
      <Frame2117921482 />
    </div>
  );
}

function Frame2117921444() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">환율</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">1,350.00 원</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921444 />
    </div>
  );
}

function Frame2117921445() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">출금 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,350,000 DT</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921445 />
    </div>
  );
}

function Frame2117921446() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">예상 수령액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">1,000 USDC</p>
    </div>
  );
}

function Frame2117921447() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] items-start justify-between leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0">TxHash</p>
      <p className="relative shrink-0">0xab123...def456</p>
    </div>
  );
}

function Frame2117921448() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">2025.10.22 10:15 처리중</p>
    </div>
  );
}

function Frame2117921484() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2117921447 />
      <Frame2117921448 />
    </div>
  );
}

function Frame2117921449() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text4 />
      <Text5 />
      <Frame2117921446 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921484 />
    </div>
  );
}

function Frame2117921450() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame2117921483 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921449 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame2117921450 />
    </div>
  );
}

function Frame2117921485() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] items-center justify-between not-italic relative shrink-0 text-nowrap w-full whitespace-pre">
      <p className="leading-[20px] relative shrink-0 text-[#333950] text-[14px] font-bold">배당금 | 라일락(LILAC)-IU</p>
      <p className="leading-[24px] relative shrink-0 text-[#fa2d42] text-[16px] text-right tracking-[-0.08px] font-bold">16,000 원</p>
    </div>
  );
}

function Frame2117921451() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">수량</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">50 ST</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921451 />
    </div>
  );
}

function Frame2117921452() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">320 원</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921452 />
    </div>
  );
}

function Frame2117921453() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">2025.10.22 09:30 완료</p>
    </div>
  );
}

function Frame2117921486() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2117921453 />
    </div>
  );
}

function Frame2117921454() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text6 />
      <Text7 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921486 />
    </div>
  );
}

function Frame2117921455() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame2117921485 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921454 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame2117921455 />
    </div>
  );
}

function Frame2117921487() {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] items-center justify-between not-italic relative shrink-0 text-nowrap w-full whitespace-pre">
      <p className="leading-[20px] relative shrink-0 text-[#333950] text-[14px] font-bold">매도 | Dynamite-BTS</p>
      <p className="leading-[24px] relative shrink-0 text-[#fa2d42] text-[16px] text-right tracking-[-0.08px] font-bold">499,800 원</p>
    </div>
  );
}

function Frame2117921456() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">수량</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">20 ST</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921456 />
    </div>
  );
}

function Frame2117921457() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">25,000 원</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921457 />
    </div>
  );
}

function Frame2117921458() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">실현수익</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">49,800 원</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame2117921458 />
    </div>
  );
}

function Frame2117921459() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#777e8c] text-[11px] text-nowrap whitespace-pre">2025.10.22 14:23 완료</p>
    </div>
  );
}

function Frame2117921488() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2117921459 />
    </div>
  );
}

function Frame2117921460() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text8 />
      <Text9 />
      <Text10 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921488 />
    </div>
  );
}

function Frame2117921461() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-start ml-0 mt-0 relative w-[320px]">
      <Frame2117921487 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame2117921460 />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame2117921461 />
    </div>
  );
}

function Frame2117921463() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#77738c] text-[14px] text-nowrap whitespace-pre">2025.10.22</p>
      <List2 />
      <List3 />
      <List4 />
    </div>
  );
}

function Frame2117921475() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
      <Frame2117921463 />
    </div>
  );
}

function Frame2117921477() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-0 top-[84px] w-[360px] pb-[72px]">
      <Frame2117921479 />
      <Frame2117921424 />
      <Frame2117921475 />
    </div>
  );
}

function Group829739() {
  return (
    <div className="absolute contents left-[8px] top-0" data-name="Group829739">
      <div className="absolute left-[8px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_87.18%_30.77%_8.97%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">홈</p>
      </div>
    </div>
  );
}

function Group830148() {
  return (
    <div className="absolute contents left-[60px] top-0" data-name="Group830148">
      <div className="absolute left-[60px] size-[52px] top-0" data-name="Rectangle157471">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_68.59%_30.77%_23.72%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">관심</p>
      </div>
    </div>
  );
}

function Group829740() {
  return (
    <div className="absolute contents left-[112px] top-0" data-name="Group829740">
      <div className="absolute left-[112px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute bottom-[30.77%] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] left-[38.46%] not-italic right-1/2 text-[#333950] text-[13px] text-center text-nowrap top-[30.77%]">
        <p className="leading-[20px] whitespace-pre">현재가</p>
      </div>
    </div>
  );
}

function Group829741() {
  return (
    <div className="absolute contents left-[164px] top-0" data-name="Group829741">
      <div className="absolute left-[164px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[30.77%_35.26%_30.77%_57.05%] justify-center leading-[0] not-italic text-[#2a3fec] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">주문</p>
      </div>
    </div>
  );
}

function Group829742() {
  return (
    <div className="absolute contents left-[216px] top-0" data-name="Group829742">
      <div className="absolute left-[216px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_18.59%_30.77%_73.72%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">잔고</p>
      </div>
    </div>
  );
}

function Group830150() {
  return (
    <div className="absolute contents left-[268px] top-0">
      <div className="absolute left-[268px] size-[52px] top-0" data-name="Rectangle157299">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <path d="M0 0H52V52H0V0Z" fill="var(--fill-0, white)" id="Rectangle157299" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[30.77%_1.92%_30.77%_90.39%] justify-center leading-[0] not-italic text-[#333950] text-[13px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">차트</p>
      </div>
    </div>
  );
}

function Frame826325() {
  return (
    <div className="absolute h-[52px] left-0 top-0 w-[312px]" data-name="Frame826325">
      <Group829739 />
      <Group830148 />
      <Group829740 />
      <Group829741 />
      <Group829742 />
      <Group830150 />
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
          <path d="M0 0H44V50H0V0Z" fill="url(#paint0_linear_11_885)" id="Rectangle" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_11_885" x1="0" x2="45.3146" y1="0" y2="1.22123">
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

// Quickmenu는 MobileAppFooter로 대체됨

interface Component13Props {
  onNavigateBack?: () => void;
  onOpenMenu?: () => void;
}

export default function Component13({ onNavigateBack, onOpenMenu }: Component13Props) {
  return (
    <div className="bg-white relative size-full pb-[72px]" data-name="13.디지털자산거래내역">
      <Frame2117921423 onNavigateBack={onNavigateBack} />
      <Frame2117921477 />
      <MobileAppFooter 
        activeTab="balance"
        onOpenMenu={onOpenMenu}
      />
    </div>
  );
}