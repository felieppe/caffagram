import LeftNavbar from '@/components/menus/LeftNavbar';
import TopHeader from '@/components/TopHeader';
import styles from '@/styles/Explore.module.css';

import { UserContext } from './_app';
import { useContext, useEffect, useState } from 'react';
import { fetchAllProfiles } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';

function Explore({ jwt = '' }) {
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]);

    function handleSearchChange(e) {
        setSearch(e.target.value);
        handleSearch()
    }

    function handleSearch() {
        fetchAllProfiles(jwt).then(((ps) => {
            setProfiles(ps.filter((p) => p.username.toLowerCase().includes(search.toLowerCase())));
        })).catch((err) => { console.log(err); });
    }

    useEffect(() => {
        handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) { return <div>Loading...</div>; }

    return (
        <>
            <TopHeader />

            <div className={styles.container}>
                <LeftNavbar user={user} actual={"EXPLORE"}/>

                <div className={styles.explore}>
                    <div className={styles.explore__header}>
                        <h1>Explore</h1>
                        <p>Find new friends</p>
                    </div>

                    <input type="text" placeholder="Search for friends" value={search} onChange={handleSearchChange}/>
                
                    <div className={styles.results}>
                        { profiles.map((profile) => (
                            <div key={profile.id} className={styles.result}>
                                <Link href={`/${profile.username}`}>
                                    <Image alt="User" src={profile.profilePicture ? profile.profilePicture : "/default-profile.webp"} width={30} height={30}/>
                                    
                                    <div className={styles.result__info}>
                                        <h3>{profile.username}</h3>
                                        <p>{profile.bio}</p>
                                    </div>
                                </Link>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore;

export async function getServerSideProps({ req }) {
    const jwt = req.cookies.token || "";
    if (jwt == null || jwt == "") { return { redirect: { destination: '/Login', permanent: false }} }

    return { props: { jwt } }
}