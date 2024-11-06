import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import styles from '../styles/TopHeaderProfile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import CreatePostForm from './modals/CreatePostForm';

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
            <Link href={"/"}><Image src="/logo.svg" alt="Caffagram Logo" width={120} height={120} /></Link>
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