import styles from '../styles/TopHeader.module.css';

import CreatePostForm from './modals/CreatePostForm';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function TopHeader() {
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const handleCreatePostClick = () => {
        setIsCreatingPost(true);
    };

    const handleCloseCreatePost = () => {
        setIsCreatingPost(false);
    };

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('user');
        window.location.href = '/Login';
    }

    return (
        <div className={styles.top_header}>
            <Link href={"/"}><Image src="/logo.svg" alt="Caffagram Logo" width={120} height={120} /></Link>
            <div className={styles.button_group}>
                <button className={styles.likeButton}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className={styles.createPost} onClick={handleCreatePostClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
                <button className={styles.logOut} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
            {isCreatingPost && <CreatePostForm onClose={handleCloseCreatePost} />}
        </div>
    )
}

export default TopHeader;