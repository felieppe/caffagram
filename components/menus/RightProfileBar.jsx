import styles from '@/styles/menus/RightProfileBar.module.css';

import { fetchProfileById } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

function RightProfileBar({ user, jwt, friends, handleLogout }) {
    return (
        <>
            <div className={styles.right__menu}>
                <div className={styles.right__menu__user}>
                    <Image src={fetchProfileById(user.id, jwt).profilePicture ? fetchProfileById(user.id, jwt).profilePicture : "/default-profile.webp"} alt="User" width={35} height={35} />
                    <p>@{user.username}</p>

                    <div className={styles.right__menu__user__logout}>
                        <Link href="/Login" onClick={handleLogout} style={{textDecoration: 'none', color: '#6E260E', fontSize: "10pt", fontWeight: "bold"}}>Logout</Link>
                    </div>
                </div>

                <div className={styles.right__menu__friends}>
                    <h3>Friends</h3>

                    {friends.length > 0 ? (<ul className={styles.right__menu__friends__list}>
                        { friends.slice(0, 3).map(friend => {
                                
                            return (
                                <li key={friend._id} className={styles.user__friend}>
                                    <Link href={"/" + friend.username} style={{display: "flex", alignItems: "center"}}><Image src={friend.profilePicture ? friend.profilePicture : "/default-profile.webp"} alt="User" width={30} height={30} /></Link>
                                    <Link href={"/" + friend.username} className={styles.user__friend__name}><p>@{friend.username}</p></Link>
                                </li>
                            )
                        }) }
                    </ul>) : (
                        <p className={styles.right__menu__friends__empty}>No friends yet.</p>
                    )}

                    { friends.length > 3 ? <Link href={"/" + user.username + "/friends"} className={styles.right__menu__friends__alot}><p>View all your friends</p></Link> : null }
                </div>
            </div>
        </>
    )
}

export default RightProfileBar;