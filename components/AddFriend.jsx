import React, { useState } from 'react';
import { addFriendById } from '../utils/api';
import styles from '../styles/AddFriend.module.css';

const AddFriend = () => {
    const [isFriend, setIsFriend] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddFriend = () => {
        setIsFriend(true);
        setMessage("¡Ya son amigos!");
    };

    return (
        <div>
            {isFriend ? (
                <div>
                    <button disabled className={styles['add-friend-btn']}>
                        Amigo Agregado
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <button onClick={handleAddFriend} className={styles['add-friend-btn']}>
                    Agregar como Amigo
                </button>
            )}
        </div>
    );
};

export default AddFriend;