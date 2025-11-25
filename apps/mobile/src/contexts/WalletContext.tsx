import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { myWallet, MyWallet } from '../imports/myWallet';

interface MyWalletContextType {
  myAddress: string | null;
  setMyAddress: (address: string | null) => void;
  wallet: MyWallet;
  isInitialized: boolean;
}

const MyWalletContext = createContext<MyWalletContextType | undefined>(undefined);

export const MyWalletProvider = ({ children }: { children: ReactNode }) => {
  const [myAddress, setMyAddress] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 앱 시작 시 한 번만 초기화
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        await myWallet.initialize();
        setIsInitialized(true);
        console.log('[WalletContext] Wallet initialized globally');
      } catch (error) {
        console.error('[WalletContext] Failed to initialize wallet:', error);
      }
    };

    if (!isInitialized) {
      initializeWallet();
    }
  }, []);

  return (
    <MyWalletContext.Provider value={{ myAddress, setMyAddress, wallet: myWallet, isInitialized }}>
      {children}
    </MyWalletContext.Provider>
  );
};

export const useMyWallet = () => {
  const context = useContext(MyWalletContext);
  if (context === undefined) {
    throw new Error('useMyWallet must be used within a MyWalletProvider');
  }
  return context;
};
