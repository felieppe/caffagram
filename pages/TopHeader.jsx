import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';


function TopHeader() {
    return (
        <div className="top-header">
            <h1>Caffagram</h1>
            <div className="button-group">
                <button className='likeButton'>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className='createPost'>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
        </div>
    )
}

export default TopHeader;