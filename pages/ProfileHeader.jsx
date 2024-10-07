import React from "react";

function ProfileHeader({username, profilePicture, posts, friends, description}){
    return (
        <div className="profile-header">
            <img src={profilePicture} alt={`${username}'s profile`} className="profile-picture" />
            <div className="profile-info">
                <h1>{username}</h1>
                <p>{description}</p>
                <div className="stats">
                    <span>{posts} Posts</span>
                    <span>{friends} Friends</span>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
            </div>
        </div>
    );
}
export default ProfileHeader;