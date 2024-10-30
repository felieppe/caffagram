import styles from '../styles/PhotoGallery.module.css';

import React from 'react';
import Image from 'next/image';

function PhotoGallery({ photos }) {
    return (
        <div className={styles.gallery}>
            {photos.map((photo, index) => (
                <div key={index} className={styles.photo}>
                    <Image src={photo} alt={`Foto ${index + 1}`}
                        width={300}
                        height={300}
                        layout="responsive"
                    />
                </div>
            ))}
        </div>
    );
}

export default PhotoGallery;