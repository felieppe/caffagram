import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BottomHeader.module.css';

function BottomHeader() {
    return (
        <div className={styles.bottom_header}>
            <button className={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
            <img id={styles.Foto} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfOg5kIduOugqCXDAToZR-lViSJONXzAzoQ&s" alt="Foto de Perfil" />
        </div>
    )
}

export default BottomHeader;