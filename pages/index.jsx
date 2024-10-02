import React from 'react';
import styles from '../styles/Home.module.css';
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';

function Home() {
    return (
        <>
            <TopHeader />
            <h1>Welcome to Caffagram!</h1>
            <BottomHeader />
        </>
    )
}

export default Home