import React from "react";
import ProfileHeader from './ProfileHeader';

function ProfilePage() {
    return (
        <div>
            <ProfileHeader
                username="UnUsername"
                profilePicture="https://cpng.pikpng.com/pngl/s/315-3154762_prison-mike-png-prison-mike-no-background-clipart.png"
                posts={153}
                friends={209}
                description="My profile description"
            />
        </div>
    );
}

export default ProfilePage;