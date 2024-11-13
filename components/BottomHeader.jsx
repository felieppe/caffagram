import styles from '../styles/BottomHeader.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Image from 'next/image';

function BottomHeader({ profileImageUrl }){
    console.log("Profile Image URL in BottomHeader:", profileImageUrl);
    const handleHomeClick = () => {
        window.location.href = "http://localhost:3000/";
    };
    return (
        <div className={styles.bottom_header}>
            <button onClick={handleHomeClick}  className={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
            <Image id={styles.Foto} src={profileImageUrl } alt="Foto de Perfil" width={30} height={30}/>
        </div>
    )
}

export default BottomHeader;