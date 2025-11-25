import { useMemo, useState, useEffect } from "react";
import { Button, Input, SmallButton } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";
import {
  AVAILABLE_USDC_AMOUNT,
  AVAILABLE_USDC_KRW,
  USDC_CONTRACT_ADDRESS,
  formatCurrency,
  formatNumber,
  KRW_USD_EXCHANGE_RATE,
} from "../constants/wallet";

import { metaMaskWallet } from "./metaMask";
import { useDeposit } from "../contexts/DepositContext";
import { useMyWallet } from "../contexts/WalletContext";
import { parse } from "path";


interface DepositStep2Props {
  onNavigateBack?: () => void;
  onNavigateNext?: () => void;
}

type AmountMode = "manual" | "max";

const parseNumber = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
};

export default function DepositStep2({ onNavigateBack, onNavigateNext }: DepositStep2Props) {
  const { wallet } = useMyWallet();
  const { setTxid, setDepositAmount } = useDeposit();
  const [amountMode, setAmountMode] = useState<AmountMode>("manual");
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [helperText, setHelperText] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      await metaMaskWallet.initialize(80002);
      setHelperText(`최대 한도 ${formatNumber(metaMaskWallet.balance)} USDC`);
      setAddress(wallet.getAddress());
    };
    init();

  }, []);

  const handleAmountChange = (value: string) => {
    const numeric = parseNumber(value);
    setAmountMode("manual");
    setAmount(numeric ? formatNumber(numeric) : "");
  };

  const handleSelectManual = () => {
    setAmountMode("manual");
    setAmount("");
  };

  const handleSelectMax = () => {
    setAmountMode("max");
    // setAmount(formattedMaxAmount);
    setAmount(formatNumber(metaMaskWallet.balance));
  };

  const sendUSDC = async () => {
    const numericAmount = parseNumber(amount);
    if (numericAmount <= 0) {
      alert("입금할 금액을 입력해주세요.");
      return;
    }
    if (numericAmount > metaMaskWallet.balance) {
      alert("잔고가 부족합니다.");
      return;
    }


    const amtSend = parseNumber(amount);

    try {
      const txid = await metaMaskWallet.sendErc20Token(USDC_CONTRACT_ADDRESS, address, amtSend.toString());
      setTxid(txid);
      setDepositAmount(numericAmount)
      console.log("Transaction ID:", txid);
      onNavigateNext?.();
    } catch (error) {
      console.error("Failed to send USDC:", error);
      alert("토큰 전송에 실패했습니다.");
    }
  }

  const numericAmount = parseNumber(amount);
  const isNextDisabled = numericAmount <= 0;

  return (
    <div className="bg-white flex min-h-full w-full max-w-[360px] flex-col">
      <MobilePageHeader title="USDC 입금" onBack={onNavigateBack} />

      <div className="h-1 w-full bg-[#eeeeee]">
        <div className="h-full w-full bg-gradient-to-r from-[#4a2aec] to-[#3860ff]" />
      </div>

      <main className="flex-1 overflow-y-auto px-5 pb-28 pt-8">
        <section className="space-y-4">
          <h2 className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[20px] text-[#111111] leading-[28px]">
            <p className="mb-0 font-bold">입금할 금액을</p>
            <p className="font-bold">입력해주세요</p>
          </h2>
        </section>

        <section className="mt-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[14px] text-[#111111]">
                입금 USDC 수량
              </span>
              <div className="flex items-center gap-2 rounded-[6px] bg-[#e7eaef] p-1">
                <SmallButton
                  variant={amountMode === "manual" ? "primary" : "default"}
                  className="px-3"
                  onClick={handleSelectManual}
                >
                  직접입력
                </SmallButton>
                <SmallButton
                  variant={amountMode === "max" ? "primary" : "default"}
                  className="px-3"
                  onClick={handleSelectMax}
                >
                  최대한도
                </SmallButton>
              </div>
            </div>
            <Input
              value={amount}
              placeholder="금액을 입력하세요"
              onChange={(event) => handleAmountChange(event.target.value)}
              suffix={
                <span className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[14px] text-[#111111] pr-4">
                  USDC
                </span>
              }
              helperText={helperText}
              inputMode="numeric"
            />
          </div>

          <div className="space-y-3">
            <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[14px] text-[#111111]">
              입금받을 주소
            </span>
            <Input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              suffix={<SmallButton>주소확인</SmallButton>}
            />
          </div>
        </section>
      </main>

      <MobileStickyFooter>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isNextDisabled}
          onClick={sendUSDC}
        >
          다음
        </Button>
      </MobileStickyFooter>
    </div>
  );
}
