import styles from '@/styles/Notifications.module.css';

import { UserContext } from './_app';
import { useContext, useEffect, useRef, useState } from 'react';
import { fetchProfileById, getCommentById } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import LeftNavbar from '@/components/menus/LeftNavbar';
import TopHeader from '@/components/TopHeader';
import { v4 } from 'uuid';

function Notifications({ jwt = '' }) {
    const { user } = useContext(UserContext);
    const [filter, setFilter] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const isFirstRender = useRef(true)

    function handleFilterChange(e) { 
        if (e.target.innerText.toUpperCase() == filter) { return; }

        setNotifications([]);
        setFilter(e.target.innerText.toUpperCase());
    }
    
    function fetchFollowsNotifications() {
        fetchProfileById(user.id, jwt).then((myProfile) => {
            if (myProfile.user.friends.length > 0) {
                const friends = myProfile.user.friends;
                friends.forEach((friend) => {
                    if (friend._id == user.id) { return; }
                    setNotifications([...notifications, { id: v4(), type: 'FOLLOW', user: friend, msg: `${friend.username} has started following you!` }])
                })
            }
        }).catch((error) => { console.error("error", error); });
    }
    function fetchLikesNotifications() {
        fetchProfileById(user.id, jwt).then((myProfile) => {
            if (myProfile.posts.length > 0) {
                const posts = myProfile.posts;
                posts.forEach((post) => {
                    if (post.likes.length > 0) {
                        const likes = post.likes;
                        likes.forEach((like) => {
                            fetchProfileById(like, jwt).then((likedBy) => {
                                if (likedBy.user._id == user.id) { return; }
                                setNotifications([...notifications, { id: v4(), type: 'LIKE', user: likedBy.user, msg: `${likedBy.user.username} has liked your post!`, post: post }])
                            })
                        })
                    }
                })
            }
        })
    }
    function fetchCommentsNotifications() {
        fetchProfileById(user.id, jwt).then((myProfile) => {
            if (myProfile.posts.length > 0) {
                const posts = myProfile.posts;
                posts.forEach((post) => {
                    if (post.comments.length > 0) {
                        const comments = post.comments;
                        comments.forEach((comment) => {
                            getCommentById(comment, jwt).then((comment) => {
                                fetchProfileById(comment.user.id, jwt).then((commentedBy) => {
                                    if (commentedBy.user._id == user.id) { return; }
                                    setNotifications([...notifications, { id: v4(), type: 'COMMENT', user: commentedBy.user, msg: `${commentedBy.user.username} commented "${comment.content}" on your post!`, post: post }])
                                })
                            })
                        })
                    }
                })
            }
        })
    }

    async function fetchNotifications() {
        switch (filter) {
            case 'ALL':
                fetchFollowsNotifications();
                fetchLikesNotifications();
                fetchCommentsNotifications();
                break;
            case 'FOLLOWS':
                fetchFollowsNotifications();
                break;
            case 'LIKES':
                fetchLikesNotifications();
                break;
            case 'COMMENTS':
                fetchCommentsNotifications();
                break;
            default:
                break
        }
    }

    useEffect(() => { 
        if (isFirstRender.current) { isFirstRender.current = false; return; }
        fetchNotifications();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [filter])

    if (!user) { return <div>Loading...</div>; }

    return (
        <>
            <TopHeader />

            <div className={styles.container}>
                <LeftNavbar user={user} actual={"NOTIFICATIONS"}/>

                <div className={styles.notifications}>
                    <div className={styles.notifications__header}>
                        <h1>Notifications</h1>
                        <p>See what's happening</p>
                    </div>

                    <div className={styles.notifications__filters}>
                        <button className={filter == 'ALL' ? styles.filter__active : null} onClick={handleFilterChange}>All</button>
                        <button className={filter == 'FOLLOWS' ? styles.filter__active : null} onClick={handleFilterChange}>Follows</button>
                        <button className={filter == 'LIKES' ? styles.filter__active : null} onClick={handleFilterChange}>Likes</button>
                        <button className={filter == 'COMMENTS' ? styles.filter__active : null} onClick={handleFilterChange}>Comments</button>
                    </div>

                    <div className={styles.notifications__content}>
                        { notifications.map((notification) => {
                            return (
                                <div key={notification.id} className={styles.notification}>
                                    <div className={styles.notification__user}>
                                        <Image src={notification.user.profilePicture ? notification.user.profilePicture : "/default-profile.webp"} width={35} height={35} alt="User profile image" />
                                    </div>
                                    <p>{notification.msg}</p>

                                    {notification.post != null ? <Link href={"/post/" + notification.post._id}><Image className={styles.notification__post} alt="Post" src={"http://localhost:3001/" + notification.post.imageUrl} width={30} height={30}/></Link> : null}
                                </div>
                            )
                        }) }
                    </div>

                    { filter == null ? <p className={styles.notifications__empty}>Select a filter to see notifications</p> : null }
                    { filter != null && notifications.length == 0 ? <p className={styles.notifications__empty}>No notifications found</p> : null }
                </div>
            </div>
        </>
    )
}

export default Notifications;

export async function getServerSideProps({ req }) {
    const jwt = req.cookies.token || "";
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    return { props: { jwt } }
}