import OverviewTable from "@/components/dashboard/tables/OverviewTable";
import { Separator } from "@/components/ui/separator";
import "./style.css";
// import { OverviewChart } from "@/components/chart/OverviewChart";
import OverviewWallet from "@/components/dashboard/cards/OverviewWallet";
import OverviewTradeBot from "@/components/dashboard/cards/OverviewTradeBot";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import { useMoralis } from "react-moralis";
import { OverviewChart } from "@/components/chart/OverviewChart";

function Overview() {
	const { userWallet, rate } = useCurrentWallet();
	const { account } = useMoralis();
	const truncatedAddress =` ${account?.slice(0, 6)}...${account?.slice(account?.length - 4)}`;
	
	return (
		<div className="overview__page pt-8 px-8">
			<div>
				<div className="overview__details flex rounded-xl text-white justify-between px-6 items-center">
					<div className="py-6">
						<p className="text-sm">Current balance</p>
						<div className="flex items-center gap-4">
							<h1 className="font-bold text-4xl mt-2">
								${userWallet?.depositBalance?.toFixed(2) || 0}
							</h1>
							<p className="text-[.7rem] bg-slate-700 px-3 py-2 rounded-3xl text-green-300">
								
								{account? truncatedAddress : "..."}
							</p>
						</div>
						<div className="flex items-center gap-12 mt-8 h-[4rem]">
							<div>
								<h2 className="flex gap-1 mb-2 text-sm items-center">
									<img src="/icons/bnb.svg" alt="" />
									BNB
								</h2>
								<h1 className="font-semibold text-lg">${rate?.binancecoin.usd}</h1>
							</div>
							<Separator
								className=" bg-gray-500"
								orientation="vertical"
							/>
							<div>
								<h2 className="flex gap-1 mb-2 text-sm items-center">
									<img src="/icons/ethereum.svg" alt="" />
									Ethereum
								</h2>
								<h1 className="font-semibold text-lg">${rate?.ethereum.usd}</h1>
							</div>
							<Separator
								className="bg-gray-500"
								orientation="vertical"
							/>
							<div>
								<h2 className="flex gap-1 mb-2 text-sm items-center">
									<img className="w-5" src="/icons/bitcoin.svg" alt="" />
									Bitcoin
								</h2>
								<h1 className="font-semibold text-lg">${rate?.bitcoin.usd}</h1>
							</div>
						</div>
					</div>
					<div className="w-[14rem]">
						<img
							className="block w-[190%] object-contain"
							src="/images/safe-lock.gif"
							alt=""
						/>
					</div>
				</div>
				<OverviewChart />
				<div className="mt-8 bg-white py-4 px-3">
					<div className="flex justify-between item-center">
						<h1 className="font-semibold text-gray-700">Trade History</h1>
						<button className="bg-app-primary text-white font-bold rounded-3xl px-8 text-sm py-2">
							View All
						</button>
					</div>
					<OverviewTable />
				</div>
			</div>
			<div className="">
				<OverviewWallet />
				<OverviewTradeBot />
			</div>
		</div>
	);
}
export default Overview;
