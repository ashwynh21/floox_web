import React from "react";
import Link from 'next/link';
import Button from "@material-ui/core/Button";
import Floox from '../components/floox';


import styles from '../styles/Footer.module.css';
import Rater from "../components/rater";


export default function Footer() {

    return (
        <div className={styles.footer}>
            <div>
                <div>
                    <Link href="/about">
                        <Button>About</Button>
                    </Link>
                    <Link href="/downloads">
                        <Button>Downloads</Button>
                    </Link>
                    <Link href="/contact">
                        <Button>Contact Us</Button>
                    </Link>
                    <Link href="/policy#terms">
                        <Button>Terms &amp; Conditions</Button>
                    </Link>
                    <Link href="/policy#privacy">
                        <Button>Privacy Policy</Button>
                    </Link>
                    <Link href="/policy#disclaimer">
                        <Button>Disclaimer</Button>
                    </Link>
                </div>
                <div>
                    <p>Any suggestions that you think could really help improve the Floox platform? Send us an email
                        with your entailments, or you could otherwise give us a rating 😬.</p>
                    <p>info@floox.co.za</p>
                    <Rater/>
                </div>
            </div>
            <div>
                <div>
                    <Floox flat/>
                </div>
                <p>&copy; Copyrights 2021</p>
            </div>
        </div>
    )
}
