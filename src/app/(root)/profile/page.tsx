import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
    return (
        <div className="min-h-screen">
            <ProfileHeader />
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto mt-8">
                <ProfileTabs />
            </div>
        </div>
    );
};

export default Profile;