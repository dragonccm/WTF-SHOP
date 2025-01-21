import { House, Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const ProfileHeader = async () => {
    const session = await getServerSession();
    if (!session) {
        redirect(`/`);
    }
    return (
        <div className="pb-8 border-0">
            <div className="flex w-full min-h-[228px] items-end"
                style={{
                    backgroundImage: "url('https://angular.pixelstrap.net/zomo/media/home-bg-ZTUNOW43.jpg')",
                    backgroundSize: "inherit",
                    backgroundPosition: "center",
                }}>
                <div className="container mx-auto flex items-center w-svw justify-center">
                    <div className="px-4 text-center w-7/12">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-50">Profile</h1>
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
                                        <BreadcrumbPage className="text-orange-400">Profile</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
