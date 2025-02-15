import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Setting = () => {
    return (
        <Card>
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-semibold ">Setting</h1>
                <Card className="border-0 shadow-none">
                    <CardContent className="p-0 space-y-4">
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-lg ">Offer Update</h2>
                            <Switch className="data-[state=checked]:bg-orange-400" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-lg ">Order Update</h2>
                            <Switch className="data-[state=checked]:bg-orange-400" />
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-lg ">New Update</h2>
                            <Switch className="data-[state=checked]:bg-orange-400" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold ">Delete Your Account</h2>
                    <div className="space-y-4">
                        <p className="text-gray-600">Hi Mark Jecno,</p>
                        <p className="text-gray-600">We are sorry to hear you would like to delete your account.</p>
                        <div className="space-y-4">
                            <h3 className="">Note :</h3>
                            <p className="text-gray-600">
                                Deleting your account will permanently remove your profile, personal settings, and all other associated information. Once your account is deleted, you will be logged out and will be unable to log back in.
                            </p>
                        </div>
                        <p className="text-gray-600">
                            If you understand and agree to the above statement, and would still like to delete your account, then click below
                        </p>
                        <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-full px-8">
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Setting;
