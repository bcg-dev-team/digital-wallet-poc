import { useMemo, useState } from "react";
import svgPaths from "./svg-dz0g5a5ljj";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import { Button, Input, SmallButton } from "@digital-wallet/ui";
import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  formatCurrency,
  formatNumber,
  KRW_USD_EXCHANGE_RATE,
} from "../constants/wallet";
import { USDC_CONTRACT_ADDRESS, META_MSK_ADDRESS } from "./myWallet";
import { Wallet, ethers } from "ethers";
import api from "../api/api";
import { useDeposit } from "../contexts/DepositContext";
import { metaMaskWallet } from "./metaMask";
import { useMyWallet } from "../contexts/WalletContext";

const dtPerUsdc = AVAILABLE_USDC_KRW / AVAILABLE_USDC_AMOUNT;
const BRIDGE_FEE_RATE = 0.001;

type AmountMode = "manual" | "max";

const parseNumber = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
};

const formatDecimal = (value: number) =>
  new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(value);

interface UsdcWithdrawalProps {
  onNavigateBack?: () => void;
  onSubmit?: (params: { dtAmount: number; expectedUsdc: number; address: string }) => void;
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[234px] mt-[11px] place-items-start relative" data-name="Group820325">
      <div className="[grid-area:1_/_1] ml-0 mt-0 size-[28px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="USDC 출금" onBack={onNavigateBack} />;
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
        <p className="leading-[20px] whitespace-pre">보유 DT</p>
      </div>
      <Help />
    </div>
  );
}

function Frame39({ dtAmount }: { dtAmount: number }) {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 text-[#111111] text-center text-nowrap w-[280px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[24px] tracking-[-0.12px]">
        <p className="leading-[32px] text-nowrap whitespace-pre">{formatNumber(dtAmount)} DT</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center relative shrink-0 text-[16px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">≈{formatCurrency(dtAmount)}</p>
      </div>
    </div>
  );
}

function Frame27({ dtAmount }: { dtAmount: number }) {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[20px] py-[16px] relative w-full">
          <Frame39 dtAmount={dtAmount} />
        </div>
      </div>
    </div>
  );
}

function Frame1({ dtAmount }: { dtAmount: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame27 dtAmount={dtAmount} />
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
        <p className="leading-[20px] whitespace-pre">환율 정보</p>
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

function Frame3({ exchangeRate }: { exchangeRate: number }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[18px] text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[26px] whitespace-pre">{formatDecimal(exchangeRate)}원</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Frame28({ exchangeRate, lastUpdated }: { exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame3 exchangeRate={exchangeRate} />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">마지막 업데이트: {lastUpdated}</p>
      </div>
    </div>
  );
}

function Frame2({ exchangeRate, lastUpdated }: { exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame28 exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
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

function Frame32({ exchangeRate, lastUpdated }: { exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame2 exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
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

function Frame40({ exchangeRate, lastUpdated }: { exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame32 exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
      <Frame9 />
    </div>
  );
}

function Frame29({ dtAmount, exchangeRate, lastUpdated }: { dtAmount: number; exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame1 dtAmount={dtAmount} />
      <Frame40 exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
    </div>
  );
}

function Frame({ dtAmount, exchangeRate, lastUpdated }: { dtAmount: number; exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[20px] relative w-full">
          <div className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#111111] text-[20px] text-nowrap tracking-[-0.5px] whitespace-pre">
            <p className="mb-0">출금할 금액을</p>
            <p>입력해주세요</p>
          </div>
          <Frame29 dtAmount={dtAmount} exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
        </div>
      </div>
    </div>
  );
}

function Frame11({ onNavigateBack, dtAmount, exchangeRate, lastUpdated }: { onNavigateBack?: () => void; dtAmount: number; exchangeRate: number; lastUpdated: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header onNavigateBack={onNavigateBack} />
      <Frame dtAmount={dtAmount} exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
    </div>
  );
}

function Frame14({ amountMode, onModeChange }: { amountMode: AmountMode; onModeChange: (mode: AmountMode) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-[6px] bg-[#e7eaef] p-1">
      <SmallButton
        variant={amountMode === "manual" ? "primary" : "default"}
        className="px-3"
        onClick={() => onModeChange("manual")}
      >
        직접입력
      </SmallButton>
      <SmallButton
        variant={amountMode === "max" ? "primary" : "default"}
        className="px-3"
        onClick={() => onModeChange("max")}
      >
        최대한도
      </SmallButton>
    </div>
  );
}

function Frame6({ amountMode, onModeChange }: { amountMode: AmountMode; onModeChange: (mode: AmountMode) => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[321px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">출금 금액(DT)</p>
      <Frame14 amountMode={amountMode} onModeChange={onModeChange} />
    </div>
  );
}


function Frame12({ amountMode, onModeChange, value, onChange, expectedUsdc }: { amountMode: AmountMode; onModeChange: (mode: AmountMode) => void; value: string; onChange: (value: string) => void; expectedUsdc: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <Frame6 amountMode={amountMode} onModeChange={onModeChange} />
      <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 w-full">
        <Input
          value={value}
          placeholder="출금할 DT 수량을 입력하세요"
          onChange={(event) => onChange(event.target.value)}
          inputMode="numeric"
          suffix={<span className="pr-4 text-[14px] text-[#111111]">DT</span>}
        />
        <div className="space-y-2 w-full">
          <span className="text-[14px] font-medium text-[#999ea4]">예상 수령액</span>
          <Input
            value={expectedUsdc > 0 ? formatDecimal(expectedUsdc) : "0"}
            readOnly
            inputMode="numeric"
            className="text-[#333950]"
            suffix={<span className="pr-4 text-[14px] text-[#111111]">USDC</span>}
          />
        </div>
      </div>
    </div>
  );
}

function Frame20({ amountMode, onModeChange, value, onChange, expectedUsdc }: { amountMode: AmountMode; onModeChange: (mode: AmountMode) => void; value: string; onChange: (value: string) => void; expectedUsdc: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
      <Frame12 amountMode={amountMode} onModeChange={onModeChange} value={value} onChange={onChange} expectedUsdc={expectedUsdc} />
    </div>
  );
}

function Frame25({ amountMode, onModeChange, value, onChange, expectedUsdc }: { amountMode: AmountMode; onModeChange: (mode: AmountMode) => void; value: string; onChange: (value: string) => void; expectedUsdc: number }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[20px] py-0 relative w-full">
          <Frame20 amountMode={amountMode} onModeChange={onModeChange} value={value} onChange={onChange} expectedUsdc={expectedUsdc} />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[321px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">외부 지갑 주소</p>
    </div>
  );
}


function Radio({ addressMode, onModeChange }: { addressMode: "qr" | "recent"; onModeChange: (mode: "qr" | "recent") => void }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="radio">
      <div onClick={() => onModeChange("qr")} className={`[grid-area:1_/_1] box-border content-stretch flex gap-[10px] items-start ml-0 mt-0 px-[8px] py-[10px] relative rounded-[6px] w-[156px] cursor-pointer ${addressMode === "qr" ? 'bg-white' : ''}`} data-name="radio_box_line_h40">
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${addressMode === "qr" ? 'border-[#2a3fec]' : 'border-[#dddddd]'}`} />
        <div className="basis-0 flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-center" style={{ color: addressMode === "qr" ? '#2a3fec' : '#111111', fontWeight: addressMode === "qr" ? 700 : 500 }}>
          <p className="leading-[20px]">QR코드 스캔</p>
        </div>
      </div>
      <div onClick={() => onModeChange("recent")} className={`[grid-area:1_/_1] box-border content-stretch flex gap-[10px] items-start ml-[164px] mt-0 px-[8px] py-[10px] relative rounded-[6px] w-[156px] cursor-pointer ${addressMode === "recent" ? 'bg-white' : ''}`} data-name="radio_box_line_h40">
        <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${addressMode === "recent" ? 'border-[#2a3fec]' : 'border-[#dddddd]'}`} />
        <div className="basis-0 flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-center" style={{ color: addressMode === "recent" ? '#2a3fec' : '#111111', fontWeight: addressMode === "recent" ? 700 : 500 }}>
          <p className="leading-[20px]">최근 주소</p>
        </div>
      </div>
    </div>
  );
}

function Frame42({ address, onChange, addressMode, onAddressModeChange }: { address: string; onChange: (value: string) => void; addressMode: "qr" | "recent"; onAddressModeChange: (mode: "qr" | "recent") => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full">
      <Input
        value={address}
        placeholder="외부 지갑 주소를 입력하세요"
        onChange={(event) => onChange(event.target.value)}
      />
      <Radio addressMode={addressMode} onModeChange={onAddressModeChange} />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">※ 반드시 Polygon 네트워크 주소를 입력해주세요</p>
      </div>
    </div>
  );
}

function Frame13({ address, onChange, addressMode, onAddressModeChange }: { address: string; onChange: (value: string) => void; addressMode: "qr" | "recent"; onAddressModeChange: (mode: "qr" | "recent") => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-center px-[20px] py-0 relative shrink-0">
      <Frame8 />
      <Frame42 address={address} onChange={onChange} addressMode={addressMode} onAddressModeChange={onAddressModeChange} />
    </div>
  );
}

function Frame30({ onNavigateBack, dtAmount, exchangeRate, lastUpdated, amountMode, onModeChange, withdrawalAmount, onWithdrawalAmountChange, expectedUsdc, address, onAddressChange, addressMode, onAddressModeChange }: { onNavigateBack?: () => void; dtAmount: number; exchangeRate: number; lastUpdated: string; amountMode: AmountMode; onModeChange: (mode: AmountMode) => void; withdrawalAmount: string; onWithdrawalAmountChange: (value: string) => void; expectedUsdc: number; address: string; onAddressChange: (value: string) => void; addressMode: "qr" | "recent"; onAddressModeChange: (mode: "qr" | "recent") => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame11 onNavigateBack={onNavigateBack} dtAmount={dtAmount} exchangeRate={exchangeRate} lastUpdated={lastUpdated} />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
      <Frame25 amountMode={amountMode} onModeChange={onModeChange} value={withdrawalAmount} onChange={onWithdrawalAmountChange} expectedUsdc={expectedUsdc} />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
      <Frame13 address={address} onChange={onAddressChange} addressMode={addressMode} onAddressModeChange={onAddressModeChange} />
      <div className="bg-[#f6f6f9] h-[10px] shrink-0 w-full" data-name="np_00com_dv_360x10_sld.9" />
    </div>
  );
}

function Frame33({ withdrawalAmount }: { withdrawalAmount: number }) {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative w-[320px]">
      <p className="relative shrink-0 text-[#777e8c] text-[13px] w-[85px]">출금 금액</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-nowrap text-right whitespace-pre">{formatNumber(withdrawalAmount)} DT</p>
    </div>
  );
}

function Text({ withdrawalAmount }: { withdrawalAmount: number }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame33 withdrawalAmount={withdrawalAmount} />
    </div>
  );
}

function Frame34({ exchangeRate }: { exchangeRate: number }) {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">적용 환율</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">{formatDecimal(exchangeRate)}원/USD</p>
    </div>
  );
}

function Text1({ exchangeRate }: { exchangeRate: number }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame34 exchangeRate={exchangeRate} />
    </div>
  );
}

function Frame36({ expectedUsdc }: { expectedUsdc: number }) {
  return (
    <div className="content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">예상 수령</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">{formatDecimal(expectedUsdc)} USDC</p>
    </div>
  );
}

function Frame37({ withdrawalAmount, exchangeRate, expectedUsdc }: { withdrawalAmount: number; exchangeRate: number; expectedUsdc: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Text withdrawalAmount={withdrawalAmount} />
      <Text1 exchangeRate={exchangeRate} />
      <Frame36 expectedUsdc={expectedUsdc} />
    </div>
  );
}

function Frame35({ bridgeFee }: { bridgeFee: number }) {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] items-center justify-between leading-[20px] ml-0 mt-0 not-italic relative text-nowrap w-[320px] whitespace-pre">
      <p className="relative shrink-0 text-[#777e8c] text-[13px]">브릿지 수수료</p>
      <p className="relative shrink-0 text-[#333950] text-[14px] text-right">{formatNumber(bridgeFee)} DT({(BRIDGE_FEE_RATE * 100).toFixed(1)}%)</p>
    </div>
  );
}

function Text2({ bridgeFee }: { bridgeFee: number }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="text">
      <Frame35 bridgeFee={bridgeFee} />
    </div>
  );
}

function Frame38({ withdrawalAmount, exchangeRate, expectedUsdc, bridgeFee }: { withdrawalAmount: number; exchangeRate: number; expectedUsdc: number; bridgeFee: number }) {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[16px] items-start ml-0 mt-0 relative w-[320px]">
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Frame37 withdrawalAmount={withdrawalAmount} exchangeRate={exchangeRate} expectedUsdc={expectedUsdc} />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
      <Text2 bridgeFee={bridgeFee} />
      <div className="bg-[#eeeeee] h-px shrink-0 w-full" data-name="line" />
    </div>
  );
}

function List({ withdrawalAmount, exchangeRate, expectedUsdc, bridgeFee }: { withdrawalAmount: number; exchangeRate: number; expectedUsdc: number; bridgeFee: number }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="list">
      <Frame38 withdrawalAmount={withdrawalAmount} exchangeRate={exchangeRate} expectedUsdc={expectedUsdc} bridgeFee={bridgeFee} />
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
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#fa2d42] text-[11px] text-nowrap whitespace-pre">주의사항</p>
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

function Frame31({ withdrawalAmount, exchangeRate, expectedUsdc, bridgeFee }: { withdrawalAmount: number; exchangeRate: number; expectedUsdc: number; bridgeFee: number }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[20px] items-start pb-0 pt-[40px] px-0 relative shrink-0 w-[320px]">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">출금 정보</p>
      <List withdrawalAmount={withdrawalAmount} exchangeRate={exchangeRate} expectedUsdc={expectedUsdc} bridgeFee={bridgeFee} />
      <Frame10 />
    </div>
  );
}

function Frame41({ onNavigateBack, dtAmount, exchangeRate, lastUpdated, amountMode, onModeChange, withdrawalAmount, onWithdrawalAmountChange, expectedUsdc, address, onAddressChange, addressMode, onAddressModeChange }: { onNavigateBack?: () => void; dtAmount: number; exchangeRate: number; lastUpdated: string; amountMode: AmountMode; onModeChange: (mode: AmountMode) => void; withdrawalAmount: string; onWithdrawalAmountChange: (value: string) => void; expectedUsdc: number; address: string; onAddressChange: (value: string) => void; addressMode: "qr" | "recent"; onAddressModeChange: (mode: "qr" | "recent") => void }) {
  const withdrawalAmountNumeric = parseNumber(withdrawalAmount);
  const bridgeFee = withdrawalAmountNumeric * BRIDGE_FEE_RATE;

  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[360px]">
      <Frame30 onNavigateBack={onNavigateBack} dtAmount={dtAmount} exchangeRate={exchangeRate} lastUpdated={lastUpdated} amountMode={amountMode} onModeChange={onModeChange} withdrawalAmount={withdrawalAmount} onWithdrawalAmountChange={onWithdrawalAmountChange} expectedUsdc={expectedUsdc} address={address} onAddressChange={onAddressChange} addressMode={addressMode} onAddressModeChange={onAddressModeChange} />
      <Frame31 withdrawalAmount={withdrawalAmountNumeric} exchangeRate={exchangeRate} expectedUsdc={expectedUsdc} bridgeFee={bridgeFee} />
    </div>
  );
}

export default function UsdcWithdrawal({ onNavigateBack, onSubmit }: UsdcWithdrawalProps) {
  const { wallet } = useMyWallet();
  const { setExtractAmount } = useDeposit();
  const [amountMode, setAmountMode] = useState<AmountMode>("manual");
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
  const [address, setAddress] = useState("");
  const [addressMode, setAddressMode] = useState<"qr" | "recent">("qr");
  const [isLoading, setIsLoading] = useState(false);

  const dtAmount = wallet.balance_dt;
  const exchangeRate = KRW_USD_EXCHANGE_RATE;
  const lastUpdated = useMemo(
    () =>
      new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    []
  );

  const withdrawalAmountNumeric = useMemo(() => parseNumber(withdrawalAmount), [withdrawalAmount]);
  const expectedUsdc = useMemo(() => (withdrawalAmountNumeric ? withdrawalAmountNumeric / dtPerUsdc : 0), [withdrawalAmountNumeric]);

  const handleAmountChange = (value: string) => {
    const numeric = parseNumber(value);
    setAmountMode("manual");
    setWithdrawalAmount(numeric ? formatNumber(numeric) : "");
  };

  const handleModeChange = (mode: AmountMode) => {
    // alert("출금 신청 전 반드시 외부 지갑 주소와 출금 금액을 확인해주세요.");
    if (mode === "manual") {
      setAmountMode("manual");
      setWithdrawalAmount("");
    } else {
      setAmountMode("max");
      setWithdrawalAmount(formatNumber(dtAmount));
    }
  };

  const handleAddressModeChange = async (mode: "qr" | "recent") => {

    setAddressMode(mode);
    if (mode === "recent") {

      await metaMaskWallet.initialize(80002);
      setAddress(metaMaskWallet.account);
    }
  };

  const isSubmitDisabled = withdrawalAmountNumeric <= 0 || !address.trim() || isLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    setExtractAmount(withdrawalAmountNumeric);
    setIsLoading(true);
    const withAmount = parseNumber(withdrawalAmount);
    // alert(withAmount.toString() + " DT 출금 신청이 완료되었습니다. 출금 내역은 마이페이지에서 확인할 수 있습니다.");
    // alert(withdrawalAmount + " DT 출금 신청이 완료되었습니다. 출금 내역은 마이페이지에서 확인할 수 있습니다.");
    const myaddress = wallet.getAddress();
    // parseNumber(expectedUsdc);
    formatNumber(expectedUsdc);
    // alert(formatNumber(expectedUsdc));
    try {
      const response = await api.post("/redeem", {
        holder: myaddress,
        amount: withAmount.toString()
      });

      const tx = await wallet.sendERC20Token(USDC_CONTRACT_ADDRESS, address, formatNumber(expectedUsdc));


    } catch (error) {
      alert("출금 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
      setIsLoading(false);
      return;
    }

    onSubmit?.({ dtAmount: withdrawalAmountNumeric, expectedUsdc, address });
    setIsLoading(false);
  };

  return (
    <div className="bg-white relative size-full" data-name="12.출금">
      <Frame41
        onNavigateBack={onNavigateBack}
        dtAmount={dtAmount}
        exchangeRate={exchangeRate}
        lastUpdated={lastUpdated}
        amountMode={amountMode}
        onModeChange={handleModeChange}
        withdrawalAmount={withdrawalAmount}
        onWithdrawalAmountChange={handleAmountChange}
        expectedUsdc={expectedUsdc}
        address={address}
        onAddressChange={setAddress}
        addressMode={addressMode}
        onAddressModeChange={handleAddressModeChange}
      />
      <MobileStickyFooter>
        <div className="flex w-full gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={onNavigateBack}
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            출금신청
          </Button>
        </div>
      </MobileStickyFooter>
    </div>
  );
}