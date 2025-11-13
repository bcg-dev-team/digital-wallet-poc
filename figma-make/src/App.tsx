import { useState } from "react";
import My from "./imports/My홈국내";
import Component0001y from "./imports/00공통01전체메뉴로그인y";
import Component01 from "./imports/01지갑온보딩";
import Component02 from "./imports/02네트워크선택전";
import Component03 from "./imports/03지갑생성완료";
import Component0501 from "./imports/05입금01";
import Component0502 from "./imports/05입금02";
import Component06 from "./imports/06입금진행중";
import Component07 from "./imports/07입금완료-4-9634";
import Component08 from "./imports/08UsdcDt환전";
import Component09 from "./imports/09입금진행중";
import Component04 from "./imports/04홈디지털월렛메인";
import WalletHome from "./imports/홈디지털월렛";
import Component10 from "./imports/10음악저작권토큰증권";
import Component10Detail from "./imports/10음악저작권토큰증권상세";
import Component11 from "./imports/11토큰증권거래";
import Component12 from "./components/출금USDC";
import Component13 from "./imports/13디지털자산거래내역";
import Component14 from "./components/디지털자산거래내역";
import BuyOrderBottomSheet from "./components/BuyOrderBottomSheet";

type Screen = 'home' | 'menu' | 'wallet-onboarding' | 'network-selection' | 'wallet-complete' | 'wallet-main' | 'wallet-home' | 'usdc-deposit' | 'usdc-deposit-02' | 'usdc-deposit-progress' | 'usdc-deposit-complete' | 'usdc-exchange' | 'usdc-exchange-progress' | 'token-securities' | 'token-securities-detail' | 'token-trading' | 'withdrawal' | 'transaction-history' | 'transaction-history-new';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isBuyOrderSheetOpen, setIsBuyOrderSheetOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f6f9]">
      <div className="relative bg-white shadow-lg overflow-hidden" style={{ width: '360px', height: '800px' }}>
        {/* MY홈 화면 */}
        <div 
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          style={{ display: currentScreen === 'home' ? 'block' : 'none' }}
          onClick={(e) => {
            // 메뉴 버튼 클릭 감지
            const target = e.target as HTMLElement;
            const menuButton = target.closest('[data-name="img_00com_qm_grd_50_menu"]');
            if (menuButton) {
              e.stopPropagation();
              setCurrentScreen('menu');
              return;
            }

            // SOL 디지털 월렛 배너 클릭 감지
            const textElement = target.closest('p');
            if (textElement && textElement.textContent?.includes('SOL 디지털 월렛')) {
              e.stopPropagation();
              setCurrentScreen('wallet-home');
            }
          }}
        >
          <My />
        </div>

        {/* 전체 메뉴 모달 */}
        {currentScreen === 'menu' && (
          <div 
            className="absolute inset-0 bg-white overflow-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 닫기 버튼 클릭 감지
              const closeButton = target.closest('[data-name="ic_00com_28_line_close"]');
              if (closeButton) {
                e.stopPropagation();
                setCurrentScreen('home');
                return;
              }

              // SOL 디지털 월렛 메뉴 클릭 감지
              const textElement = target.closest('p');
              if (textElement && textElement.textContent?.includes('SOL 디지털 월렛')) {
                e.stopPropagation();
                setCurrentScreen('wallet-onboarding');
                return;
              }

              // 토큰 증권 거래 메뉴 클릭 감지
              if (textElement && textElement.textContent?.includes('토큰 증권 거래')) {
                e.stopPropagation();
                setCurrentScreen('token-securities');
              }
            }}
          >
            <Component0001y />
          </div>
        )}

        {/* SOL 디지털 월렛 온보딩 화면 */}
        {currentScreen === 'wallet-onboarding' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('menu');
                return;
              }

              // 시작하기 버튼 클릭 감지
              const startButton = target.closest('[data-name="btn_main_n.9"]');
              if (startButton) {
                e.stopPropagation();
                setCurrentScreen('network-selection');
              }
            }}
          >
            <Component01 />
          </div>
        )}

        {/* 네트워크 선택 화면 */}
        {currentScreen === 'network-selection' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-onboarding');
              }
            }}
          >
            <Component02 onNext={() => setCurrentScreen('wallet-complete')} />
          </div>
        )}

        {/* 지갑 생성 완료 화면 */}
        {currentScreen === 'wallet-complete' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지 (svg path 기반)
              const backButton = target.closest('button');
              if (backButton && backButton.querySelector('svg path[d*="M15 18l-6-6 6-6"]')) {
                e.stopPropagation();
                setCurrentScreen('network-selection');
                return;
              }

              // USDC 입금하기 버튼 클릭 감지
              const depositButton = target.closest('button');
              if (depositButton && depositButton.textContent?.includes('USDC 입금하기')) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
              }
            }}
          >
            <Component03 />
          </div>
        )}

        {/* USDC 입금 화면 */}
        {currentScreen === 'usdc-deposit' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-complete');
                return;
              }

              // 다음 버튼 클릭 감지
              const nextButton = target.closest('[data-name="btn_main_n.9"]');
              if (nextButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-02');
              }
            }}
          >
            <Component0501 />
          </div>
        )}

        {/* USDC 입금 화면 02 - 금액 입력 */}
        {currentScreen === 'usdc-deposit-02' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
                return;
              }

              // 다음 버튼 클릭 감지
              const nextButton = target.closest('[data-name="btn_main_n.9"]');
              if (nextButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-progress');
              }
            }}
          >
            <Component0502 />
          </div>
        )}

        {/* USDC 입금 진행중 화면 */}
        {currentScreen === 'usdc-deposit-progress' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-02');
                return;
              }

              // 확인 버튼 클릭 감지
              const confirmButton = target.closest('[data-name="btn_main_n.9"]');
              if (confirmButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-complete');
              }
            }}
          >
            <Component06 />
          </div>
        )}

        {/* USDC 입금 완료 화면 */}
        {currentScreen === 'usdc-deposit-complete' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-progress');
                return;
              }

              // 지갑 보기 버튼 클릭 감지
              const walletButton = target.closest('[data-name="btn_main_n.9"]');
              if (walletButton && walletButton.textContent?.includes('지갑 보기')) {
                e.stopPropagation();
                setCurrentScreen('home');
                return;
              }

              // 환전하기 버튼 클릭 감지
              const exchangeButton = target.closest('[data-name="np_00com_btn_l1_sub_n.9"]');
              if (exchangeButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-exchange');
              }
            }}
          >
            <Component07 />
          </div>
        )}

        {/* USDC 환전 화면 */}
        {currentScreen === 'usdc-exchange' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-complete');
                return;
              }

              // 취소 버튼 클릭 감지
              const cancelButton = target.closest('[data-name="np_00com_btn_l1_sub_n.9"]');
              if (cancelButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit-complete');
                return;
              }

              // 환전하기 버튼 클릭 감지
              const exchangeButton = target.closest('[data-name="btn_main_n.9"]');
              if (exchangeButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-exchange-progress');
              }
            }}
          >
            <Component08 />
          </div>
        )}

        {/* USDC 환전 진행중 화면 */}
        {currentScreen === 'usdc-exchange-progress' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('usdc-exchange');
                return;
              }

              // 홈 화면으로 가기 버튼 클릭 감지
              const homeButton = target.closest('[data-name="btn_main_n.9"]');
              if (homeButton) {
                e.stopPropagation();
                setCurrentScreen('home');
              }
            }}
          >
            <Component09 />
          </div>
        )}

        {/* 음악 저작권 토큰 증권 화면 */}
        {currentScreen === 'token-securities' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('menu');
                return;
              }

              // "라일락 - IU" 텍스트 클릭 감지
              const textElement = target.closest('p');
              if (textElement && textElement.textContent?.includes('라일락 - IU')) {
                e.stopPropagation();
                setCurrentScreen('token-securities-detail');
              }
            }}
          >
            <Component10 />
          </div>
        )}

        {/* 음악 저작권 토큰 증권 상세 화면 */}
        {currentScreen === 'token-securities-detail' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('token-securities');
                return;
              }

              // 거래하기 버튼 클릭 감지
              const tradeButton = target.closest('[data-name="btn_main_n.9"]');
              if (tradeButton && tradeButton.textContent?.includes('거래하기')) {
                e.stopPropagation();
                setCurrentScreen('token-trading');
              }
            }}
          >
            <Component10Detail />
          </div>
        )}

        {/* 토큰 증권 거래 화면 */}
        {currentScreen === 'token-trading' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('token-securities-detail');
                return;
              }

              // 매수주문 버튼 클릭 감지
              const buyButton = target.closest('p');
              if (buyButton && buyButton.textContent?.includes('매수주문') && !buyButton.textContent?.includes('매도')) {
                e.stopPropagation();
                setIsBuyOrderSheetOpen(true);
              }
            }}
          >
            <Component11 />
          </div>
        )}

        {/* 디지털 월렛 메인 화면 */}
        {currentScreen === 'wallet-main' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('home');
                return;
              }

              // 입금 버튼 클릭 감지
              const depositCard = target.closest('p');
              if (depositCard && depositCard.textContent?.includes('입금') && !depositCard.textContent?.includes('예치금')) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
                return;
              }

              // USDC 입금하기 버튼 클릭 감지
              const depositButton = target.closest('[data-name="btn_main_n.9"]');
              if (depositButton && depositButton.textContent?.includes('입금하기')) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
                return;
              }

              // 출금 버튼 클릭 감지 (💵 출금 카드)
              const textElement = target.closest('p');
              if (textElement && textElement.textContent?.includes('출금') && !textElement.textContent?.includes('입금')) {
                e.stopPropagation();
                setCurrentScreen('withdrawal');
                return;
              }

              // 거래내역 버튼 클릭 감지 (📊 거래내역 카드)
              if (textElement && textElement.textContent?.includes('거래내역')) {
                e.stopPropagation();
                setCurrentScreen('transaction-history');
                return;
              }

              // 메뉴 버튼 클릭 감지
              const menuButton = target.closest('[data-name="img_00com_qm_grd_50_menu"]');
              if (menuButton) {
                e.stopPropagation();
                setCurrentScreen('menu');
              }
            }}
          >
            <Component04 />
          </div>
        )}

        {/* 출금 화면 */}
        {currentScreen === 'withdrawal' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-main');
                return;
              }

              // 취소 버튼 클릭 감지
              const cancelButton = target.closest('[data-name="np_00com_btn_l1_sub_n.9"]');
              if (cancelButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-main');
                return;
              }
            }}
          >
            <Component12 onNavigateToHistory={() => setCurrentScreen('transaction-history-new')} />
          </div>
        )}

        {/* 디지털 자산 거래 내역 화면 */}
        {currentScreen === 'transaction-history' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-main');
                return;
              }

              // 메뉴 버튼 클릭 감지
              const menuButton = target.closest('[data-name="img_00com_qm_grd_50_menu"]');
              if (menuButton) {
                e.stopPropagation();
                setCurrentScreen('menu');
              }
            }}
          >
            <Component13 />
          </div>
        )}

        {/* 디지털 자산 거래 내역 화면 (새로운 버전) */}
        {currentScreen === 'transaction-history-new' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('wallet-main');
                return;
              }

              // 메뉴 버튼 클릭 감지
              const menuButton = target.closest('[data-name="img_00com_qm_grd_50_menu"]');
              if (menuButton) {
                e.stopPropagation();
                setCurrentScreen('menu');
              }
            }}
          >
            <Component14 />
          </div>
        )}

        {/* 홈-디지털월렛 화면 */}
        {currentScreen === 'wallet-home' && (
          <div 
            className="absolute inset-0 bg-white overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              
              // 뒤로가기 버튼 클릭 감지
              const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
              if (backButton) {
                e.stopPropagation();
                setCurrentScreen('home');
                return;
              }

              // 입금하기 버튼 클릭 감지
              const depositButton = target.closest('p');
              if (depositButton && depositButton.textContent?.includes('입금하기')) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
                return;
              }

              // 환전하기 버튼 클릭 감지
              const exchangeButton = target.closest('p');
              if (exchangeButton && exchangeButton.textContent?.includes('환전하기')) {
                e.stopPropagation();
                setCurrentScreen('usdc-exchange');
                return;
              }

              // 입금 아이콘 클릭 감지
              const textElement = target.closest('p');
              if (textElement && textElement.textContent?.includes('입금') && !textElement.textContent?.includes('환전')) {
                e.stopPropagation();
                setCurrentScreen('usdc-deposit');
                return;
              }

              // 출금 아이콘 클릭 감지
              if (textElement && textElement.textContent?.includes('출금')) {
                e.stopPropagation();
                setCurrentScreen('withdrawal');
                return;
              }

              // 거래내역 아이콘 클릭 감지
              if (textElement && textElement.textContent?.includes('거래내역')) {
                e.stopPropagation();
                setCurrentScreen('transaction-history');
                return;
              }

              // 토큰 증권 클릭 감지
              if (textElement && textElement.textContent?.includes('라일락 - IU')) {
                e.stopPropagation();
                setCurrentScreen('token-securities-detail');
              }
            }}
          >
            <WalletHome />
          </div>
        )}
      </div>
      {/* 구매 주문 시트 */}
      {isBuyOrderSheetOpen && (
        <BuyOrderBottomSheet 
          isOpen={isBuyOrderSheetOpen}
          onClose={() => setIsBuyOrderSheetOpen(false)} 
        />
      )}
    </div>
  );
}