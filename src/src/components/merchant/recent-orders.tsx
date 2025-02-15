import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentOrders = [
  {
    id: "728ed52f",
    amount: 100000,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125000,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "624e1d42",
    amount: 175000,
    status: "success",
    email: "test@example.com",
  },
  {
    id: "624e1d42",
    amount: 175000,
    status: "success",
    email: "user@example.com",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã đơn</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead className="text-right">Số tiền</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                className={
                  order.status === "pending"
                    ? "text-yellow-500 hover:text-yellow-600"
                    : order.status === "processing"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-green-500 hover:text-green-600"
                }
              >
                {order.status === "pending" ? "Chờ xử lý" : order.status === "processing" ? "Đang xử lý" : "Hoàn thành"}
              </Button>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{order.email.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {order.email}
              </div>
            </TableCell>
            <TableCell className="text-right">{order.amount.toLocaleString()}₫</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

