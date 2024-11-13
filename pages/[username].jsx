import { addFriendById, editMyProfile, fetchAllProfiles, fetchFeed, fetchProfileById, removeFriendById } from "@/utils/api";

import TopHeaderProfile from "@/components/TopHeaderProfile";
import { useEffect, useState } from "react";
import BottomHeader from "../components/BottomHeader";
import EditProfileButton from "../components/EditProfileButton";
import EditProfilePage from "../components/EditProfilePage";
import PhotoGallery from "../components/PhotoGallery";
import ProfileHeader from "../components/ProfileHeader";

function User({ user = {}, jwt = '' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(user);
    const [posts, setPosts] = useState([]);
    const [isOp, setIsOp] = useState(false);
    const [lUser, setLUser] = useState(null);

    const handleEditProfile = () => { setIsEditing(true); };
    const handleCancelEdit = () => { setIsEditing(false); }

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);

        editMyProfile(jwt, { username: updatedProfile.username, description: updatedProfile.description, profilePicture: updatedProfile.profilePicture }).then((res) => {
            console.log("Profile updated");
        }).catch((error) => { console.error(error) });
    };

    const handleFollow = () => {
        const following = profile.friends.includes(lUser.id);

        if (!following) {
            addFriendById(user._id, jwt).then(() => {
                console.log("Friend added");

                // update user friends array in state
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friends: [...prevProfile.friends, lUser.id]
                }));
            }).catch((error) => { console.error(error) });
        } else {
            removeFriendById(user._id, jwt).then(() => {
                console.log("Friend removed");

                // remove from user friends array user._id
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friends: prevProfile.friends.filter(friend => friend != lUser.id)
                }));
            }).catch((error) => { console.error(error) });
        }
    }

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
                        friends={profile.friends.length}
                        description={profile.description}
                        onEdit={handleEditProfile}
                    />

                    {isOp && <EditProfileButton onEdit={handleEditProfile} /> }
                    {!isOp && <button onClick={handleFollow} style={{width: '100%', padding: '10px', backgroundColor: '#0095f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>{profile.friends.includes(lUser.id) ? "Following" : "Follow"}</button>}
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
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    const user = await fetchAllProfiles(jwt).then((profiles) => { return profiles.find(profile => profile.username === username) });
    if (user == undefined) { return { redirect: { destination: '/feed', permanent: false }} }

    return { props: { user, jwt } }
}