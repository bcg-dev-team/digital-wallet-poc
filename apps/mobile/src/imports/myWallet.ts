import { ethers, Wallet, JsonRpcProvider, Contract, TransactionResponse } from "ethers";

// Polygon Amoy 테스트넷 정보
const AMOY_RPC_URL = "https://rpc-amoy.polygon.technology/";
const PULSE_RPC_URL = "https://rpc.pulsechain.com/";

// 잔액조회, 소수점, 전송을 위한 표준 ERC20 ABI
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
];

export const USDC_CONTRACT_ADDRESS = "0xf178317C8353C8Fef671dB4531e11e57b9Ea0a71";  // mock usdc 주소
export const DT_CONTRACT_ADDRESS = "0xf178317C8353C8Fef671dB4531e11e57b9Ea0a71";  // pulse dt 주소

const PRIVATE_KEY = "0x47c496fe62e38aebcf4c5298cdae6889efed27b308fb473311d4a209e512f20e";



export class MyWallet {
  private wallet: Wallet;
  private provider: JsonRpcProvider;

  /**
   * @param privateKey 지갑을 생성하기 위한 개인키
   */
  constructor(privateKey: string) {
    // Polygon Amoy 네트워크에 연결하기 위한 프로바이더를 생성합니다.
    this.provider = new ethers.JsonRpcProvider(AMOY_RPC_URL);
    // 개인키와 프로바이더를 사용하여 지갑 인스턴스를 생성합니다.
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  /**
   * 새로운 개인키를 생성하여 반환합니다.
   * @returns {string} 새로운 개인키
   */
  static getNewPrivateKey(): string {
    const newWallet = ethers.Wallet.createRandom();
    return newWallet.privateKey;
  }

  /**
   * 지갑 주소를 반환합니다.
   */
  getAddress(): string {
    return this.wallet.address;
  }
  
  /**
   * 특정 ERC20 토큰의 잔액을 조회합니다.
   * @param tokenAddress 조회할 ERC20 토큰의 컨트랙트 주소
   * @returns 토큰 잔액 (string)
   */
  async getERC20Balance(tokenAddress: string): Promise<string> {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
    const [rawBalance, decimals]: [bigint, number] = await Promise.all([
        contract.balanceOf(this.wallet.address),
        contract.decimals(),
    ]);
    // 사람이 읽을 수 있는 형식으로 변환합니다.
    return ethers.formatUnits(rawBalance, decimals);
  }

  /**
   * ERC20 토큰을 다른 주소로 전송합니다.
   * @param tokenAddress 전송할 ERC20 토큰의 컨트랙트 주소
   * @param toAddress 토큰을 받을 주소
   * @param amount 전송할 토큰의 양 (문자열 형태)
   */
  async sendERC20Token(tokenAddress: string, toAddress: string, amount: string): Promise<TransactionResponse> {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, this.wallet);
    const decimals = await contract.decimals();
    const amountToSend = ethers.parseUnits(amount, decimals);
    const tx = await contract.transfer(toAddress, amountToSend);
    return tx;
  }
}

export const myWallet = new MyWallet(PRIVATE_KEY);
