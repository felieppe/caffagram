import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import styles from '../styles/TopHeaderProfile.module.css';
import CreatePostForm from './CreatePostForm';

function TopHeaderProfile() {
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const handleCreatePostClick = () => {
        setIsCreatingPost(true);
    };

    const handleCloseCreatePost = () => {
        setIsCreatingPost(false);
    };

    return (
        <div className={styles.top_header}>
            <img src="/logo.svg" alt="Caffagram Logo" />
            <div className={styles.icons}>
                <button className={styles.createPost} onClick={handleCreatePostClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
                <button className={styles.menuButton}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
            {isCreatingPost && <CreatePostForm onClose={handleCloseCreatePost} />}
        </div>
    )
}

export default TopHeaderProfile;