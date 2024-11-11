import styles from '@/styles/PostView.module.css';  

import React, { useContext, useEffect, useState } from 'react';
import TopHeader from '@/components/TopHeader';
import BottomHeader from '@/components/BottomHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeed, likePost, removeLike, fetchProfileById, addComment, commentPost, getCommentById } from '@/utils/api';
import { UserContext } from '../_app';
import { useRouter } from 'next/router';

function PostView({ endpointPost = {}, jwt = '' }) {
    const [post, setPost] = useState(endpointPost);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { user } = useContext(UserContext);
    const [showComments, setShowComments] = useState(false);
    const Router = useRouter();

    const handleLike = (id) => {
        if (!jwt) return;

        if (!(post.likes.includes(user.id))) {
            likePost(id, jwt).then((_) => {
                if (post._id == id) { setPost({ ...post, liked: !post.liked, likes: post.likes.includes(user.id) ? post.likes.filter(like => like != user.id) : [...post.likes, user.id] }); }
            })
        } else { handleUnlike(id) }
    }

    const handleUnlike = (id) => {
        if (!jwt) return;

        removeLike(id, jwt).then((_) => { setPost({ ...post, liked: !post.liked, likes: post.likes.filter(like => like != user.id) }); })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!jwt || comment.trim() === '') return;

        commentPost(post._id, jwt, comment).then(newComment => {
            Router.reload()
            setComment('');
        });
    }

    const handleShowComments = () => { setShowComments(!showComments); }

    useEffect(() => {
        const fetchComments = async () => {
            try {
              const commentPromises = post.comments.map(commentID => 
                getCommentById(commentID, jwt)
              );
              const fetchedComments = await Promise.all(commentPromises);
              setComments(fetchedComments); 
            } catch (error) {
              console.error("Error fetching comments:", error);
            }
        };
      
        fetchComments();
    }, [post.comments, jwt])

    if (!user) { return <div>Loading...</div>; }

    return (
        <>
          <TopHeader username={post.user.username} profilePicture={post.user.profilePicture} />
          
          <div className={styles.post_move}>
            <div className={styles.post}>
                <div className={styles.post__top}>
                    <Link href={`/${post.user.username}`}>
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
                        src={"http://localhost:3001/" + post.imageUrl} 
                        alt="Post" 
                        width={400} 
                        height={400} 
                    />
                </div>

                <div className={styles.post__actions}>
                    <FontAwesomeIcon 
                        icon={post.likes.includes(user.id) ? faFilledHeart : faEmptyHeart} 
                        className={post.likes.includes(user.id) ? styles.post__liked : null} 
                        onClick={() => handleLike(post._id)} 
                    />
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
                    { post.comments.length > 0 ? (
                        <>
                            { comments.slice(0, (showComments ? comments.length : 2)).map(comment => (
                                <div key={comment._id} className={styles.comment}> 
                                    <b>{comment.user.username}</b> {comment.content}
                                </div>
                            )) }
                            <p onClick={handleShowComments} style={{margin: 0, marginTop: 5, opacity: '0.4'}}>{showComments ? `View all ${post.comments.length} comments` : 'Hide all comments'}</p>
                        </>
                    ) : (
                        <p>No comments yet.</p>
                    )} 
                </div>

                <form onSubmit={handleCommentSubmit} className={styles.comment_form}>
                    <input 
                        type="text" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Add a comment..." 
                        className={styles.comment_input}
                    />
                    <button type="submit" className={styles.comment_button}>Post</button>
                </form>
            </div>
          </div>

          <BottomHeader profileImageUrl={fetchProfileById(user.id, jwt).profilePicture || ""}/>
        </>
    );
};

export default PostView;

export async function getServerSideProps(context) {
    const { id } = context.query
    if (id == null) { return { redirect: { destination: '/', permanent: false }} }

    const jwt = context.req.cookies.token;
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    const post = await fetchFeed(jwt).then((posts) => { return posts.find(post => post._id === id) });
    if (post == undefined) { return { redirect: { destination: '/', permanent: false }} }

    return { props: { endpointPost: (post != undefined ? post : {}), jwt } };
}