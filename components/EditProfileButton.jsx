import react from 'react';


function EditProfileButton({ onEdit}){
    return (
        <button className={styles['edit-profile-btn']} onClick={onEdit}>
            Edit Profile
        </button>
    );
}
export default EditProfileButton;