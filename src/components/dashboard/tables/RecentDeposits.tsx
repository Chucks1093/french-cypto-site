import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RecentDeposits() {
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
            <TableRow className="bg-accent">
              
              <TableCell className="hidden sm:table-cell">2024-06-13 16:42</TableCell>
              <TableCell className="hidden sm:table-cell">100.00</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-green-600" variant="secondary">
                Confirmed
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="bg-accent">
              
              <TableCell className="hidden sm:table-cell">2024-06-13 16:42</TableCell>
              <TableCell className="hidden sm:table-cell">100.00</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-green-600" variant="secondary">
                Confirmed
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="bg-accent">
              
              <TableCell className="hidden sm:table-cell">2024-06-13 16:42</TableCell>
              <TableCell className="hidden sm:table-cell">100.00</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-yellow-600" variant="secondary">
                Pending
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="bg-accent">
              
              <TableCell className="hidden sm:table-cell">2024-06-13 16:42</TableCell>
              <TableCell className="hidden sm:table-cell">100.00</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs text-red-600" variant="secondary">
                Failed
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
  )
}
