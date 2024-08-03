import React, { useState } from 'react';
import Web3 from 'web3';
// import Web3Modal from 'web3modal';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import { useMoralis } from 'react-moralis';
import showToast from '@/utils/showToast';

const USDTDeposit: React.FC = () => {
  // const [, setWeb3] = useState<Web3 | null>(null);
  const { account } = useMoralis()
  const [amount, setAmount] = useState<string>('');
  const [_, setStatus] = useState<string>('');
  const { Moralis } = useMoralis();
	const web3 = new Web3(Moralis.provider as string);


  const usdtAddress: string = '0x55d398326f99059fF775485246999027B3197955'; // BEP20 USDT address
  const yourDepositAddress: string = '0xDAA13DCaCe15C543663ccA4a1187152c27ee5744'; // Replace with your actual deposit address;






  const usdtAbi: any[] = [
    {
      "constant": false,
      "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
      "name": "transfer",
      "outputs": [{ "name": "", "type": "bool" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "type": "function"
    }
  ];



  const depositUSDT = async (): Promise<void> => {
    if (!web3 || !account) {
      setStatus('Please connect your wallet first.');
      showToast.error('Please connect your wallet first.')
      return;
    }

    console.log()

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtAddress);
    const amountInWei: string =  web3.utils.toWei(amount, 'ether');

    // Set fixed gas price (in Gwei) and gas limit
    const gasPrice: string = web3.utils.toWei('5', 'gwei'); // 5 Gwei
    const gasLimit: number = 100000; // Fixed gas limit

    try {
      setStatus('Initiating deposit...');
      const result = await usdtContract.methods.transfer(yourDepositAddress, amountInWei).send({
        from: account,
        gas: String(gasLimit),
        gasPrice: gasPrice
      });

      setStatus(`Deposit successful. Transaction hash: ${result.transactionHash}`);
      showToast.success("Success")
    } catch (error: any) {
      console.error('Error during deposit:', error);
      setStatus(`Error during deposit: ${error.message}`);
    }
  };

  


  // const checkBalance = async (): Promise<void> => {
  //   if (!account) {
  //     setStatus('Please connect your wallet first.');
  //     return;
  //   }

  //   const usdtContract = new web3!.eth.Contract(usdtAbi, usdtAddress);
  //   try {
  //     const balance: string = await usdtContract.methods.balanceOf(account).call();
  //     const balanceInEther: string = web3!.utils.fromWei(balance, 'ether');
  //     setStatus(`Your USDT balance: ${balanceInEther} USDT`);
  //   } catch (error: any) {
  //     console.error('Error checking balance:', error);
  //     setStatus(`Error checking balance: ${error.message}`);
  //   }
  // };

  return (
    <div className="flex justify-between items-center border  border-gray-300 bg-white h-12 rounded-xl overflow-hidden">
      <input
        type="text"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
        placeholder="Enter USDT amount"
        className=" w-full indent-4 h-full focus:outline-none"
      />
      <button
        onClick={depositUSDT}
        className=" bg-app-primary h-full flex justify-center items-center text-white px-7 gap-3 text-sm"
      >
        Deposit USDT  {" "}
        <img className="invert" src="/icons/deposit.svg" alt="" />
      </button>
    </div>

  );
};

export default USDTDeposit;