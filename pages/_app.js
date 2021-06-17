import '../styles/globals.css'
import React, {useState} from "react";
import Container from "../layouts/container";
import Loader from "../components/loader";

function MyApp({ Component, pageProps }) {
    const [loading, set] = useState(true);

    if(loading) {
        return <Loader onLoad={set}/>
    }

    return (
        <Container>
            <Component {...pageProps} />
        </Container>
    )
}

export default MyApp
