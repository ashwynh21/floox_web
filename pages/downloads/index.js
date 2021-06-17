import React from "react";
import styles from '../../styles/Downloads.module.css';
import Image from "next/image";
import Floox from "../../components/floox";
import Button from "@material-ui/core/Button";
import Head from "next/head";

export default function Downloads() {
    return (
        <div className={styles.list}>
            <Head>
                <title>Floox | Downloads</title>
            </Head>
            <p>Download <strong>Floox</strong> for Meta Trader</p>
            <p>Connect your account to our ecosystem and optimize your trading performance.</p>
            <div className={styles.download}>
                <div>
                    <Image src="/images/mt4.png" width={32} height={32}/>
                    <div></div>
                    <Floox/>
                    <p>Meta Trader 4 Compatible</p>
                </div>
                <div>
                    <div>
                        <p>Floox Assistance 2021</p>
                        <p>Version 0.1.0</p>
                        <p>
                            A linking solution, compatible with Meta Trader 4, designed to synchronize trading accounts
                            with the <strong>Floox</strong> ecosystem
                            to allow clients to apply customized services to automate their trading.
                        </p>
                        <Button variant={'outlined'}>release notes</Button>
                    </div>
                    <div></div>
                    <div>
                        <a target="_blank" href="https://floox.co.za/api/v1.0/assets/mql/Floox.ex4">
                            <Button className="tertbutton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="27" viewBox="0 0 22.5 27">
                                    <path
                                        d="M29.25,14.027H22.823V4.5H13.177v9.527H6.75L18,25.144ZM6.75,28.322V31.5h22.5V28.322Z"
                                        transform="translate(-6.75 -4.5)" fill="#FFFFFF"/>
                                </svg>
                                download
                            </Button>
                        </a>

                        <p>Looking for our bleeding edge technology, apply for our beta tester team and be the very
                            first to
                            try out our latest upcoming features.</p>
                        <Button variant={'outlined'}>learn more</Button>
                    </div>
                </div>
            </div>

            <div className={styles.download}>
                <div>
                    <Image src="/images/mt5.png" width={32} height={32} />
                    <div></div>
                    <Floox />
                    <p>Meta Trader 5 Compatible</p>
                </div>
                <div>
                    <div>
                        <p>Floox Assistance 2021</p>
                        <p>Version 0.1.0</p>
                        <p>
                            A linking solution, compatible with Meta Trader 5, designed to synchronize trading accounts
                            with the <strong>Floox</strong> ecosystem
                            to allow clients to apply customized services to automate their trading.
                        </p>
                        <Button variant={'outlined'}>release notes</Button>
                    </div>
                    <div></div>
                    <div>
                        <a target="_blank" href="https://floox.co.za/api/v1.0/assets/mql/Floox.ex5">
                            <Button className="tertbutton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="27" viewBox="0 0 22.5 27">
                                    <path
                                        d="M29.25,14.027H22.823V4.5H13.177v9.527H6.75L18,25.144ZM6.75,28.322V31.5h22.5V28.322Z"
                                        transform="translate(-6.75 -4.5)" fill="#FFFFFF"/>
                                </svg>
                                download
                            </Button>
                        </a>

                        <p>Looking for our bleeding edge technology, apply for our beta tester team and be the very
                            first to
                            try out our latest upcoming features.</p>
                        <Button variant={'outlined'}>learn more</Button>
                    </div>
                </div>
            </div>

            <p>
                Thank you for trying out our technology, we appreciate it.
            </p>
        </div>
    )
}
