"use client"
import { useState } from "react"
import { MapPin, Upload, Plus, X, LinkIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [selectedTags, setSelectedTags] = useState({
    storeType: ["Nhà h..."],
    cuisine: ["Châu...", "Brazil"],
    dishes: ["Bò", "Bò ru...", "Pizza", "Burger"],
    time: ["Buổi tối"],
    customers: ["Cặp đôi", "Gia đình"],
    features: ["Nền đ...", "Cho...", "Có bà...", "Có wifi"],
    purpose: ["Đãi tiệc", "Ăn gia...", "Hẹn hò", "Tiếp k..."],
  })

  const nextStep = () => setStep((prev) => (prev < 6 ? prev + 1 : prev))
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev))

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="absolute top-4 left-4 flex gap-2">
        <Button onClick={prevStep}>Previous Step</Button>
        <Button onClick={nextStep}>Next Step</Button>
      </div>
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
              ${s === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {s}
            </div>
            {s < 6 && <div className="h-1 w-12 md:w-24 lg:w-32 bg-muted" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Thông tin cơ bản</h2>
          <div className="space-y-6">
            {/* Store Name */}
            <div className="space-y-2">
              <Label htmlFor="storeName" className="flex items-center gap-1 text-foreground">
                Tên quán
                <span className="text-destructive">*</span>
              </Label>
              <Input id="storeName" placeholder="Tên" className="border-input focus:ring-2 focus:ring-primary/20" />
              <Alert className="bg-accent/10 text-accent-foreground border-accent/20">
                <AlertDescription>
                  Tên quán nên được đặt theo thứ tự: Tên quán, món đặc trưng của quán và tên đường
                </AlertDescription>
              </Alert>
            </div>
            {/* Store Type */}
            <div className="space-y-2">
              <Label htmlFor="storeType" className="flex items-center gap-1 text-foreground">
                Loại
                <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Nhà hàng</SelectItem>
                  <SelectItem value="cafe">Quán café</SelectItem>
                  <SelectItem value="street-food">Quán ăn đường phố</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1 text-foreground">
                Số điện thoại liên hệ
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="Số điện thoại bàn hoặc di động"
                className="border-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-1 text-foreground">
                Thành phố
                <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="hcm">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hcm">TP. HCM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district" className="text-foreground">
                Quận
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Quận 1</SelectItem>
                  <SelectItem value="2">Quận 2</SelectItem>
                  <SelectItem value="3">Quận 3</SelectItem>
                  {/* Add more districts */}
                </SelectContent>
              </Select>
            </div>
            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground">
                Số nhà và Đường/Phố
              </Label>
              <Input id="address" placeholder="Đường/phố" className="border-input focus:ring-2 focus:ring-primary/20" />
            </div>
            {/* Map Location */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Định vị trên bản đồ (Theo như địa chỉ ghi trên)</Label>
              <div className="relative h-[300px] w-full rounded-lg border bg-muted flex items-center justify-center">
                <MapPin className="h-6 w-6 text-muted-foreground" />
                <span className="absolute top-2 right-2 bg-white p-2 rounded text-sm border">Map | Satellite</span>
              </div>
            </div>
            {/* Submit Button */}
            <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">Tiếp tục</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Thông tin người đại diện</h2>
          <p className="text-sm text-muted-foreground mb-6">Vui lòng điền đúng thông tin theo như hợp đồng</p>
          <div className="space-y-6">
            {/* Business Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground">
                Đăng ký dưới danh nghĩa
                <span className="text-destructive">*</span>
              </Label>
              <RadioGroup defaultValue="individual" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Cá nhân</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Công ty/Chuỗi</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Representative Name */}
            <div className="space-y-2">
              <Label htmlFor="repName" className="flex items-center gap-1 text-foreground">
                Tên đầy đủ người đại diện
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="repName"
                placeholder="Tên đầy đủ người đại diện"
                className="border-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1 text-foreground">
                Email
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="border-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* Phone Numbers */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1 text-foreground">
                Số điện thoại
                <span className="text-destructive">*</span>
              </Label>
              <Input id="phone" placeholder="Số điện thoại" className="border-input focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altPhone" className="text-foreground">
                Số điện thoại khác
              </Label>
              <Input
                id="altPhone"
                placeholder="Số điện thoại khác"
                className="border-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* ID Card */}
            <div className="space-y-2">
              <Label htmlFor="idNumber" className="flex items-center gap-1 text-foreground">
                Số CMND
                <span className="text-destructive">*</span>
              </Label>
              <div className="grid gap-4 md:grid-cols-2">
                {/* ID Card Front */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Ảnh chụp mặt trước CMND</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tải lên</span>
                    </div>
                  </div>
                </div>
                {/* ID Card Back */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Ảnh chụp mặt sau CMND</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tải lên</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Business Registration */}
            <div className="space-y-2">
              <Label className="text-foreground">Đăng ký kinh doanh</Label>
              <p className="text-sm text-muted-foreground">Tối đa 10 ảnh</p>
              <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tải lên</span>
                </div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Tiếp tục</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Thông tin quán - Chi Tiết</h2>
          <div className="space-y-6">
            {/* Opening Hours */}
            <div className="space-y-4">
              <Label className="flex items-center gap-1 text-foreground">
                Thời gian mở cửa
                <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="sunday" />
                  <Label htmlFor="sunday">Chủ Nhật</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Mở cửa</Label>
                  <Input type="time" defaultValue="09:00" className="w-24" />
                  <span>-</span>
                  <Input type="time" defaultValue="22:00" className="w-24" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Thêm khung giờ
              </Button>
            </div>
            {/* Store Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Loại hình quán
                <span className="text-destructive">*</span>
                <span className="text-sm text-muted-foreground">(Tối đa 2)</span>
              </Label>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Nhà hàng</SelectItem>
                    <SelectItem value="cafe">Quán café</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.storeType.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                      {tag}
                      <button className="text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Cuisine Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Ẩm thực
                <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asian">Châu Á</SelectItem>
                    <SelectItem value="western">Châu Âu</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.cuisine.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                      {tag}
                      <button className="text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Featured Dishes */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Món đặc trưng
                <span className="text-destructive">*</span>
                <span className="text-sm text-muted-foreground">(Tối đa 3)</span>
              </Label>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beef">Bò</SelectItem>
                    <SelectItem value="pizza">Pizza</SelectItem>
                    <SelectItem value="burger">Burger</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.dishes.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                      {tag}
                      <button className="text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Keywords */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Từ khoá tìm kiếm
                <span className="text-destructive">*</span>
                <span className="text-sm text-muted-foreground">
                  (Từ khoá được phân cách bằng dấu phẩy. Tối đa 20 ký tự)
                </span>
              </Label>
              <Input placeholder="vd: Gia đường, Mi Quảng..." />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Miêu tả về quán
                <span className="text-destructive">*</span>
                <span className="text-sm text-muted-foreground">(Tối đa 156 ký tự)</span>
              </Label>
              <Textarea placeholder="Điền miêu tả về quán" className="h-24" />
            </div>
            {/* Store Images */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Ảnh đại diện quán
                  <span className="text-sm text-muted-foreground">(550 x 550px, tối đa 1Mb)</span>
                </Label>
                <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tải lên</span>
                  </div>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg mt-2">
                  <div className="flex gap-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1wJfwtiIuZHmpS0XjkgDQ6qOXTwift.png"
                      alt="Example food"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium mb-2">Lưu ý:</p>
                      <p className="text-sm text-muted-foreground">
                        Nên dùng hình ảnh món đặc trưng hoặc logo của quán để người dùng nhận biết thương hiệu của mình dễ
                        dàng hơn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Ảnh bìa
                  <span className="text-sm text-muted-foreground">(960 x 550px, tối đa 1Mb)</span>
                </Label>
                <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tải lên</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Tiếp tục</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Menu giao hàng - Ảnh chụp menu</h2>
          <div className="space-y-6">
            {/* Menu Photo Upload */}
            <div className="space-y-4">
              <Label className="flex items-center gap-1">
                Ảnh chụp menu
                <span className="text-destructive">*</span>
              </Label>
              {/* Upload Area */}
              <div className="border-2 border-dashed rounded-lg p-8 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tải lên</span>
                </div>
              </div>
              {/* Guidelines Alert */}
              <Alert className="bg-amber-50 border-amber-200">
                <div className="flex gap-4">
                  <img src="/placeholder.svg?height=100&width=80" alt="Menu example" className="w-20 h-25 object-cover" />
                  <div className="flex-1 space-y-2">
                    <AlertDescription className="text-amber-800">
                      Vui lòng tải ảnh chụp rõ menu của quán để ShopeeFood có thể duyệt nhanh hơn.
                    </AlertDescription>
                    <AlertDescription className="text-amber-800 font-medium mt-2">Lưu ý:</AlertDescription>
                    <AlertDescription className="text-amber-800">
                      Nếu hình ảnh do Quán cung cấp không đáp ứng đủ điều kiện xét duyệt, ShopeeFood sẽ tạm thay thế bằng
                      hình logo ShopeeFood để Quán được bắt đầu bán hàng ngay. Quán có thể chờ đồng chỉnh sửa hình ảnh phù
                      hợp trên ứng dụng ShopeeFood Merchant sau khi đã được duyệt.
                    </AlertDescription>
                    <div className="flex items-center gap-2 text-primary hover:text-primary/90">
                      <LinkIcon className="h-4 w-4" />
                      <a href="#" className="text-sm">
                        Tham khảo Bộ Tiêu Chuẩn Hình Ảnh của ShopeeFood
                      </a>
                    </div>
                  </div>
                </div>
              </Alert>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Lưu và Tiếp tục</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 5 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Đăng ký Ứng dụng ShopeeFood Merchant</h2>
          <div className="space-y-6">
            {/* Description */}
            <p className="text-muted-foreground">
              Tài khoản đăng nhập hiện tại của bạn sẽ được dùng để tạo tài khoản quản lý đơn hàng Ứng dụng ShopeeFood
              Merchant. Bạn có thể dùng tài khoản này để đăng nhập vào ứng dụng ShopeeFood Merchant sau khi được duyệt.
            </p>
            {/* Email Input */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Email đăng nhập Ứng dụng ShopeeFood Merchant
                <span className="text-destructive">*</span>
              </Label>
              <Input type="email" value="khanhthn.94@gmail.com" disabled className="bg-muted/50 text-muted-foreground" />
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Đăng ký và tiếp tục
              </Button>
            </div>
          </div>
        </Card>
      )}

      {step === 6 && (
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Đăng ký ví ShopeeFood Merchant Wallet</h2>
          <div className="space-y-6">
            {/* Pre-filled Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Email thụ cấp ví ShopeeFood Merchant Wallet
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="email"
                  value="khanhthn.94@gmail.com"
                  disabled
                  className="bg-muted/50 text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  SDT thụ cấp ví ShopeeFood Merchant Wallet
                  <span className="text-destructive">*</span>
                </Label>
                <Input type="tel" value="84975382431" disabled className="bg-muted/50 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Số CMND
                  <span className="text-destructive">*</span>
                </Label>
                <Input value="02412356" disabled className="bg-muted/50 text-muted-foreground" />
              </div>
            </div>
            {/* Banking Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Tên chủ tài khoản ngân
                  <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="Tên chủ tài khoản ngân" className="border-input focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Số tài khoản ngân hàng
                  <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="Số tài khoản ngân hàng" className="border-input focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Tên ngân hàng
                  <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tên ngân hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vcb">Vietcombank</SelectItem>
                    <SelectItem value="tcb">Techcombank</SelectItem>
                    <SelectItem value="bidv">BIDV</SelectItem>
                    <SelectItem value="vtb">VietinBank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Tỉnh/Thành phố của chi nhánh
                  <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tỉnh/Thành phố của chi nhánh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="dn">Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Chi nhánh ngân hàng
                  <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chi nhánh ngân hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch1">Chi nhánh 1</SelectItem>
                    <SelectItem value="branch2">Chi nhánh 2</SelectItem>
                    <SelectItem value="branch3">Chi nhánh 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Đăng ký và tiếp tục
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

