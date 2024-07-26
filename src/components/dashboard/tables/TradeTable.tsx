import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import usePost from "@/hooks/usePost";
import useAppHistory from "@/hooks/useAppHistory";
import showToast from "@/utils/showToast";
import { Fragment, useEffect } from "react";
import { formatTimestamp } from "@/utils/utils";

export default function TradeTable() {
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
    <Fragment>
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="[&>th]:text-gray-700">
            <TableHead className=" sm:table-cell">Date </TableHead>
            <TableHead className="hidden sm:table-cell">Time</TableHead>
            <TableHead className="hidden sm:table-cell">Pairs</TableHead>
            <TableHead className=" sm:table-cell">Type</TableHead>
            <TableHead className="hidden sm:table-cell">Quantity</TableHead>
            <TableHead className=" md:table-cell">Fee</TableHead>
            <TableHead className="text-right">At Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory?.map((history, index) => {
            const { date, time } = formatTimestamp(new Date(history.timestamp).getTime());
            return (
              <TableRow key={index} className="bg-accent">

                <TableCell className=" sm:table-cell">{date} </TableCell>
                <TableCell className="hidden sm:table-cell">{time}</TableCell>
                <TableCell className="hidden sm:table-cell">{history.symbol}</TableCell>
                <TableCell className=" sm:table-cell">
                  <Badge className="text-xs text-green-600" variant="secondary">
                    {history.type}
                  </Badge>
                </TableCell>
                <TableCell className=" md:table-cell">{history.amount} BNB</TableCell>
                <TableCell className="text-right">${history.price}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {tradeHistory?.length === 0 && <div className="flex items-center flex-col justify-center">
        <img className="block w-[10rem]" src="/images/no-record.gif" alt="" />
        <p className="text-sm text-center relative bottom-5 text-gray-600">No Record</p>
      </div>}
    </Fragment>
  )
}
