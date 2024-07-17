import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import usePost from "@/hooks/usePost";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import useAppHistory from "@/hooks/useAppHistory";
import showToast from "@/utils/showToast";
import { useEffect } from "react";
import { formatTimestamp } from "@/utils/utils";

export default function RecentDeposits() {
  const { postData } = usePost();
	const { userWallet } = useCurrentWallet();
	const { depositHistory, setDepositHistory, fetchedDepositHistory } = useAppHistory();

	const fetchDeposits = async () => {
		try {
			if (!userWallet?.address) {
				showToast.error("Connect Wallet Address");
				throw new Error("Connect Wallet Address");
			}
			const data = await postData(
				"/deposit_history",
				JSON.stringify({
					wallet_address: userWallet?.address,
				})
			);
			setDepositHistory(data)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
    if(!fetchedDepositHistory) {
      fetchDeposits();
    }
	}, [fetchDeposits]);
  return (
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="[&>th]:text-gray-700">
              <TableHead className="hidden sm:table-cell">Date and Time</TableHead>
              <TableHead className="hidden sm:table-cell">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depositHistory?.map((history, index)=> {
              const { date, time } = formatTimestamp(history.timestamp);
              return index < 5 && (
            <TableRow className="bg-accent">
              <TableCell className="hidden sm:table-cell">{date} {time}</TableCell>
              <TableCell className="hidden sm:table-cell">{history.amount}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-green-600" variant="secondary">
                {history.status}
                </Badge>
              </TableCell>
            </TableRow>

            )})}
          
          </TableBody>
        </Table>
  )
}
