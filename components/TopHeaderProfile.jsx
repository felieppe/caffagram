import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import styles from '../styles/TopHeaderProfile.module.css';

function TopHeaderProfile() {
    return (
        <div className={styles.top_header}>
            <img src="/logo.svg" alt="Caffagram Logo" />
            <div className={styles.icons}>
                <button className={styles.createPost}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
                <button className={styles.menuButton}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
        </div>
    )
}

export default TopHeaderProfile;