import { useNavigate } from "react-router-dom";
import { ActionCard, Button, Card, CardContent, CardHeader } from "@digital-wallet/ui";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#eeeeee] px-[20px] py-[16px]">
        <h1 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[20px] text-[#111111]">
          신한 디지털 금융
        </h1>
        <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[14px] text-[#777e8c] mt-[4px]">
          안전하고 편리한 디지털 자산 관리
        </p>
      </div>

      {/* Main Content */}
      <div className="px-[20px] py-[24px]">
        {/* 빠른 서비스 */}
        <div className="mb-[32px]">
          <h2 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[16px] text-[#111111] mb-[16px]">
            빠른 서비스
          </h2>
          <div className="flex gap-[12px]">
            <ActionCard 
              icon="💰" 
              title="입금" 
              variant="deposit"
              onClick={() => navigate("/deposit")}
            />
            <ActionCard 
              icon="💵" 
              title="송금" 
              variant="withdraw"
            />
            <ActionCard 
              icon="📊" 
              title="거래내역" 
              variant="history"
            />
          </div>
        </div>

        {/* SOL 디지털 월렛 배너 */}
        <div className="mb-[32px]">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => navigate("/wallet")}
          >
            <CardContent className="p-[20px]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[18px] text-[#111111] mb-[8px]">
                    SOL 디지털 월렛
                  </h3>
                  <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[14px] text-[#777e8c] mb-[16px]">
                    USDC, DT 등 다양한 디지털 자산을 관리하세요
                  </p>
                  <Button variant="primary" size="sm">
                    지갑 열기 →
                  </Button>
                </div>
                <div className="text-[48px]">
                  💳
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 추천 서비스 */}
        <div className="mb-[32px]">
          <h2 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[16px] text-[#111111] mb-[16px]">
            추천 서비스
          </h2>
          
          <Card className="mb-[12px]">
            <CardContent className="p-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="text-[32px]">🎵</div>
                <div className="flex-1">
                  <h4 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[14px] text-[#111111] mb-[4px]">
                    음악 저작권 토큰 (ST)
                  </h4>
                  <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[12px] text-[#777e8c]">
                    음악 저작권에 투자하고 수익을 얻으세요
                  </p>
                </div>
                <div className="text-[#2a3fec]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="text-[32px]">💱</div>
                <div className="flex-1">
                  <h4 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[14px] text-[#111111] mb-[4px]">
                    환전 서비스
                  </h4>
                  <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[12px] text-[#777e8c]">
                    USDC를 DT로 간편하게 환전하세요
                  </p>
                </div>
                <div className="text-[#2a3fec]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 공지사항 */}
        <div>
          <h2 className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold text-[16px] text-[#111111] mb-[16px]">
            공지사항
          </h2>
          <div className="space-y-[12px]">
            <div className="border-b border-[#eeeeee] pb-[12px]">
              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[14px] text-[#111111] mb-[4px]">
                디지털 월렛 서비스 오픈 안내
              </p>
              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[12px] text-[#999ea4]">
                2024.11.03
              </p>
            </div>
            <div className="border-b border-[#eeeeee] pb-[12px]">
              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[14px] text-[#111111] mb-[4px]">
                USDC 입출금 수수료 무료 이벤트
              </p>
              <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] text-[12px] text-[#999ea4]">
                2024.11.01
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

