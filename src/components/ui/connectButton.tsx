import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Web3 from "web3";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import contractABI from "@/utils/contractABI";
import { contractAddress } from "@/utils/constants";

export default function ConnectButton() {
	const {
		enableWeb3,
		account,
		isWeb3Enabled,
		Moralis,
		deactivateWeb3,
		chainId,
	} = useMoralis();

	const [_, setShowMessage] = useState(false);
	// const [preferredChainId, setPreferredChainId] = useState("0x57");
	const [isConnecting, setIsConnecting] = useState(false);
	// const [depositAmount, setDepositAmount] = useState("");
	// const [userBalance, setUserBalance] = useState<string | number>(0);
	const { setUserWallet } = useCurrentWallet();


	

	const web3 = new Web3(Moralis.provider as string);
	const contract = new web3.eth.Contract(contractABI, contractAddress);

	const handleConnectClick = async () => {
		setIsConnecting(true);
		await enableWeb3();
		window.localStorage.setItem("connected", "injected");
		setIsConnecting(false);
	};

	useEffect(() => {
		Moralis.onAccountChanged((account) => {
			console.log(`Account changed to ${account}`);
			if (account == null) {
				window.localStorage.removeItem("connected");
				deactivateWeb3();
				console.log("Null account found");
			}
		});

		console.log("Connected chainId:", chainId);
		if (account && chainId) {
			const timer = setTimeout(() => {
				setShowMessage(true);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [chainId, account]);

	// const switchToPreferredNetwork = async () => {
	// 	try {
	// 		if (!window.ethereum) {
	// 			showToast.error(
	// 				"No ethereum object found. Please install MetaMask."
	// 			);
	// 		}
	// 		if (chainId !== preferredChainId) {
	// 			await window?.ethereum.request({
	// 				method: "wallet_addEthereumChain",
	// 				params: [
	// 					{
	// 						chainId: "0x61",
	// 						chainName: "Binance Smart Chain Testnet",
	// 						nativeCurrency: {
	// 							name: "BNB",
	// 							symbol: "tBNB",
	// 							decimals: 18,
	// 						},
	// 						rpcUrls: [
	// 							"https://data-seed-prebsc-1-s1.binance.org:8545",
	// 						],
	// 						blockExplorerUrls: ["https://testnet.bscscan.com"],
	// 					},
	// 				],
	// 			});
	// 			await Moralis.switchNetwork("0x61");
	// 			console.log(`Switched to preferred network`);
	// 		} else {
	// 			console.log("Already connected to the preferred network");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error switching network:", error);
	// 	}
	// };



	const fetchUserBalance = async () => {
		try {
			const balance = (await contract.methods
				.getUserDepositBalance()
				.call({ from: account! })) as number;
			setUserWallet({ address: account! });
			setUserWallet({
				bnbBalance: web3?.utils?.fromWei(balance, "ether"),
			});
		} catch (error) {
			console.error("Error fetching user balance:", error);
		}
	};

	useEffect(() => {
		if (account) {
			fetchUserBalance();
		}
	}, [account]);

	return (
		<div>
			{!account && (
				<div>
					<button
               className="bg-app-primary text-white font-semibold w-full mt-4 rounded-3xl text-sm py-3"
						onClick={handleConnectClick}
						disabled={isWeb3Enabled || isConnecting}
					>
						{isConnecting ? "Connecting..." : "Connect"}
					</button>
				</div>
			)}

			{account && (
				<div className="text-center text-gray-400 text-sm mt-5">
					Connected to {account?.slice(0, 6)}...
					{account?.slice(account?.length - 4)}
					{/* <div>
						<input
							type="text"
							value={depositAmount}
							onChange={(e) => setDepositAmount(e.target.value)}
							placeholder="Amount in BNB"
						/>
						<button onClick={handleDeposit}>Deposit BNB</button>
					</div>
					<div>Your Deposit Balance: {userBalance} BNB</div> */}
				</div>
			)}
{/* 
			{showMessage &&
				(chainId === "0x61" ? (
					<div>
						<h1>Hello World</h1>
					</div>
				) : (
					<button onClick={switchToPreferredNetwork}>
						Switch Network
					</button>
				))} */}
		</div>
	);
}
