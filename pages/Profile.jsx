import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";
import PhotoGallery from "../components/PhotoGallery";
import TopHeaderProfile from "@/components/TopHeaderProfile";
import EditProfilePage from "../components/EditProfilePage";

function Profile() {
    
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "UnUsername",
        profilePicture: "https://cpng.pikpng.com/pngl/s/315-3154762_prison-mike-png-prison-mike-no-background-clipart.png",
        posts: 3,
        friends: 209,
        description: "My profile description"
    });

    const handleEditProfile = () => {
        setIsEditing(true);     
        console.log("Editing Profile...");
    };

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    }




    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setProfile((prevProfile) => ({
    //         ...prevProfile,
    //         [name]: value
    //     }));
    // };
    

    const photos = [
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png"
       
    ];
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            {isEditing ? (
                <EditProfilePage 
                    profileData={profile} 
                    onSave={handleSaveProfile} 
                    onCancel={handleCancelEdit} 
                />
            ) : (
                <div>
                    <TopHeaderProfile/>
                    <ProfileHeader
                        username={profile.username}
                        profilePicture={profile.profilePicture}
                        posts={profile.posts}
                        friends={profile.friends}
                        description={profile.description}
                        onEdit={handleEditProfile}
                    />
                    <EditProfileButton onEdit={handleEditProfile} />
                    <PhotoGallery photos={photos} />
                    <BottomHeader/>
                </div>
            )}
        </div>
    );
}

export default Profile;