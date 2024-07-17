import { SelectCoin } from "@/components/dashboard/cards/OverviewWallet";
import RecentDeposits from "@/components/dashboard/tables/RecentDeposits";
import { Button } from "@/components/ui/button";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import contractABI from "@/utils/contractABI";
import Web3 from "web3";
import { contractAddress } from "@/utils/constants";
import showToast from "@/utils/showToast";
import { copyTextToClipboard } from "@/utils/utils";
import Cookies from "js-cookie";

function DepositPage() {
	const { account, Moralis } = useMoralis();
	const { userWallet, setUserWallet } = useCurrentWallet();
	const [depositAmount, setDepositAmount] = useState(0);
	const web3 = new Web3(Moralis.provider as string);
	const contract = new web3.eth.Contract(contractABI, contractAddress);

	const handleDeposit = async () => {
		const token = Cookies.get("french-token"); // Assuming JWT is stored in localStorage
		const currentDateTime = new Date().toISOString(); // Get the current date and time
		const userAddress = account;
		showToast.loading("Making Deposit")

		try {
			const transaction = await contract.methods.deposit().send({
				from: account!,
				value: web3.utils.toWei(depositAmount, "ether"),
			});
			

			// Fetch the transaction receipt to get the transaction hash and fee
			const receipt = await web3.eth.getTransactionReceipt(
				transaction.transactionHash
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
						amount: depositAmount,
						status: "Successful",
						contractAddress,
						transactionHash,
						wallet_address: userAddress,
					}),
				}
			);

			console.log(response)
			
			if (response.ok) {
				showToast.success(`Deposited ${depositAmount} BNB`)
				console.log("Transaction data saved successfully");
			} else {
				showToast.error("Failed to save transaction data");
			}

			fetchUserBalance(); // Update balance after deposit
		} catch (error:any) {
			console.error("Error depositing BNB:", error);

			// Save transaction data to the backend as failed
			showToast.loading("Saving Transaction")
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
						amount: depositAmount.toFixed(2),
						status: "Failed",
						transactionHash: error?.transactionHash || "N/A",
						contractAddress,
						walletAddress: userAddress,
					}),
				}
			);

			if (response.ok) {
				showToast.success("Failed transaction data saved successfully")
				console.log("Failed transaction data saved successfully");
			} else {
				showToast.error("Failed to save failed transaction data");
				console.error("Failed to save failed transaction data");
			}
		}
	};

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
			showToast.error("Error fetching user balance")
			console.error("Error fetching user balance:", error);
		}
	};
	return (
		<div className="deposit__page p-8">
			<div>
				<h1 className="flex gap-2 items-center text-lg mb-4">
					Deposits
					<img src="/icons/information.svg" alt="" />
				</h1>
				<div className="flex gap-3 mt-4 mb-4">
					<Button
						className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] h-fit"
						variant="outline"
					>
						Buy
					</Button>
					<Button
						className="rounded-3xl text-sm px-6 bg-app-primary text-white font-bold py-[.4rem] h-fit"
						variant="outline"
					>
						Exchange
					</Button>
				</div>
				<p className="mt-6 text-gray-600 text-sm">Coin:</p>
				<SelectCoin className="mt-3 border  border-gray-300 px-4 py-4 rounded-xl bg-white" />

				<p className="text-gray-400 mt-6 mb-6">
					Available Balance:{" "}
					{`$${userWallet?.depositBalance || (0.0).toFixed(2)}`}
				</p>

				<div className="flex justify-between items-center border  border-gray-300 bg-white h-12 rounded-xl overflow-hidden">
					<input
						onChange={(e) =>
							setDepositAmount(Number(e.currentTarget.value))
						}
						placeholder="Input Deposit amount"
						type="number"
						className=" w-full indent-4 h-full focus:outline-none"
					/>
					<button
						onClick={handleDeposit}
						className=" bg-app-primary h-full flex justify-center items-center text-white px-7 gap-3 text-sm"
					>
						Deposit{" "}
						<img className="invert" src="/icons/deposit.svg" alt="" />
					</button>
				</div>

				<p className="text-sm text-gray-800 mt-12">Address</p>
				<div className="flex justify-between items-center bg-white order-gray-300 px-4 py-4 rounded-xl border  border-gray-30 mt-3">
					<p className="font-bold text-sm text-gray-600 ">
						{contractAddress}
					</p>
					<button
						className="bg-app-primary flex items-center justify-center font-semibold gap-2 text-white px-4 py-1 rounded-2xl"
						onClick={() => copyTextToClipboard(contractAddress)}
					>
						copy <img src="/icons/copy.svg" alt="" />
					</button>
				</div>

				<div>
					<h2 className="text-gray-700 mt-7 mb-6 font-semibold">Tips</h2>
					<div className="tips">
						<p className="text-sm">1.</p>
						<p className="text-sm">
							{" "}
							Always ensure you copy and paste the exact wallet address
							and verify the first and last few characters. Ensure you're
							using the correct blockchain network (e.g., Bitcoin on the
							Bitcoin network).
						</p>
						<p className="text-sm">2.</p>
						<p className="text-sm">
							{" "}
							Before confirming the deposit, double-check all transaction
							details including the amount and wallet address. Be aware
							of transaction fees and how they vary based on network
							congestion.
						</p>
						<p className="text-sm">3.</p>
						<p className="text-sm">
							{" "}
							Use a secure and reputable wallet, enable two-factor
							authentication (2FA) for added security, and save the
							transaction ID to track the status of your transaction.
						</p>
						<p className="text-sm">4.</p>
						<p className="text-sm">
							{" "}
							Adhere to any specific deposit instructions provided by the
							platform and ensure your deposit meets any minimum
							requirements. Be cautious of scams and always use official
							channels.
						</p>
					</div>
				</div>
			</div>
			<div className="px-8">
				<h1 className="pb-4 border-b border-b-gray-400 text-xl">
					Deposit Network
				</h1>
				<div className="flex gap-3 mt-4 mb-4 ">
					<Button
						className="rounded-3xl text-sm px-6 bg-app-primary text-white font-bold py-[.4rem] h-fit"
						variant="outline"
					>
						SOL
					</Button>
					<Button
						className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] h-fit"
						variant="outline"
					>
						BEP2
					</Button>
					<Button
						className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] h-fit"
						variant="outline"
					>
						BEP 20 (BSC)
					</Button>
				</div>
				<div className="flex gap-2 items-center">
					<img className="w-6" src="/icons/time.svg" alt="" />
					<p className="text-gray-400 text-sm">Average Arrival Time: </p>
					<p className="text-sm text-semibold">2 Minutes</p>
				</div>
				<div className="relative mt-4  h-[15rem] flex justify-center">
					<img className=" h-full" src="/icons/barcode.svg" alt="" />
					<img
						className="absolute w-[5.3em] h-[5.3rem] p-[.2rem] bg-white rounded-full border-white top-1/2 -translate-y-1/2"
						src="/icons/bnb.svg"
						alt=""
					/>
				</div>
				<div className="mt-10">
					<h1 className="pb-4 border-b border-b-gray-400 text-xl flex justify-between items-center">
						Recent Deposits
						<Button
							className="rounded-3xl text-sm px-6 bg-app-primary text-white font-bold py-[.4rem] h-fit"
							variant="outline"
						>
							View more
						</Button>
					</h1>
					<RecentDeposits />
				</div>
			</div>
		</div>
	);
}
export default DepositPage;
