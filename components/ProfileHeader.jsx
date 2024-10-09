import React from "react";
import styles from  '../styles/ProfileHeader.module.css';

function ProfileHeader({username, profilePicture, posts, friends, description}){
    return (
        <div className={styles["profile-header"]}>
            <img src={profilePicture} alt={`${username}'s profile`} className={styles['profile-picture']} />
            <div className={styles['profile-info']}>
                <h1>{username}</h1>
                <p>{description}</p>
                <div className={styles['stats']}>
                    <span>{posts} Posts</span>
                    <span>{friends} Friends</span>
                </div>
            </div>
        </div>
    );
}
export default ProfileHeader;