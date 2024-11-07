import styles from '@/styles/modals/CreatePostForm.module.css';

import { uploadPost } from '@/utils/api';
import React, { useState } from 'react';
import { getCookie } from 'cookies-next';

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
        if (!image || !comment ) { return alert("Image or caption field is missing!"); }

        const jwt = getCookie('token');

        uploadPost(jwt, image, comment).then((res) => {
            let postId = res._id;
            window.location.href = `/post/${postId}`;
        }).catch((err) => { console.error('Failed to upload post:', err); return alert("Error happened while trying to upload the post!"); })

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