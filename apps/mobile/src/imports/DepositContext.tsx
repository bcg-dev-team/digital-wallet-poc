import { createContext, useState, ReactNode, useContext } from 'react';

interface DepositContextType {
  txid: string | null;
  setTxid: (txid: string | null) => void;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const DepositProvider = ({ children }: { children: ReactNode }) => {
  const [txid, setTxid] = useState<string | null>(null);

  return (
    <DepositContext.Provider value={{ txid, setTxid }}>
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