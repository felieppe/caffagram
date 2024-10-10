import React from "react";
import styles from '../styles/ProfileHeader.module.css';


function ProfileHeader({ username, profilePicture, posts, friends, description }) {
    return (
        <div className={styles["profile-header"]}>
            <div className={styles["profile-picture-container"]}>
                <img
                    src={profilePicture}
                    alt={`${username}'s profile`}
                    className={styles["profile-picture"]}
                />
            </div>
            <div className={styles["profile-info"]}>
                <h1 className={styles["profile-username"]}>{username}</h1>
                <p className={styles["profile-description"]}>{description}</p>
                <div className={styles["profile-stats"]}>
                    <div className={styles["stat-item"]}>
                        <strong>{posts}</strong>
                        <span>Posts</span>
                    </div>
                    <div className={styles["stat-item"]}>
                        <strong>{friends}</strong>
                        <span>Friends</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;

