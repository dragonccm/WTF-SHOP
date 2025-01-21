"use client"
import { Bolt, CircleHelp, MapPin, ShoppingBag, CreditCard, User, LogOut } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import ChangeProfile from "@/components/profile/ChangeProfile";
import MyOrder from "@/components/profile/MyOrder";
import SavedAddress from "@/components/profile/SavedAddress";
import SavedCard from "@/components/profile/SavedCard";
import Help from "@/components/profile/Help";
import Setting from "@/components/profile/Setting";
import { signOut } from "next-auth/react";

const ProfileTabs = () => {
    return (
        <Card className="overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 flex border-0 shadow-none">
                <Tabs orientation="horizontal" defaultValue="ChangeProfile" className="w-full flex ">
                    <TabsList className="w-1/4 flex flex-col">
                        <Command className="rounded-lg border shadow-md">
                            <div className="w-full h-36 bg-orange-400 flex items-center justify-center">
                                <Avatar className="w-24 h-24 z-50">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <CommandList>
                                <CommandItem className="flex items-center justify-center">
                                    <span className="font-semibold text-xl">Profile</span>
                                </CommandItem>
                                <CommandItem className="flex items-center justify-center">
                                    <span>Profile</span>
                                </CommandItem>
                                <CommandSeparator />
                                <CommandGroup heading="">
                                    <TabsTrigger value="ChangeProfile" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <User />
                                        <span>Change Profile</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="MyOrder" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <ShoppingBag />
                                        <span>My Order</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="SavedAddress" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <MapPin />
                                        <span>Saved Address</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="SavedCard" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <CreditCard />
                                        <span>Saved Card</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="Help" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <CircleHelp />
                                        <span>Help</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="Setting" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400">
                                        <Bolt />
                                        <span>Setting</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="LogOut" className="flex items-center w-full py-2 gap-1 border-r-2 data-[state=active]:text-orange-400 data-[state=active]:border-orange-400" onClick={() => signOut()}>
                                        <LogOut />
                                        <span>Log Out</span>
                                    </TabsTrigger>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </TabsList>
                    <div className="w-3/4">
                        <TabsContent value="ChangeProfile">
                            <ChangeProfile />
                        </TabsContent>
                        <TabsContent value="MyOrder">
                            <MyOrder />
                        </TabsContent>
                        <TabsContent value="SavedAddress">
                            <SavedAddress />
                        </TabsContent>
                        <TabsContent value="SavedCard">
                            <SavedCard />
                        </TabsContent>
                        <TabsContent value="Help">
                            <Help />
                        </TabsContent>
                        <TabsContent value="Setting">
                            <Setting />
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ProfileTabs;
