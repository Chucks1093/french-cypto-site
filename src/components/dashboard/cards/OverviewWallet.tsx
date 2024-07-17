import ConnectButton from "@/components/ui/connectButton";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import { cn } from "@/lib/utils";
import { useState } from "react";

type CyptoCurrencies = "bnb" | "solana" | "ethereum";
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
	value: number | string;
	disabled?: boolean;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleUnitChange?: (value: string)=> void;
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
			<Select
				onValueChange={(value) =>
					props.handleUnitChange?.(value as CyptoCurrencies)
				}
				disabled={props.disabled}
			>
				<SelectTrigger className="w-fit rounded-xl border border-gray-300">
					<SelectValue placeholder={props.currency} />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectGroup>
						<SelectItem value="bnb">BNB</SelectItem>
						<SelectItem value="ethereum">Ethereum</SelectItem>
						<SelectItem value="solana">Solana</SelectItem>
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
	const [convertedInput, setConvertInput] = useState<string | number>(0);
	const [currentUnit, setCurrentUnit] = useState<CyptoCurrencies>("bnb");
	const { rate } = useCurrentWallet();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = Number(e.currentTarget.value)
		setUserInput(inputValue);
		if (currentUnit == "bnb") {
			const result = rate?.binancecoin.usd! * inputValue;
			setConvertInput(result.toFixed(2))
		}
		if(currentUnit == "ethereum") {
			const result = rate?.ethereum.usd! * inputValue;
			setConvertInput(result.toFixed(2))
		}
		if(currentUnit == "solana") {
			const result = rate?.bitcoin.usd! * inputValue;
			setConvertInput(result.toFixed(2))
		}
		
	};

	const handleConversion = (value: string)=> {
		console.log(value)
		setCurrentUnit(value as CyptoCurrencies)
		if (value == "bnb") {
			const result = rate?.binancecoin.usd! * userInput;
			setConvertInput(result.toFixed(2))
		}
		if(value == "ethereum") {
			const result = rate?.ethereum.usd! * userInput;
			setConvertInput(result.toFixed(2))
		}
		if(value == "solana") {
			const result = rate?.bitcoin.usd! * userInput;
			setConvertInput(result.toFixed(2))
		}
	}



	return (
		<div className=" border border-[#e6e6e6] p-5 rounded-xl ">
			<h1 className="pb-4 border-b border-b-gray-400 text-xl font-semibold">
				Your Wallet
			</h1>
			<div className="flex gap-3 mt-4 mb-4 overflow-x-auto">
				<button className="rounded-3xl text-sm px-4 text-gray-600 py-[.4rem] border border-gray-300 opacity-60">
					Buy
				</button>
				<button className="rounded-3xl text-sm px-4 text-gray-600 py-[.4rem] border border-gray-300 opacity-60">
					Sell
				</button>
				<button className="rounded-3xl text-sm px-4 bg-app-primary text-white font-bold py-[.4rem] border-gray-300">
					Exchange
				</button>
			</div>
			<div>
				<SelectCoin className="mt-7" />
				<div className="relative">
					<SelectCurrency
						handleUnitChange={handleConversion}
						handleChange={handleInputChange}
						currency="BNB"
						value={userInput}
					/>
					<span className="flex justify-center items-center absolute shadow-lg bg-white rounded-full w-12 h-12 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2	cursor-pointer active:bg-slate-100">
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
