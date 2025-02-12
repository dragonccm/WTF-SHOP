import { BadgeDollarSign, BarChart2, ShoppingBag, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/merchant/overview"
import { RecentOrders } from "@/components/merchant/recent-orders"

export default function RestaurantAdminPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Xin chào, Admin</h2>
          <p className="text-muted-foreground">Đây là tổng quan về hoạt động kinh doanh của bạn</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Phân tích
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Báo cáo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <BadgeDollarSign className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.230.000₫</div>
                <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
                <ShoppingBag className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
                <Users className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180 khách hàng mới</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tăng trưởng</CardTitle>
                <BarChart2 className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">+4.5% so với tháng trước</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tổng quan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Đơn hàng gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

