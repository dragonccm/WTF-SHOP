"use client"

import * as React from "react"
import { Plus, House, Slash, Star, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface Product {
    id: string
    name: string
    price: number
}

const drinks: Product[] = [
    { id: "1", name: "Ô long", price: 15000 },
    { id: "2", name: "Pepsi", price: 15000 },
    { id: "3", name: "Sting", price: 15000 },
    { id: "4", name: "Cam ép", price: 18000 },
    { id: "5", name: "Trà đường", price: 10000 },
    { id: "6", name: "Nước chanh tươi", price: 13000 },
]

const menu: Product[] = [
    { id: "7", name: "Món 1", price: 25000 },
    { id: "8", name: "Món 2", price: 30000 },
    { id: "9", name: "Món 3", price: 35000 },
]

export default function Restaurants() {
    const [activeTab, setActiveTab] = React.useState("drinks")
    const drinksRef = React.useRef<HTMLDivElement>(null)
    const menuRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id)
                    }
                })
            },
            {
                threshold: 0.5,
            }
        )

        if (drinksRef.current) observer.observe(drinksRef.current)
        if (menuRef.current) observer.observe(menuRef.current)

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="min-h-screen">
            <div className="pb-8 border-0">
                <div className="flex w-full min-h-[228px] items-end"
                    style={{
                        backgroundImage: "url('https://angular.pixelstrap.net/zomo/media/home-bg-ZTUNOW43.jpg')",
                        backgroundSize: "inherit",
                        backgroundPosition: "center",
                    }}>
                    <div className="container mx-auto flex items-center w-svw justify-center flex-col">
                        <div className="px-4 text-center w-7/12">
                            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-50">Restaurants</h1>
                            <p className="text-xl mb-8 max-w-2xl mx-auto flex items-center justify-center">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/" className="flex gap-1 justify-center items-center hover:text-orange-400"><House size={16} /> Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <Slash />
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="text-orange-400">Restaurants</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto mt-8">
                <Card className="overflow-hidden border-0 shadow-none">
                    <CardContent className="p-0 flex flex-col border-0 shadow-none">
                        <Tabs value={activeTab} onValueChange={(value) => scrollToSection(value)} className="w-full">
                            <div className="w-full pb-4">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-4xl font-extrabold">Bún Măng Vịt 86 - Mậu Thân</h1>
                                    <div className="flex gap-3">
                                        <div className="flex gap-1 "> <Star fill="yellow" strokeWidth={0} /> 4.5</div>
                                        <div className="flex gap-1 "> <Clock /> 30 phut - 3km</div>
                                    </div>
                                    <span>Mở cửa từ 9h30 đến 22h30</span>
                                </div>
                            </div>
                            <div className="sticky top-0 z-10 bg-white border-b">
                                <TabsList className="rounded-none bg-background shadow-none">
                                    <TabsTrigger
                                        value="drinks"
                                        className="w-56 rounded-none bg-background shadow-none text-xl font-extrabold flex items-center py-2 gap-1 border-b-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400"
                                    >
                                        Nước
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="menu"
                                        className="w-56 rounded-none bg-background shadow-none text-xl font-extrabold flex items-center py-2 gap-1 border-b-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400"
                                    >
                                        Menu
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-y-auto mt-4">
                                <div
                                    id="drinks"
                                    ref={drinksRef}
                                    className="min-h-screen p-4"
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-orange-400">Nước</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {drinks.map((drink) => (
                                            <Card key={drink.id} className="hover:shadow-lg hover:border-orange-400">
                                                <CardHeader>
                                                    <CardTitle>{drink.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardTitle>{drink.price.toLocaleString()}đ</CardTitle>
                                                    <div className="w-full flex items-center justify-end">
                                                        <Button className="rounded-sm w-14 h-9 border-2 border-orange-400 text-orange-400 bg-transparent hover:bg-orange-400 hover:text-white">
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    id="menu"
                                    ref={menuRef}
                                    className="min-h-screen p-4"
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-orange-400">Menu</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {menu.map((item) => (
                                            <Card key={item.id} className="hover:shadow-lg hover:border-orange-400">
                                                <CardHeader>
                                                    <CardTitle>{item.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardTitle>{item.price.toLocaleString()}đ</CardTitle>
                                                    <div className="w-full flex items-center justify-end">
                                                        <Button className="rounded-sm w-14 h-9 border-2 border-orange-400 text-orange-400 bg-transparent hover:bg-orange-400 hover:text-white">
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

