import { ethers } from "ethers";
/**
 * 지갑 관련 전역 상수
 */
export const AVAILABLE_USDC_AMOUNT = 1_000;
export const AVAILABLE_USDC_KRW = 1_350_000;

export const USDC_CONTRACT_ADDRESS =
  "0xf178317C8353C8Fef671dB4531e11e57b9Ea0a71";
export const KRW_USD_EXCHANGE_RATE = 1450; // 1 USD = 1350 KRW (예시 환율)

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ko-KR").format(value);

export const formatCurrency = (value: number, currencySymbol = "원") =>
  `${formatNumber(value)}${currencySymbol}`;

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const getERC20Balance = async (
  tokenAddress: string,
  userAddress: string
): Promise<string | undefined> => {
  if (!window.ethereum) {
    console.error("MetaMask가 설치되어 있지 않습니다.");
    return;
  }

  try {
    // Ethers provider 생성
    const provider = new ethers.BrowserProvider(window.ethereum);

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const decimalChainId = Number(chainId);

    alert(decimalChainId);

    // ERC-20 컨트랙트 인스턴스 생성
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider
    );

    // 잔고 및 소수점 조회
    const [rawBalance, decimals]: [bigint, number] = await Promise.all([
      tokenContract.balanceOf(userAddress),
      tokenContract.decimals(),
    ]);

    // 사람이 읽을 수 있는 형식으로 변환
    const formattedBalance = ethers.formatUnits(rawBalance, decimals);
    console.log(`잔고: ${formattedBalance}`);
    return formattedBalance;
  } catch (error) {
    console.error("잔고 조회 실패:", error);
  }
};

export const switchNetwork = async (chainId: number) => {
  try {
    alert("switchNetwork called");

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }], // '0x89' is the hexadecimal chain ID for Polygon Mainnet
      // '0x13882' is the hexadecimal chain ID for Amoy Testnet
    });

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const decimalChainId = Number(chainId);
    alert(decimalChainId);
  } catch (e) {
    // Handle error or prompt to add the network if not installed
    console.log(e);
  }
};
