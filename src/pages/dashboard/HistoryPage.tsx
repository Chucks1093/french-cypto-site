import DepositTable from "@/components/dashboard/tables/DepositTable";
import TradeTable from "@/components/dashboard/tables/TradeTable";
import WithdrawalTable from "@/components/dashboard/tables/WithdrawalTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function HistoryPage() {
   const [currentPage, setCurrentPage] = useState<"trade" | "deposit" | "withdrawal">("trade");

   const handleClick =(page: typeof currentPage)=> {
      setCurrentPage(page)
   }
   const renderCurrentPage =()=> {
      if(currentPage == "deposit"){
         return <DepositTable />
      }
      if(currentPage == "trade") {
         return <TradeTable />
      }
      if(currentPage == "withdrawal"){
         return <WithdrawalTable />
      }
      return <TradeTable />
   }
	return (
		<div className="p-8">
			<div className="flex gap-3 mt-4 mb-4 ">
				<Button
					className={`rounded-3xl text-sm px-6 text-gray-600  py-[.4rem] h-fit ${currentPage === "trade" && "bg-app-primary text-white font-bold"}`}
					variant="outline"
               onClick={()=> handleClick("trade")}
				>
					Trade
				</Button>
				<Button
					className={`rounded-3xl text-sm px-6 text-gray-600  py-[.4rem] h-fit ${currentPage === "deposit" && "bg-app-primary text-white font-bold"}`}
					variant="outline"
               onClick={()=> handleClick("deposit")}
				>
					Deposit
				</Button>
				<Button
					className={`rounded-3xl text-sm px-6 text-gray-600  py-[.4rem] h-fit ${currentPage === "withdrawal" && "bg-app-primary text-white font-bold"}`}
					variant="outline"
               onClick={()=> handleClick("withdrawal")}
				>
					Withdrawal
				</Button>
			</div>
			{renderCurrentPage()}
		</div>
	);
}
export default HistoryPage;
