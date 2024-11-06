import styles from '@/styles/PostView.module.css';  

import React from 'react';
import TopHeader from '@/components/TopHeader';
import BottomHeader from '@/components/BottomHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeed } from '@/utils/api';

function PostView({ post }) {
    const handleLike = (postId, userId) => {
        console.log(`Liked post ${postId} by user ${userId}`);
    };

    console.log(post)

    return (
        <>
            <TopHeader username={post.user.username} profilePicture={post.user.profilePicture} />
          
          <div className={styles.post_move}>
            <div className={styles.post}>
                <div className={styles.post__top}>
                    <Link href={`/profile/${post.user.username}`}>
                        <Image 
                            className={styles.post__top__user__img} 
                            src={post.user.profilePicture ? post.user.profilePicture : "/default-profile.webp"} 
                            alt="User" 
                            width={40} 
                            height={40} 
                        />
                    </Link>
                    <p>@{post.user.username}</p>
                    <div className={styles.post__top__options}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>

                

                <div className={styles.post__image}>
                    <Image 
                        src={post.imageUrl} 
                        alt="Post" 
                        width={400} 
                        height={400} 
                    />
                </div>

                <div className={styles.post__actions}>
                    <FontAwesomeIcon 
                        icon={post.likes.includes(post.user._id) ? faFilledHeart : faEmptyHeart} 
                        className={post.likes.includes(post.user._id) ? styles.post__liked : null} 
                        onClick={() => handleLike(post._id, post.user._id)} 
                    />
                    <FontAwesomeIcon icon={faComment} />
                </div>

                <div className={styles.post__likes}>
                    {post.likes.length} Likes
                </div>

                <div className={styles.post__comments}>
                    {post.comments.length > 0 ? (
                        <div>
                            <p>View all {post.comments.length} comments</p>
                            {post.comments.map(comment => (
                                <div key={comment._id} className={styles.comment}>
                                    <b>{comment.user.username}</b> {comment.text}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No comments yet.</p>
                    )}
                  </div>
            </div>
          </div>

            <BottomHeader profileImageUrl={post.user.profilePicture} />
        </>
    );
};

export default PostView;

export async function getServerSideProps(context) {
    const { id } = context.query
    if (id == null) { return { redirect: { destination: '/feed', permanent: false }} }

    const jwt = context.req.cookies.token;
    if (jwt == null) { return { redirect: { destination: '/Login', permanent: false }} }

    const post = await fetchFeed(jwt).then((posts) => { return posts.find(post => post._id === id) });
    if (post == undefined) { return { redirect: { destination: '/feed', permanent: false }} }

    return { props: { post: (post != undefined ? post : {}) } };
}