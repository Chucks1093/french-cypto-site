import { Button } from "@/components/ui/button"
import BotCard from "./BotCard"

function OverviewTradeBot() {
  return (
    <div className="mt-8  border border-[#e6e6e6] p-5 rounded-xl ">
      <h1 className="pb-4 border-b border-b-gray-400 text-xl">Trading Bot</h1>
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
         <div className="mt-4 flex flex-col gap-3">
            <BotCard />
            <BotCard />
            <BotCard />
         </div>
    </div>
  )
}
export default OverviewTradeBot