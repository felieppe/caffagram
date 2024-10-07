import '../styles/global.css'

import Head from 'next/head'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>Caffagram</title>
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default App