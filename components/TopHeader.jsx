import styles from '../styles/TopHeader.module.css';

import CreatePostForm from './modals/CreatePostForm';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

function TopHeader() {
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
            <div className={styles.button_group}>
                <button className={styles.likeButton}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className={styles.createPost} onClick={handleCreatePostClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
            {isCreatingPost && <CreatePostForm onClose={handleCloseCreatePost} />}
        </div>
    )
}

export default TopHeader;