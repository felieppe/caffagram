import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import styles from '../styles/TopHeader.module.css';
import Image from 'next/image';
import Link from 'next/link';

function TopHeader() {
    return (
        <div className={styles.top_header}>
            <Link href={"/"}><Image src="/logo.svg" alt="Caffagram Logo" width={120} height={120} /></Link>
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