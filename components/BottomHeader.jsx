import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BottomHeader.module.css';

function BottomHeader() {
    const handleHomeClick = () => {
        window.location.href = "http://localhost:3000/";
    };
    
    return (
        <div className={styles.bottom_header}>
            <button onClick={handleHomeClick} className={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
            <img id={styles.Foto} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfOg5kIduOugqCXDAToZR-lViSJONXzAzoQ&s" alt="Foto de Perfil" />
        </div>
    )
}

export default BottomHeader;