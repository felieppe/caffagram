import styles from '../styles/Feed.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomHeader from '@/components/BottomHeader';
import TopHeader from '@/components/TopHeader';
import { fetchFeed, fetchProfileById, likePost, removeLike } from '@/utils/api';

function Feed({ endpointPosts = [], jwt = '' }) {
    const [posts, setPosts] = useState(endpointPosts);

    const handleLike = (id, userId) => {
        if (!jwt) return;
    
        if (!(posts.find(post => post._id == id).likes.includes(userId))) {
            likePost(id, jwt).then((_) => {
                setPosts(posts.map(post => {
                    if (post._id == id) {
                        post.liked = true;
                        post.likes.push(userId);
                    }
                    return post;
                }));
            }).catch(error => {
                console.error("Error liking the post:", error);
            });
        } else { handleUnlike(id, userId) }
    }

    const handleUnlike = (id, userId) => {
        if (!jwt) return;

        if (posts.find(post => post._id == id).likes.includes(userId)) {
            removeLike(id, jwt).then((_) => {
                setPosts(posts.map(post => {
                    if (post._id == id) {
                        post.liked = false;
                        post.likes = post.likes.filter(likeId => likeId !== userId);
                    }
                    return post;
                }));
            }).catch(error => {
                console.error("Error unliking the post:", error);
            });
        }
    }

    return (
        <>
            <TopHeader />

            <div className={styles.feed}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <div key={post._id} data-id={post._id} className={styles.post}>
                            <div className={styles.post__top}>
                                <div className={styles.post__top__user}>
                                    <Link href={`/${post.user.username}`}>
                                        <Image className={styles.post__top__user__img} src={fetchProfileById(post.user._id, jwt).profilePicture ? fetchProfileById(post.user._id, jwt).profilePicture : "/default-profile.webp"} alt="User" width={30} height={30} />
                                    </Link>
                                    <p>@{post.user.username}</p>
                                </div>

                                <div className={styles.post__top__options}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </div>

                            <div className={styles.post__image}>
                                <Image src={""} alt="Post" width={350} height={300} />
                            </div>

                            <div className={styles.post__actions}>
                                <FontAwesomeIcon icon={post.likes.includes(post.user._id) ? faFilledHeart : faEmptyHeart} className={post.liked ? styles.post__liked : null} onClick={ () => { handleLike(post._id, post.user._id) } }/>
                                <FontAwesomeIcon icon={faComment} />
                            </div>

                            <div className={styles.post__likes}>
                                {post.likes.length} Likes
                            </div>

                            <div className={styles.post__description}>
                                <b>{post.user.username}</b>
                                <p>{post.caption}</p>
                            </div>

                            <div className={styles.post__comments}>
                                { post.comments.length > 0 ? `View all {post.comments.length} comments` : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomHeader profileImageUrl = {""}/>
        </>
    )
}

export default Feed

export async function getServerSideProps({ req }) {
    const jwt = req.cookies.token || "";
    if (jwt == null) { return { redirect: { destination: '/Login', permanent: false }} }

    const posts = await fetchFeed(jwt).catch((_) => { return [] });
    return { props: { endpointPosts: (posts != undefined ? posts : []), jwt: jwt } }
}
