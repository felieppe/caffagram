import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function BottomHeader() {
    return (
        <div className="bottom-header">
            <button className='homeButton'>
                <FontAwesomeIcon icon={faHouse} />
            </button>
            <img id = "Foto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfOg5kIduOugqCXDAToZR-lViSJONXzAzoQ&s" alt="Foto de Perfil" />
        </div>
    )
}

export default BottomHeader;