import React, { useState } from 'react';
import styles from '../styles/TopHeaderProfile.module.css';

function CreatePostForm({ onClose }) {
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Image:', image);
        console.log('Comment:', comment);
        onClose();
    };

    return (
        <div className={styles.createPostFormContainer}>
            <div className={styles.createPostForm}>
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <textarea placeholder="Add a comment" value={comment} onChange={handleCommentChange}></textarea>
                    <button type="submit">Post</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePostForm;