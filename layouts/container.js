import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import Head from "next/head";

export default function Container({ children }) {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <Navbar />
            { children }
            <Footer />
        </div>
    )
}
