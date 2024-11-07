import { fetchAllProfiles, fetchFeed, fetchProfileById } from "@/utils/api";

import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";
import PhotoGallery from "../components/PhotoGallery";
import TopHeaderProfile from "@/components/TopHeaderProfile";
import EditProfilePage from "../components/EditProfilePage";
import { useEffect, useState } from "react";

function User({ user = {}, jwt = '' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isOp, setIsOp] = useState(false);
    const [lUser, setLUser] = useState(null);

    const handleEditProfile = () => { setIsEditing(true); };
    const handleCancelEdit = () => { setIsEditing(false); }

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
    };

    useEffect(() => {
        fetchFeed(jwt).then((feed) => {
            const up = feed.filter(post => post.user.username === user.username).map(post => { return { imageUrl: "http://localhost:3001/" + post.imageUrl, id: post._id } });
            setPosts(up);
        }).catch((error) => { console.err(error) });

        const localUser = JSON.parse(localStorage.getItem('user'));
        setLUser(localUser);

        if (localUser == null) { setIsOp(false); }
        else if (localUser.username == user.username) { setIsOp(true); }
    }, [user, jwt])

    if (!lUser) { return <div>Loading...</div> }

    return (
        <>
            <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
                {isEditing ? <EditProfilePage 
                    profileData={user} 
                    onSave={handleSaveProfile} 
                    onCancel={handleCancelEdit} 
                /> : null}
                
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
                    
                    {isOp && <EditProfileButton onEdit={handleEditProfile} /> }
                    {posts.length > 0 ? <PhotoGallery photos={posts} /> : <p style={{width: '100%', textAlign: "center", color: '#808080'}}>No posts yet</p>}
                        
                    <BottomHeader profileImageUrl={fetchProfileById(lUser.id, jwt).profilePicture || ""}/>
                </div>
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