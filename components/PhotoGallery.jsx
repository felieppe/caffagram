import styles from '../styles/PhotoGallery.module.css';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function PhotoGallery({ photos }) {
    return (
        <div className={styles.gallery}>
            {photos.map((photo, index) => (
                <div key={index} className={styles.photo}>
                    <Link href={"/post/" + photo.id}><Image src={photo.imageUrl} alt={`Foto ${index + 1}`} width={300} height={300}/></Link>
                </div>
            ))}
        </div>
    );
}

export default PhotoGallery;