import '../styles/global.css'

import { createContext, useEffect, useMemo, useState } from 'react';
import Head from 'next/head'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

export const UserContext = createContext();

function App({ Component, pageProps }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) { setUser(JSON.parse(storedUser)); }
    }, [])

    useEffect(() => {
        if (user) { localStorage.setItem('user', JSON.stringify(user)); }
    }, [user])

    const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Caffagram</title>
            </Head>

            <UserContext.Provider value={userMemo}>
                <Component {...pageProps} />
            </UserContext.Provider>
        </>
    );
}

export default App;
