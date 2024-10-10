import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
        console.log("Editing Profile...");
    };

    return (
        <div>
            <ProfileHeader
                username="UnUsername"
                profilePicture="https://cpng.pikpng.com/pngl/s/315-3154762_prison-mike-png-prison-mike-no-background-clipart.png"
                posts={153}
                friends={209}
                description="My profile description"
            />
            <EditProfileButton onEdit={handleEditProfile} />
        </div>
    );
}

export default Profile;