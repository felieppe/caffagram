import styles from '../styles/Feed.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomHeader from '@/components/BottomHeader';
import TopHeader from '@/components/TopHeader';
import { fetchFeed, fetchProfileById, likePost } from '@/utils/api';

function Feed({ endpointPosts = [], jwt = '' }) {
    const [posts, setPosts] = useState(endpointPosts);

    const handleLike = (id, userId) => {
        if (!jwt) return;

        // You can only like a post once, but it is not implemented the way to unlike the photo.
        if (!(posts.find(post => post._id == id).likes.includes(userId))) {
            console.log(jwt)
            likePost(id, jwt).then((_) => {
                setPosts(posts.map(post => {
                    if (post._id == id) {
                        post.liked = !post.liked;
                        post.liked ? post.likes.push(post.user._id) : post.likes.pop(post.user._id);
                    }
                    return post;
                }));
            })
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
                                    <Link href={`/profile/${post.user.username}`}>
                                        {/* I suppose this wont work. Backend does not server images URL well, just gives source path. */}
                                        {/* It is not performance-friendly to fetch twice the profile just for getting the profile picture URL. */}
                                        <Image className={styles.post__top__user__img} src={fetchProfileById(post.user._id, jwt).profilePicture ? fetchProfileById(post.user._id, jwt).profilePicture : "/default-profile.webp"} alt="User" width={30} height={30} />
                                    </Link>
                                    <p>@{post.user.username}</p>
                                </div>

                                <div className={styles.post__top__options}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </div>

                            <div className={styles.post__image}>
                                {/* Backend should server URL with image's source too. Impossible to import dynamically every image SRC from require(). */}
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
            {/* <BottomHeader profileImageUrl={fetchProfile(jwt).profilePicture || ""}/> */}
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