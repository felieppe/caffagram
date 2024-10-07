import styles from '../styles/Feed.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomHeader from '@/components/BottomHeader';
import TopHeader from '@/components/TopHeader';

function Feed() {
    const [posts, setPosts] = useState([{ id: 1, user: 'zaragsadelsabooooh', pfp: '/zarasa.jpg', description: '@bisa somo nojotro', likes: 33, comments: 3, image: '/posts/biza.jpg', liked: false }, { id: 2, user: 'zaragsadelsabooooh', pfp: '/zarasa.jpg', description: 'Que andas bizacaffa', likes: 33, comments: 3, image: '/posts/biza.jpg', liked: false }]);

    const handleLike = (postId) => {
        const newPosts = posts.map(post => {
            if (post.id == postId) {
                post.liked = !post.liked;
                post.liked ? post.likes++ : post.likes--;
            }
            return post;
        });

        setPosts(newPosts);
    }

    return (
        <>
            <TopHeader />

            <div className={styles.feed}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <div key={post.id} data-id={post.id} className={styles.post}>
                            <div className={styles.post__top}>
                                <div className={styles.post__top__user}>
                                    <Link href={`/profile/${post.user}`}>
                                        <Image className={styles.post__top__user__img} src={post.pfp} alt="User" width={30} height={30} />
                                    </Link>
                                    <p>@{post.user}</p>
                                </div>

                                <div className={styles.post__top__options}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </div>

                            <div className={styles.post__image}>
                                <Image src={post.image} alt="Post" width={350} height={300} />
                            </div>

                            <div className={styles.post__actions}>
                                <FontAwesomeIcon icon={post.liked ? faFilledHeart : faEmptyHeart} className={post.liked ? styles.post__liked : null} onClick={ () => { handleLike(post.id) } }/>
                                <FontAwesomeIcon icon={faComment} />
                            </div>

                            <div className={styles.post__likes}>
                                {post.likes} Likes
                            </div>

                            <div className={styles.post__description}>
                                <b>{post.user}</b>
                                <p>{post.description}</p>
                            </div>

                            <div className={styles.post__comments}>
                                View all {post.comments} comments
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomHeader />
        </>
    )
}

export default Feed