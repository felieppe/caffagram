import react from 'react';
import styles from '../styles/EditProfileButton.module.css';

function EditProfileButton({ onEdit}){
    return (
        <button className={styles['edit-profile-btn']} onClick={onEdit}>
            Edit Profile
        </button>
    );
}
export default EditProfileButton;