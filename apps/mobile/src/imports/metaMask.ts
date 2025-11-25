
import { ethers} from "ethers";
import axios from 'axios';
import moment from 'moment';
import { USDC_CONTRACT_ADDRESS } from "../constants/wallet";

class MetaMaskWallet {
  provider: ethers.BrowserProvider | null = null;
  account: string = "";
  balance: number = 0;
  constructor() {
    if ((window as any).ethereum) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
        }
    }

  async initialize(chainId: number): Promise<void> {
    if (!this.provider) {
      throw new Error("MetaMask is not installed");
    }
    const accounts = await this.provider.send("eth_requestAccounts", []);

    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }
    this.account = accounts[0];
    // alert(chainId)

    try {
      await this.provider.send("wallet_switchEthereumChain", [{ chainId: ethers.toQuantity(chainId) }]);
    } catch (switchError: any) {
      alert(JSON.stringify(switchError));
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        throw new Error("Please add the network to MetaMask");
      } else {
        throw switchError;
      }
    }
    //await this.provider.send("wallet_switchEthereumChain", [{ chainId: ethers.toQuantity(chainId) }]);

    try {
        this.balance = Number(await this.getERC20Balance(USDC_CONTRACT_ADDRESS, this.account));
    } catch (error) {
        console.error("Failed to fetch USDC balance:", error);
        this.balance = 0;
    }
  }



  async getAccounts(): Promise<string[]> {
    if (!this.provider) {
      throw new Error("MetaMask is not installed");
    }
    const accounts = await this.provider.send("eth_requestAccounts", []);
    return accounts;
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (!this.provider) {
      throw new Error("MetaMask is not installed");
    }
    await this.provider.send("wallet_switchEthereumChain", [{ chainId: ethers.toQuantity(chainId) }]);
  }

  async getERC20Balance(contractAddress: string, account: string): Promise<string> {
    if (!this.provider) {
      throw new Error("MetaMask is not installed");
    }
    // const erc20Abi = [
    //   "function balanceOf(address owner) view returns (uint256)"
    // ];
    const erc20Abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
    ];
    const contract = new ethers.Contract(contractAddress, erc20Abi, this.provider);

    // 잔고 및 소수점 조회
    const [rawBalance, decimals]: [bigint, number] = await Promise.all([
      contract.balanceOf(account),
      contract.decimals(),
    ]);
    // const balance: bigint = await contract.balanceOf(account);
    // return ethers.formatUnits(balance, 6); // USDC는 6자리 소수점
    // 사람이 읽을 수 있는 형식으로 변환
    const formattedBalance = ethers.formatUnits(rawBalance, decimals);
    return formattedBalance;
    
  }

  /**
   * ERC20 토큰을 다른 주소로 전송합니다.
   * @param tokenAddress 전송할 ERC20 토큰의 컨트랙트 주소
   * @param toAddress 토큰을 받을 주소
   * @param amount 전송할 토큰의 양 (문자열 형태)
   * @returns 트랜잭션 ID (txid)
   */
  async sendErc20Token(tokenAddress: string, toAddress: string, amount: string): Promise<string> {
    if (!this.provider) {
      throw new Error("MetaMask is not installed");
    }
    const signer = await this.provider.getSigner();
    const erc20Abi = ["function decimals() view returns (uint8)", "function transfer(address to, uint256 amount) returns (bool)"];
    const contract = new ethers.Contract(tokenAddress, erc20Abi, signer);
    const decimals = await contract.decimals();
    const amountToSend = ethers.parseUnits(amount, decimals);
    const tx = await contract.transfer(toAddress, amountToSend);
    return tx.hash;
  }

}


export const metaMaskWallet = new MetaMaskWallet();
