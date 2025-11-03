/**
 * 지표 타입
 */
export interface Indicator {
  id: string;
  name: string;
  description: string;
}

/**
 * 지표 카테고리 타입
 */
export interface IndicatorCategory {
  id: string;
  name: string;
  indicators: Indicator[];
}

/**
 * TradingView 지표 카테고리별 데이터
 */
export const indicatorCategories: IndicatorCategory[] = [
  {
    id: 'trend',
    name: '추세 지표',
    indicators: [
      {
        id: 'sma',
        name: '단순 이동평균 (SMA)',
        description: '일정 기간의 평균 가격을 계산하는 지표',
      },
      {
        id: 'ema',
        name: '지수 이동평균 (EMA)',
        description: '최근 데이터에 더 높은 가중치를 주는 이동평균',
      },
      {
        id: 'wma',
        name: '가중 이동평균 (WMA)',
        description: '가중치를 적용한 이동평균',
      },
      {
        id: 'dema',
        name: '이중 지수 이동평균 (DEMA)',
        description: '이중 지수 이동평균',
      },
      {
        id: 'tema',
        name: '삼중 지수 이동평균 (TEMA)',
        description: '삼중 지수 이동평균',
      },
      {
        id: 'hma',
        name: '헐 이동평균 (HMA)',
        description: '헐 이동평균',
      },
      {
        id: 'adaptive-ma',
        name: '적응형 이동평균',
        description: '변동성에 따라 적응하는 이동평균',
      },
      {
        id: 'macd',
        name: 'MACD',
        description: '이동평균 수렴/발산 지표',
      },
      {
        id: 'ichimoku',
        name: '일목균형표',
        description: '추세와 지지/저항을 나타내는 지표',
      },
      {
        id: 'parabolic-sar',
        name: '파라볼릭 SAR',
        description: '추세의 전환점을 찾는 지표',
      },
      {
        id: 'supertrend',
        name: 'SuperTrend',
        description: '추세 방향을 나타내는 지표',
      },
      {
        id: 'linear-regression',
        name: '선형회귀 곡선',
        description: '가격의 추세선을 나타내는 지표',
      },
      {
        id: 'guppy-ma',
        name: '구피 다중 이동평균',
        description: '여러 기간의 이동평균을 조합한 지표',
      },
      {
        id: 'envelopes',
        name: '엔벨로프',
        description: '이동평균을 중심으로 상하한계선을 그린 지표',
      },
      {
        id: 'bollinger-bands',
        name: '볼린저 밴드',
        description: '가격의 변동성을 나타내는 지표',
      },
      {
        id: 'keltner-channels',
        name: '켈트너 채널',
        description: '가격의 변동성을 나타내는 지표',
      },
      {
        id: 'donchian-channels',
        name: '돈치안 채널',
        description: '가격의 변동성을 나타내는 지표',
      },
      {
        id: 'price-channel',
        name: '가격 채널',
        description: '가격의 변동 범위를 나타내는 지표',
      },
    ],
  },
  {
    id: 'momentum',
    name: '모멘텀 지표',
    indicators: [
      {
        id: 'rsi',
        name: 'RSI (상대강도지수)',
        description: '과매수/과매도 상태를 판단하는 모멘텀 지표',
      },
      {
        id: 'stochastic',
        name: '스토캐스틱',
        description: '과매수/과매도 상태를 판단하는 지표',
      },
      {
        id: 'stochastic-rsi',
        name: '스토캐스틱 RSI',
        description: 'RSI의 스토캐스틱 지표',
      },
      {
        id: 'momentum',
        name: '모멘텀',
        description: '가격 변화율을 측정하는 지표',
      },
      {
        id: 'cci',
        name: 'CCI (상품채널지수)',
        description: '가격의 변동성을 측정하는 지표',
      },
      {
        id: 'williams-r',
        name: '윌리엄스 %R',
        description: '과매수/과매도 상태를 판단하는 지표',
      },
      {
        id: 'trix',
        name: 'TRIX',
        description: '3중 지수 이동평균의 변화율',
      },
      {
        id: 'ultimate-oscillator',
        name: '얼티메이트 오실레이터',
        description: '여러 기간의 모멘텀을 조합한 지표',
      },
      {
        id: 'chande-momentum',
        name: '찬데 모멘텀',
        description: '모멘텀의 변화를 측정하는 지표',
      },
      {
        id: 'awesome-oscillator',
        name: '어썸 오실레이터',
        description: '모멘텀의 변화를 측정하는 지표',
      },
    ],
  },
  {
    id: 'volume',
    name: '거래량 지표',
    indicators: [
      {
        id: 'obv',
        name: 'OBV (온밸런스볼륨)',
        description: '거래량을 이용한 모멘텀 지표',
      },
      {
        id: 'volume-oscillator',
        name: '거래량 오실레이터',
        description: '거래량의 변화를 측정하는 지표',
      },
      {
        id: 'chaikin-money-flow',
        name: '차이킨 머니 플로우',
        description: '거래량과 가격의 관계를 측정하는 지표',
      },
      {
        id: 'accumulation-distribution',
        name: '누적/분산',
        description: '거래량을 이용한 모멘텀 지표',
      },
      {
        id: 'money-flow-index',
        name: '머니 플로우 인덱스',
        description: '거래량과 가격의 관계를 측정하는 지표',
      },
      {
        id: 'ease-of-movement',
        name: '이지 오브 무브먼트',
        description: '가격 이동의 용이성을 측정하는 지표',
      },
      {
        id: 'klinger-oscillator',
        name: '클링거 오실레이터',
        description: '거래량과 가격의 관계를 측정하는 지표',
      },
      {
        id: 'price-volume-trend',
        name: '가격 거래량 추세',
        description: '거래량과 가격의 관계를 측정하는 지표',
      },
      {
        id: 'volume-profile',
        name: '거래량 프로파일',
        description: '가격대별 거래량 분포를 나타내는 지표',
      },
      {
        id: 'vwap',
        name: 'VWAP (거래량가중평균가격)',
        description: '거래량 가중 평균 가격',
      },
      {
        id: 'vwma',
        name: 'VWMA (거래량가중이동평균)',
        description: '거래량 가중 이동평균',
      },
    ],
  },
  {
    id: 'volatility',
    name: '변동성 지표',
    indicators: [
      {
        id: 'atr',
        name: 'ATR (평균진폭범위)',
        description: '가격의 변동성을 측정하는 지표',
      },
      {
        id: 'bollinger-bands-width',
        name: '볼린저 밴드폭',
        description: '볼린저 밴드의 폭을 측정하는 지표',
      },
      {
        id: 'bollinger-bands-b',
        name: '볼린저 밴드 %B',
        description: '볼린저 밴드 내에서의 위치를 나타내는 지표',
      },
      {
        id: 'chaikin-volatility',
        name: '차이킨 변동성',
        description: '가격의 변동성을 측정하는 지표',
      },
      {
        id: 'historical-volatility',
        name: '과거 변동성',
        description: '과거 가격의 변동성을 측정하는 지표',
      },
      {
        id: 'standard-deviation',
        name: '표준편차',
        description: '가격의 변동성을 측정하는 지표',
      },
      {
        id: 'volatility-ohlc',
        name: '변동성 (O-H-L-C)',
        description: 'OHLC 데이터를 이용한 변동성 지표',
      },
      {
        id: 'volatility-close-to-close',
        name: '변동성 (Close-to-Close)',
        description: '종가 데이터를 이용한 변동성 지표',
      },
      {
        id: 'volatility-zero-trend',
        name: '변동성 (Zero Trend)',
        description: '제로 트렌드 변동성 지표',
      },
    ],
  },
  {
    id: 'other',
    name: '기타 지표',
    indicators: [
      {
        id: 'pivot-points',
        name: '피벗 포인트',
        description: '지지/저항 레벨을 계산하는 지표',
      },
      {
        id: 'zig-zag',
        name: '지그재그',
        description: '중요한 가격 변동만을 표시하는 지표',
      },
      {
        id: 'williams-fractal',
        name: '윌리엄스 프랙탈',
        description: '고점과 저점을 찾는 지표',
      },
      {
        id: 'williams-alligator',
        name: '윌리엄스 앨리게이터',
        description: '추세의 방향을 나타내는 지표',
      },
      {
        id: 'correlation-coefficient',
        name: '상관계수',
        description: '두 시계열 데이터의 상관관계를 측정하는 지표',
      },
      {
        id: 'coppock-curve',
        name: '코팩 커브',
        description: '장기 모멘텀을 측정하는 지표',
      },
      {
        id: 'accumulative-swing-index',
        name: '누적 스윙 인덱스',
        description: '가격의 스윙을 측정하는 지표',
      },
      {
        id: 'arnaud-legoux-ma',
        name: '아르노 레구 이동평균',
        description: '변동성에 적응하는 이동평균',
      },
      {
        id: 'median-price',
        name: '중간 가격',
        description: '고가와 저가의 중간값',
      },
      {
        id: 'typical-price',
        name: '전형 가격',
        description: '고가, 저가, 종가의 평균',
      },
      {
        id: 'average-price',
        name: '평균 가격',
        description: 'OHLC의 평균',
      },
    ],
  },
];
