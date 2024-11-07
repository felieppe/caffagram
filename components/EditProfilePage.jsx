import React, { useState } from "react";
import styles from '../styles/EditProfilePage.module.css'; // Importar correctamente el módulo CSS

function EditProfilePage({ profileData, onSave, onCancel }) {
    const [profile, setProfile] = useState(profileData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(profile);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onCancel}>&times;</span>
                <h2 className={styles.h2}>Edit Profile</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Profile Picture URL:</label>
                        <input
                            type="text"
                            name="profilePicture"
                            value={profile.profilePicture}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Description:</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleInputChange}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.formButtons}>
                        <button type="button" onClick={handleSave} className={styles.button}>Save</button>
                        <button type="button" onClick={onCancel} className={styles.button}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage;