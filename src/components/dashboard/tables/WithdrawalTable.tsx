

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Fragment } from "react/jsx-runtime";


export default function WithdrawalTable() {

  return (
    <Fragment>

        <Table className="mt-4">
          <TableHeader>
            <TableRow className="[&>th]:text-gray-700">
              <TableHead className=" sm:table-cell">Refrence Number </TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Time</TableHead>
              <TableHead className="hidden sm:table-cell">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Fees</TableHead>
              <TableHead className="hidden md:table-cell">Wallet Address</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>
         
           
          <TableBody>
            {/* <TableRow className="bg-accent">
              
              <TableCell className="hidden sm:table-cell">WN20240613T123045XZ </TableCell>
              <TableCell className="hidden sm:table-cell">2024-06-13 </TableCell>
              <TableCell className="hidden sm:table-cell">16:42</TableCell>
              <TableCell className="hidden sm:table-cell">50.00</TableCell>
              <TableCell className="hidden sm:table-cell">SOL</TableCell>
              <TableCell className="hidden sm:table-cell">0.0001 SOL</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-green-600" variant="secondary">
                Confirmed
                </Badge>
              </TableCell>
            </TableRow> */}
          
          </TableBody>
         
        </Table>
         <div className="flex items-center flex-col justify-center">
         <img className="block w-[8rem] md:w-[10rem] " src="/images/no-record.gif" alt="" />
         <p className="text-sm text-center relative bottom-5 text-gray-600">No Record</p>

         </div>
         </Fragment>
  )
}
