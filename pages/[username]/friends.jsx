import TopHeader from '@/components/TopHeader';
import styles from '@/styles/profile/Friends.module.css'
import { fetchAllProfiles, fetchProfileById } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LeftNavbar from '@/components/menus/LeftNavbar';

function ProfileFriends({ user = {}, jwt = '' }) {
    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        if (user.friends.length == 0) { return; }

        user.friends.forEach((friendID) => {
            fetchProfileById(friendID, jwt).then((friend) => {
                setFriends(prev => [...prev, friend.user]);
            }).catch((err) => { console.log(err); });
        })
    }, [user.friends])

    if (!user) { return <div>Loading...</div>; }

    return (
        <>
            <TopHeader />

            <div className={styles.container}>
                <LeftNavbar user={user} actual={"dss"}/>

                <div className={styles.friends}>
                    <div className={styles.friends__user}>
                        <Image src={user.profilePicture ? user.profilePicture : "/default-profile.webp"} width={75} height={75} alt='User'/>
                        <div className={styles.friend__user__info}>
                            <h1>@{user.username}'s friends list</h1>
                            <p>(You have {friends.length} friends)</p>
                        </div>
                    </div>
                    <div className={styles.friends__list}>
                        {friends.length > 0 ? friends.map((friend) => (
                            <div className={styles.friend} key={friend._id}>
                                <Link href={`/${friend.username}`}>
                                <Image className={styles.friend__pfp} src={friend.profilePicture ? friend.profilePicture : "/default-profile.webp"} alt="User" width={30} height={30} />
                                    <p>@{friend.username}</p>
                                </Link>
                            </div>
                        )) : <p>No friends yet.</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileFriends;

export async function getServerSideProps(context) {
    const { username } = context.query;
    if (username == null) { return { redirect: { destination: '/feed', permanent: false }} }

    const jwt = context.req.cookies.token;
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    const user = await fetchAllProfiles(jwt).then((profiles) => { return profiles.find(profile => profile.username === username) });
    if (user == undefined) { return { redirect: { destination: '/feed', permanent: false }} }

    return { props: { user, jwt } }
}