import BotCard from "@/components/dashboard/cards/BotCard";
import BotModal from "@/components/dashboard/cards/BotModal";
import { Button } from "@/components/ui/button";
import useAppHistory from "@/hooks/useAppHistory";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import useTradeGrids from "@/hooks/useTradeGrid";
import showToast from "@/utils/showToast";
import { isValidDate } from "@/utils/utils";
import { useEffect, useState } from "react";

function TradingBot() {
	const [showModal, setShowModal] = useState(false);
	const { setMarketPlace, marketPlace, fetchedMarketPlace } =
		useTradeGrids();
	const { tradeHistory, setTradeHistory, fetchedTradeHistory } =
		useAppHistory();
	const { fetchData } = useFetch();
	const { postData } = usePost();
	const {userWallet} = useCurrentWallet()

	const getUserGrids = async () => {
		if(!userWallet?.address) {
			showToast.error("Connect Wallet to Continue");
			throw new Error("Connect Walledt to continue")
		}
		try {
			const result = await postData("/trade_history", JSON.stringify({wallet_address: userWallet?.address}));
			console.log(result);
			setTradeHistory(result);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchMarketPlace = async () => {
		if(!userWallet?.address) {
			showToast.error("Connect Wallet to Continue");
			throw new Error("Connect Walledt to continue")
		}
		try {
			const result = await fetchData("/marketplace");
			console.log(result);
			setMarketPlace(result);
		} catch (error) {
			console.log(error)
		}
	};
	useEffect(() => {
		if (!fetchedMarketPlace) {
			fetchMarketPlace();
		}
		if (!fetchedTradeHistory) {
			getUserGrids();
		}
	}, []);

	return (
		<div className="px-8 pt-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="flex gap-2 items-center text-lg">
					My Bots
					<img src="/icons/information.svg" alt="" />
				</h1>

				<button
					onClick={() => setShowModal(!showModal)}
					className="bg-app-primary text-sm font-semibold px-4 py-2 text-white rounded-xl block"
				>
					New Spot Grid
				</button>
			</div>
			<div className="bot__container">
				{tradeHistory?.map((grid, index) => (
					<BotCard {...grid} key={index} cardType="grid" />
				))}
			</div>
			<h1 className="flex gap-2 items-center text-xl mb-4 mt-12">
				Bot Marketplace
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
					className="rounded-3xl text-sm px-6 text-gray-600 py-[.4rem] h-fit"
					variant="outline"
				>
					Sell
				</Button>
				<Button
					className="rounded-3xl text-sm px-6 bg-app-primary text-white font-bold py-[.4rem] h-fit"
					variant="outline"
				>
					Exchange
				</Button>
			</div>
			<div className="bot__container">
				{marketPlace?.map(
					(grid, index) =>
						isValidDate(grid.runtime) && (
							<BotCard
								roi={grid.roi}
								pnl={grid.pnl}
								timestamp={grid.runtime}
								symbol={grid.trading_pair}
								price={grid.min_investment}
								key={index}
								cardType="market"
							/>
						)
				)}
			</div>
			{showModal && <BotModal setDisplay={setShowModal} />}
		</div>
	);
}
export default TradingBot;
