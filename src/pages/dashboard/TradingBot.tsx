import BotCard from "@/components/dashboard/cards/BotCard";
import BotModal from "@/components/dashboard/cards/BotModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function TradingBot() {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="px-8 pt-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="flex gap-2 items-center text-lg">
					My Bots
					<img src="/icons/information.svg" alt="" />
				</h1>

				<button className="bg-app-primary text-sm font-semibold px-4 py-2 text-white rounded-xl block">
					New Spot Grid
				</button>
			</div>
			<div className="bot__container">
				<BotCard />
				<BotCard />
				<BotCard />
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
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
				<BotCard />
			</div>
			{showModal && <BotModal setDisplay={setShowModal}/>}
		</div>
	);
}
export default TradingBot;
