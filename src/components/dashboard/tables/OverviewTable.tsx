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
import { formatTimestamp } from "@/utils/utils";

export default function OverviewTable() {
	const { userWallet } = useCurrentWallet();
	const { postData } = usePost();
	const { setTradeHistory, fetchedTradeHistory, tradeHistory } =
		useAppHistory();
	const fetchTradeHistory = async () => {
		try {
			if (!userWallet?.address) {
				showToast.error("Connect Wallet Address");
				throw new Error("Connect Wallet Address");
			}
			const data = await postData(
				"/trade_history",
				JSON.stringify({
					wallet_address: userWallet?.address,
				})
			);
			setTradeHistory(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!fetchedTradeHistory) {
			fetchTradeHistory();
		}
	}, [fetchTradeHistory]);
	return (
		<div className="mb-[4rem]">
			<Table className="mt-4">
				<TableHeader>
					<TableRow className="[&>th]:text-gray-700 bg-white">
						<TableHead className="hidden sm:table-cell">
							Date and Time
						</TableHead>
						<TableHead className="hidden sm:table-cell">Pairs</TableHead>
						<TableHead className="hidden sm:table-cell">Type</TableHead>
						<TableHead className="hidden sm:table-cell">
							Quantity
						</TableHead>
						<TableHead className="text-right">At Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tradeHistory?.map((history, index) => {
						const { date, time } = formatTimestamp(new Date(history.timestamp).getTime());
						return (
							index < 5 && (
								<TableRow className="bg-accent bg-white " key={index}>
									<TableCell className="hidden sm:table-cell">
										{date} {time}
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										{history.symbol}
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										<Badge
											className="text-xs text-green-600"
											variant="secondary"
										>
											{history.type}
										</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{history.amount}
									</TableCell>
									<TableCell className="text-right">
										{history.price} BNB
									</TableCell>
								</TableRow>
							)
						);
					})}
				</TableBody>
			</Table>
			{tradeHistory?.length === 0  && <div className="mt-8">
					<img
						className="w-10 mx-auto"
						src="/icons/empty-tray.svg"
						alt=""
					/>
					<p className="text-gray-600 text-[.74rem] text-center mt-2">
						No Recent Trade
					</p>
				</div>}
		</div>
	);
}
