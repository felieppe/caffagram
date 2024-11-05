import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import styles from '../styles/TopHeader.module.css';

function TopHeader() {
    return (
        <div className={styles.top_header}>
            <img src="/logo.svg" alt="Caffagram Logo" />
            <div className={styles.button_group}>
                <button className={styles.likeButton}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className={styles.createPost}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
        </div>
    )
}

export default TopHeader;