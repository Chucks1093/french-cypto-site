import React, { useState } from 'react';
import Web3 from 'web3';
// import Web3Modal from 'web3modal';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import { useMoralis } from 'react-moralis';
import showToast from '@/utils/showToast';
import Cookies from 'js-cookie';
import { contractAddress } from '@/utils/constants';
import { WalletInfo } from '@/hooks/useCurrentWallet';

type ComponentProps = {
  handleClick: (value: string) => void;
}

const USDTDeposit: React.FC<ComponentProps> = (props) => {
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
    const token = Cookies.get("french-token"); // Assuming JWT is stored in localStorage
    const currentDateTime = new Date().toISOString(); // Get the current date and time
    const userAddress = account;
    showToast.loading("Making Deposit")
    if (!web3 || !account) {
      setStatus('Please connect your wallet first.');
      showToast.error('Please connect your wallet first.')
      return;
    }

    

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtAddress);
    const amountInWei: string = web3.utils.toWei(amount, 'ether');

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

      // Fetch the transaction receipt to get the transaction hash and fee
      const receipt = await web3.eth.getTransactionReceipt(
        result.transactionHash
      );
      const transactionHash = receipt.transactionHash;

      

      // Save transaction data to the backend as successful
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: currentDateTime,
            amount_usd: amount,
            status: "Successful",
            contractAddress,
            transactionHash,
            wallet_address: userAddress,
          }),
        }
      );

      console.log(response)


      if (response.ok) {
        showToast.success(`Deposited ${amount} USDT`)
        console.log("Transaction data saved successfully");
      } else {
        showToast.error("Failed to save transaction data");
      }
			const usdtResult = await response.json() as WalletInfo;

      setStatus(`Deposit successful. Transaction hash: ${result.transactionHash}`);
      showToast.success("Success")
      props.handleClick(usdtResult.paper_balance);
    } catch (error: any) {
      console.error('Error during deposit:', error);
      console.log(error.message?.status)
      showToast.error("Error during deposit")
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