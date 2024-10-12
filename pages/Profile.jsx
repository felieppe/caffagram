import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";
import PhotoGallery from "../components/PhotoGallery";

function Profile() {
    
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "UnUsername",
        profilePicture: "https://cpng.pikpng.com/pngl/s/315-3154762_prison-mike-png-prison-mike-no-background-clipart.png",
        posts: 153,
        friends: 209,
        description: "My profile description"
    });

    const handleEditProfile = () => {
        setIsEditing(true);     
        console.log("Editing Profile...");
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };
    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const photos = [
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
        "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png"
       
    ];
    return (
        <div>
            {/* Mostrar el formulario de edición si está en modo edición */}
            {isEditing ? (
                <div>
                    <h2>Edit Profile</h2>
                    <form>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={profile.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Profile Picture URL:</label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={profile.profilePicture}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={profile.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="button" onClick={handleSaveProfile}>Save</button>
                    </form>
                </div>
            ) : (
                // Mostrar la vista de perfil si no estamos en modo edición
                <div>
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