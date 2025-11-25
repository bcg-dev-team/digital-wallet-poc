import { createContext, useState, ReactNode, useContext } from 'react';

interface DepositContextType {
  txid: string | null;
  setTxid: (txid: string | null) => void;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;

  exchangeAmount?: number;
  setExchangeAmount: (exchangeAmount: number) => void;

  extractAmount?: number;
  setExtractAmount: (extractAmount: number) => void;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const DepositProvider = ({ children }: { children: ReactNode }) => {
  const [txid, setTxid] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [exchangeAmount, setExchangeAmount] = useState<number>(0);
  const [extractAmount, setExtractAmount] = useState<number>(0);
  return (
    <DepositContext.Provider value={{ txid, setTxid, depositAmount, setDepositAmount, exchangeAmount, setExchangeAmount, extractAmount, setExtractAmount }}>
      {children}
    </DepositContext.Provider>
  );
};

export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (context === undefined) {
    throw new Error('useDeposit must be used within a DepositProvider');
  }
  return context;
};
