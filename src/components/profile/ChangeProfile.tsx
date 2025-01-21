"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { editProfile, getUser } from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, UserRound, Lock } from "lucide-react";

const ChangeProfile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const { toast } = useToast()

    const handleSaveChanges = async () => {
        const profileData = { username, email, phone, oldpassword: oldPassword, newpassword: password, confirmPassword };
        try {
            await editProfile(profileData);
            toast({
                description: "Changes saved successfully.",
            })
        } catch (error) {
            toast({
                description: "Failed to save changes." + error,
            })
        }
    };
    useEffect(() => {
        getUser().then((res) => {
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPhone(res.data.Phone);
        }).catch((err) => {
            toast({
                description: JSON.stringify(err),
            })
        })
    }, [])
    return (
        <Card className="w-full mx-auto shadow-md rounded-lg p-6">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold mb-6">Change Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-lg font-extrabold flex items-center gap-2"><UserRound color="#ff8800" /> Name :</Label>
                        <p className="text-lg text-gray-500 pl-7 pt-2 font-normal">{username}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Name</DialogTitle>
                                <DialogDescription>
                                    Make changes to your name here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="username" className="col-span-3" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600" type="button" onClick={handleSaveChanges}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-lg font-extrabold flex items-center gap-2"><Mail color="#ff8800" /> Email :</Label>
                        <p className="text-lg text-gray-500 pl-7 pt-2 font-normal">{email}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Email</DialogTitle>
                                <DialogDescription>
                                    Make changes to your Email here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Mail
                                    </Label>
                                    <Input id="email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600" type="button" onClick={handleSaveChanges}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-lg font-extrabold flex items-center gap-2"><Phone color="#ff8800" /> Phone Number :</Label>
                        <p className="text-lg text-gray-500 pl-7 pt-2 font-normal">{phone}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit phone number</DialogTitle>
                                <DialogDescription>
                                    Make changes to your phone number here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input id="phone" className="col-span-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600" type="button" onClick={handleSaveChanges}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-lg font-extrabold flex items-center gap-2"><Lock color="#ff8800" /> Password :</Label>
                        <p className="text-lg text-gray-500 pl-7 pt-2 font-normal">*****</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="oldpassword" className="text-right">
                                        Old Password
                                    </Label>
                                    <Input id="oldpassword" className="col-span-3" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        new Password
                                    </Label>
                                    <Input id="password" className="col-span-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="confirmPassword" className="text-right">
                                        Confirm Password
                                    </Label>
                                    <Input id="confirmPassword" className="col-span-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600" type="button" onClick={handleSaveChanges}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChangeProfile;
