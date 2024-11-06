import React, { useState } from 'react';
import { addFriendById} from '../utils/api';
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
                    <button disabled style={{ backgroundColor: 'lightgrey' }}>
                        Amigo Agregado
                    </button>
                    <p>{message}</p> {/* Mostrar el mensaje de confirmación */}
                </div>
            ) : (
                <button onClick={handleAddFriend}>
                    Agregar como Amigo
                </button>
            )}
        </div>
    );
};

export default AddFriend;
