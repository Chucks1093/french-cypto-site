import useAppHistory from "@/hooks/useAppHistory";
import BotCard from "./BotCard";

function OverviewTradeBot() {
	const { tradeHistory } = useAppHistory();
	return (
		<div className="mt-8  border border-[#e6e6e6] p-5 rounded-xl ">
			<h1 className="pb-4 border-b border-b-gray-400 text-xl">
				Trading Bot
			</h1>
			<div className="flex gap-3 mt-4 mb-4">
				<button className="rounded-3xl text-[.75rem] px-4 text-gray-600 py-[.4rem] border border-gray-300 opacity-60">
					Top Roi
				</button>
				<button className="rounded-3xl text-[.75rem] px-4 text-gray-600 py-[.4rem] border border-gray-300 opacity-60">
					Top Pnl
				</button>
				<button className="rounded-3xl text-[.75rem] px-4 bg-app-primary text-white font-bold py-[.4rem] border-gray-300">
					Top Copied
				</button>
			</div>
			<div className="flex flex-col gap-6">
				{tradeHistory?.map((grid, index) => index <3 && (
					<BotCard {...grid} key={index} cardType="grid" />
				))}

			</div>
			{tradeHistory?.length == 0 && (
				<div className="mt-4 flex flex-col gap-3">
					<div className="mt-8">
						<img
							className="w-10 mx-auto"
							src="/icons/empty-tray.svg"
							alt=""
						/>
						<p className="text-gray-600 text-[.74rem] text-center mt-2">
							No Recent Trade
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
export default OverviewTradeBot;
