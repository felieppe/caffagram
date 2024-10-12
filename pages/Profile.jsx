import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";

function Profile() {

    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);     
        console.log("Editing Profile...");
    };

    const photos = [
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png"
       
    ];

    return (
        <div>
            <ProfileHeader
                username="UnUsername"
                profilePicture="https://cpng.pikpng.com/pngl/s/315-3154762_prison-mike-png-prison-mike-no-background-clipart.png"
                posts={153}
                friends={209}
                description="My profile description"
                onEdit={handleEditProfile}
            />
            <EditProfileButton onEdit={handleEditProfile} />
            {isEditing && <div>Formulario para completar la edición</div>} 
            <BottomHeader />
        </div>
    );
}

export default Profile;