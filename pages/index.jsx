import styles from '../styles/Feed.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomHeader from '@/components/BottomHeader';
import TopHeader from '@/components/TopHeader';
import { fetchAllProfiles, fetchFeed, fetchProfileById, likePost, removeLike } from '@/utils/api';
import { UserContext } from './_app';
import LeftNavbar from '@/components/menus/LeftNavbar';
import RightProfileBar from '@/components/menus/RightProfileBar';

function Feed({ endpointPosts = [], allProfiles = [], jwt = '' }) {
    const [posts, setPosts] = useState(endpointPosts);
    const [profileImageUrl, setProfileImageUrl] = useState('/default-profile.webp');
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user && jwt) {
            fetchProfileById(user.id, jwt)
                .then(profile => {
                    const profilePic = profile.user.profilePicture || "/default-profile.webp";
                    console.log("Setting profileImageUrl to:", profilePic);
                    setProfileImageUrl(profilePic);
                })
                .catch(error => console.error("Error fetching profile:", error));
        }
    }, [user, jwt]);

    const handleLike = (id) => {
        if (!jwt) return;

        if (!(posts.find(post => post._id == id).likes.includes(user.id))) {
            likePost(id, jwt).then((_) => {
                setPosts(posts.map(post => {
                    if (post._id == id) {
                        post.liked = !post.liked;
                        post.liked ? post.likes.push(user.id) : post.likes.pop(user.id);
                    }
                    return post;
                }));
            })
        } else { handleUnlike(id) }
    }

    const handleUnlike = (id) => {
        if (!jwt) return;

        if (posts.find(post => post._id == id).likes.includes(user.id)) {
            removeLike(id, jwt).then((_) => {
                setPosts(posts.map(post => {
                    if (post._id == id) {
                        post.liked = !post.liked;
                        post.likes.pop(user.id);
                    }
                    return post;
                }));
            })
        }
    }

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTsC; path=/;';
        localStorage.removeItem('user');
        window.location.href = '/Login';
    }

    useEffect(() => {
        if (user) {
            allProfiles.map((profile) => {
                if (profile.friends.includes(user.id)) {
                    setFriends([...friends, profile]);
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, allProfiles])

    if (!user) { return <div>Loading...</div>; }

    return (
        <>
            <TopHeader />
      
            <div className={styles.container}>
                <LeftNavbar user={user} actual={"HOME"}/>

                <div className={styles.feed}>
                    <div className={styles.posts}>
                        {posts.map(post => (
                            <div key={post._id} data-id={post._id} className={styles.post}>
                                <div className={styles.post__top}>
                                    <div className={styles.post__top__user}>
                                        <Link href={`/${post.user.username}`}>
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
                                    <Image src={"http://localhost:3001/" + post.imageUrl} alt="Post" width={350} height={300} />
                                </div>

                                <div className={styles.post__actions}>
                                    <FontAwesomeIcon icon={post.likes.includes(post.user._id) ? faFilledHeart : faEmptyHeart} className={post.likes.includes(user.id) ? styles.post__liked : null} onClick={ () => { handleLike(post._id) } }/>
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
                                    { post.comments.length > 0 ? `View all ${post.comments.length} comments` : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <RightProfileBar user={user} jwt={jwt} friends={friends} handleLogout={handleLogout}/>
            </div>

            <BottomHeader profileImageUrl={profileImageUrl} />
        </>
    )
}

export default Feed

export async function getServerSideProps({ req }) {
    const jwt = req.cookies.token || "";
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    const posts = await fetchFeed(jwt).catch((_) => { return [] });
    const profiles = await fetchAllProfiles(jwt).catch((_) => { return [] });

    return { props: { endpointPosts: (posts != undefined ? posts : []), allProfiles: profiles, jwt: jwt } }
}