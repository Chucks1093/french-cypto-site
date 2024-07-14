import ConnectButton from "@/components/ui/connectButton";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SelectCoinProps = {
	className?: string | undefined;
};

export function SelectCoin(props: SelectCoinProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 justify-between bg-white px-3 py-3  border border-[#e6e6e6] rounded-2xl",
				props.className
			)}
		>
			<img className="block w-10" src="/icons/bnb.svg" alt="" />
			<div className="mr-auto ">
				<p className="text-sm text-gray-500">Bnb Price</p>
				<p className="text-[.9rem]">BNB</p>
			</div>

			<Select>
				<SelectTrigger className="w-6 h-6 rounded-full p-0 flex justify-center items-center border border-gray-600">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent className="bg-whit3e">
					<SelectGroup>
						<SelectItem value="bnb">BNB</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

type SelectCurrencyProps = {
	currency: string;
	value: number;
	disabled?: boolean;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SelectCurrency(props: SelectCurrencyProps) {
	return (
		<div className="flex justify-between items-center mt-6 bg-white px-3 py-3  border border-[#e6e6e6] rounded-2xl">
			<div>
				<p className="text-sm text-gray-500 mb-3">Amount</p>
				<h2 className="flex items-center">
					<input
						onChange={props.handleChange}
						disabled={props.disabled}
						value={props.value}
						type="number"
						className="w-[9rem] border border-gray-200 focus:outline-none disabled:bg-gray-100 text-sm indent-2 disabled:text-gray-500"
					/>
				</h2>
			</div>
			<Select>
				<SelectTrigger className="w-fit rounded-xl border border-gray-300">
					<SelectValue placeholder={props.currency} />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectGroup>
						<SelectItem value="usd">USD</SelectItem>
						<SelectItem value="bnb">BNB</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

function OverviewWallet() {
	// type ActiveButton = "exchange" | "buy" | "sell";
	// const [activeButton, setActiveButton] = useState<ActiveButton>("exchange");
	const [userInput, setUserInput] = useState(0);
	const [convertedInput, _] = useState(0);



	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(Number(e.currentTarget.value));
	};

	const convertCurrency = async () => {
		try {

		}catch(error) {
			console.log()
		}
	};

	return (
		<div className=" border border-[#e6e6e6] p-5 rounded-xl ">
			<h1 className="pb-4 border-b border-b-gray-400 text-xl font-semibold">
				Your Wallet
			</h1>
			<div className="flex gap-3 mt-4 mb-4">
				<button className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] border border-app-primary opacity-60">
					Buy
				</button>
				<button className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] border border-app-primary opacity-60">
					Sell
				</button>
				<button className="rounded-3xl text-sm px-6 bg-app-primary text-white font-bold py-[.4rem] border border-[">
					Exchange
				</button>
			</div>
			<div>
				<SelectCoin className="mt-7" />
				<div className="relative">
					<SelectCurrency handleChange={handleInputChange} currency="BNB" value={userInput} />
					<span
						onClick={convertCurrency}
						className="flex justify-center items-center absolute shadow-lg bg-white rounded-full w-12 h-12 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2	cursor-pointer active:bg-slate-100"
					>
						<img src="/icons/exchange.svg" alt="" />
					</span>
					<SelectCurrency
						currency="USD"
						value={convertedInput}
						disabled={true}

					/>
				</div>
				<ConnectButton />
				
			</div>
		</div>
	);
}
export default OverviewWallet;
