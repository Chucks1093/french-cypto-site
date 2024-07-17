import { Badge } from "@/components/ui/badge";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useAppHistory from "@/hooks/useAppHistory";
import useCurrentWallet from "@/hooks/useCurrentWallet";

import usePost from "@/hooks/usePost";
import showToast from "@/utils/showToast";
import { useEffect } from "react";
import { abbreviateAddress, formatTimestamp } from "@/utils/utils";



export default function DepositTable() {
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
					<TableHead className="hidden sm:table-cell">
						Transaction Hash{" "}
					</TableHead>
					<TableHead className="hidden sm:table-cell">Date</TableHead>
					<TableHead className="hidden sm:table-cell">Time</TableHead>
					<TableHead className="hidden sm:table-cell">Amount</TableHead>
					<TableHead className="hidden sm:table-cell">Currency</TableHead>
					<TableHead className="">Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{depositHistory?.map((history, index) => {
          const { date, time } = formatTimestamp(history.timestamp);
					return (
						<TableRow className="bg-accent" key={index}>
							<TableCell className="hidden sm:table-cell">
								{abbreviateAddress(history.transaction_hash)}
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{date}{" "}
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{time}
							</TableCell>
							<TableCell className="hidden sm:table-cell">
              {history.amount} BNB
							</TableCell>
							<TableCell className="hidden sm:table-cell">BNB</TableCell>
							<TableCell className="hidden sm:table-cell">
								<Badge
									className="text-xs text-green-600"
									variant="secondary"
								>
									{history.status}
								</Badge>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
