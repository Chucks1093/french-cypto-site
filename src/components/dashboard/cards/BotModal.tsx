import { SetStateAction, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarInput } from "@/components/ui/calendar-input";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import usePost from "@/hooks/usePost";
import Loader from "@/components/loader/circle-loader/Loader";
import { useMoralis } from "react-moralis";
import {
	removeMillisecondsFromISOString,
} from "@/utils/utils";
import useTradeGrids from "@/hooks/useTradeGrid";
import useAppHistory from "@/hooks/useAppHistory";

type SelectDemoType = {
	handleChange: (value: string) => void;
};
function SelectDemo(props: SelectDemoType) {
	return (
		<Select
			onValueChange={(value) => props.handleChange(value)}
			defaultValue="BTC/USD"
		>
			<SelectTrigger className="w-[130px] bg-white rounded-md border border-gray-200">
				<SelectValue className="text-gray-600" />
			</SelectTrigger>
			<SelectContent
				className="z-[60] bg-white rounded-md"
				position="popper"
			>
				<SelectItem value="BTC/USD">BTC/USD</SelectItem>
				<SelectItem value="ETH/USD">ETH/USD</SelectItem>
				<SelectItem value="BNB/USD">BNB/USD</SelectItem>
			</SelectContent>
		</Select>
	);
}
type BotModalProps = {
	setDisplay: React.Dispatch<SetStateAction<boolean>>;
};
function BotModal(props: BotModalProps) {
	const { account } = useMoralis();
	const { userWallet } = useCurrentWallet();
	const { postData, loading } = usePost();
	const [botDetails, setBotDetails] = useState({
		lower_price: 0,
		upper_price: 0,
		grid_intervals: 0,
		investment_amount: 0,
		wallet_address: account,
		roi: 0,
		pnl: 0,
		runtime: "",
		symbol: "BTC/USD",
	});
	const { addTradeGrids, resetMarketPlace } = useTradeGrids();
	const { addTradeHistory } = useAppHistory();
	const handleSymbolChange = (value: string) => {
		console.log(value);
		setBotDetails({
			...botDetails,
			symbol: value,
		});
	};
	const handleDateChange = (value: Date) => {
		setBotDetails({
			...botDetails,
			runtime: value.toISOString(),
		});
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setBotDetails({
			...botDetails,
			[name]: value,
		});
	};
	// 	{
	// 		"msg": "Grid trading started successfully",
	// 		"trades": [
	// 			 {
	// 				  "amount": 0.6,
	// 				  "price": 10,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.6,
	// 				  "price": 10.1,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.48,
	// 				  "price": 12.5,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.48,
	// 				  "price": 12.625,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.4,
	// 				  "price": 15,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.4,
	// 				  "price": 15.15,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.34285714285714286,
	// 				  "price": 17.5,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.34285714285714286,
	// 				  "price": 17.675,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.3,
	// 				  "price": 20,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.3,
	// 				  "price": 20.2,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.0017354583056142076,
	// 				  "price": 3457.3,
	// 				  "side": "buy",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 },
	// 			 {
	// 				  "amount": 0.0017354583056142076,
	// 				  "price": 3491.873,
	// 				  "side": "sell",
	// 				  "symbol": "ETH/USD",
	// 				  "timestamp": 1721173405,
	// 				  "type": "limit",
	// 				  "user_id": 1
	// 			 }
	// 		]
	//   }
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await postData(
				"/spot-grid",
				JSON.stringify({
					...botDetails,
					lower_price: Number(botDetails.lower_price),
					upper_price: Number(botDetails.upper_price),
					grid_intervals: Number(botDetails.grid_intervals),
					investment_amount: Number(botDetails.investment_amount),
				})
			);
			addTradeGrids(data.trades)
			addTradeHistory(data.trades);
			resetMarketPlace()


			console.log("grid", data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Fragment>
			<div
				className="z-50 fixed h-full w-full left-0 top-0 bg-slate-700 opacity-70"
				onClick={() => props.setDisplay(false)}
			/>
			<form
				onSubmit={handleSubmit}
				className="w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] rounded-xl shadow-xl p-6 bg-stone-50"
			>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-[1.4rem] font-semibold text-neutral-600">
						Create Spot Grid
					</h1>
					<span
						onClick={() => props.setDisplay(false)}
						className="flex justify-center items-center p-1 w-8 h-8 rounded-full bg-gray-300"
					>
						<img
							className="w-full invert"
							src="/icons/cancel.svg"
							alt=""
						/>
					</span>
				</div>
				<SelectDemo handleChange={handleSymbolChange} />
				<div className="mt-3">
					<label className="text-gray-800 mb-4 block" htmlFor="">
						1. Price Range
					</label>
					<div className="flex justify-between items-center gap-3">
						<input
							className="border border-gray-200 rounded-xl h-10 block w-full indent-3"
							type="number"
							id=""
							placeholder="0.008328"
							name="lower_price"
							value={botDetails.lower_price}
							onChange={handleChange}
						/>
						<span className="text-gray-700">to</span>
						<input
							className="border border-gray-200 rounded-xl h-10 block w-full indent-3"
							type="number"
							name="upper_price"
							id=""
							placeholder="0.00903"
							value={botDetails.upper_price}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="mt-6">
					<label className="text-gray-800 mb-4 block" htmlFor="">
						2. Number of Grids
					</label>
					<input
						className="border border-gray-200 rounded-xl h-10 block w-full indent-3"
						type="number"
						name="grid_intervals"
						id=""
						placeholder="10"
						value={botDetails.grid_intervals}
						onChange={handleChange}
					/>
					<div className="flex justify-between items-center text-sm mt-3 text-gray-400">
						<p>Profit/grid (fees deducted)</p>
						<p>0.10% - 0.11%</p>
					</div>
				</div>
				<div className="mt-6">
					<label className="text-gray-800 mb-4 block" htmlFor="">
						3. Investments
					</label>
					<input
						className="border border-gray-200 rounded-xl h-10 block w-full indent-3"
						type="number"
						name="investment_amount"
						id=""
						value={botDetails.investment_amount}
						onChange={handleChange}
					/>
					<p className="text-sm mt-3 text-gray-400">
						Avbl: {`$${userWallet?.depositBalance}`}
					</p>
				</div>
				<div className="mt-3">
					<CalendarInput handleChange={handleDateChange} />
				</div>
				<button className="bg-app-primary w-full h-12 rounded-2xl mt-3 text-white text-semibold flex justify-center items-center ">
					{loading ? <Loader /> : "Create"}
				</button>
			</form>
		</Fragment>
	);
}
export default BotModal;
