import { createContext, useState, ReactNode, useContext } from 'react';

interface MyWalletContextType {
  myAddress: string | null;
  setMyAddress: (address: string | null) => void;


}

const MyWalletContext = createContext<MyWalletContextType | undefined>(undefined);

export const MyWalletProvider = ({ children }: { children: ReactNode }) => {
  const [myAddress, setMyAddress] = useState<string | null>(null);
  return (
    <MyWalletContext.Provider value={{ myAddress, setMyAddress }}>
      {children}
    </MyWalletContext.Provider>
  );
};

export const useMyWallet = () => {
  const context = useContext(MyWalletContext);
  if (context === undefined) {
    throw new Error('useDeposit must be used within a DepositProvider');
  }
  return context;
};
