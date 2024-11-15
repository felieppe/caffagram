import styles from '@/styles/menus/LeftNavbar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome, faInbox, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function LeftNavbar({ user, actual }) {
    return (
        <>
            <div className={styles.left__menu}>
                <ul>
                    {/* Near every Link redirects to / because not handler of that pages are created. */}
                    <li className={actual == "HOME" ? styles.left__menu__active : null}><Link href="/"><FontAwesomeIcon icon={faHome}/> Home</Link></li>
                    <li className={actual == "EXPLORE" ? styles.left__menu__active : null}><Link href="/"><FontAwesomeIcon icon={faMagnifyingGlass} /> Explore</Link></li>
                    <li className={actual == "MESSAGES" ? styles.left__menu__active : null}><Link href="/"><FontAwesomeIcon icon={faInbox} /> Messages</Link></li>
                    <li className={actual == "NOTIFICATIONS" ? styles.left__menu__active : null}><Link href="/"><FontAwesomeIcon icon={faBell} /> Notifications</Link></li>
                    <li className={actual == "PROFILE" ? styles.left__menu__active : null}><Link href={`/` + user.username}><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
                </ul>
            </div>
        </>
    )
}

export default LeftNavbar;