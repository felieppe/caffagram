import { fetchAllProfiles, fetchFeed } from "@/utils/api";

import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";
import PhotoGallery from "../components/PhotoGallery";
import TopHeaderProfile from "@/components/TopHeaderProfile";
import EditProfilePage from "../components/EditProfilePage";
import { useEffect, useState } from "react";

function User({ user = {}, jwt = '' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [posts, setPosts] = useState(getPosts());

    const handleEditProfile = () => { setIsEditing(true); };
    const handleCancelEdit = () => { setIsEditing(false); }

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
    };

    function getPosts() {
        fetchFeed(jwt).then((feed) => {
            const up = feed.filter(post => post.user.username === user.username).map(post => post.imageUrl);
            setPosts(up);
        })
    }

    return (
        <>
            <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            {isEditing ? (
                <EditProfilePage 
                    profileData={user} 
                    onSave={handleSaveProfile} 
                    onCancel={handleCancelEdit} 
                />
            ) : (
                <div>
                    <TopHeaderProfile/>
                    
                    <ProfileHeader
                        username={user.username}
                        profilePicture={user.profilePicture ? user.profilePicture : "/default-profile.webp"}
                        posts={posts.length}
                        friends={user.friends.length}
                        description={user.description}
                        onEdit={handleEditProfile}
                    />
                    <EditProfileButton onEdit={handleEditProfile} />
                    <PhotoGallery photos={posts} />
                    
                    <BottomHeader/>
                </div>
            )}
        </div>
        </>
    )
}

export default User;

export async function getServerSideProps(context) {
    const { username } = context.query;
    if (username == null) { return { redirect: { destination: '/feed', permanent: false }} }

    const jwt = context.req.cookies.token;
    if (jwt == null) { return { redirect: { destination: '/Login', permanent: false }} }

    const user = await fetchAllProfiles(jwt).then((profiles) => { return profiles.find(profile => profile.username === username) });
    if (user == undefined) { return { redirect: { destination: '/feed', permanent: false }} }

    return { props: { user, jwt } }
}