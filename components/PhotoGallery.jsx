import React from 'react';
import styles from '../styles/PhotoGallery.module.css';

function PhotoGallery({ photos }) {
    return (
        <div className={styles.gallery}>
            {photos.map((photo, index) => (
                <div key={index} className={styles.photo}>
                    <img src={photo} alt={`Foto ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default PhotoGallery;