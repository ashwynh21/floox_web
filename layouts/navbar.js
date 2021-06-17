import Image from "next/image";
import Link from "@material-ui/core/Link";
import Floox from "../components/floox";
import Button from "@material-ui/core/Button";
import React from "react";
import Panel from "../components/panel";

import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <Image src="/images/background.svg" width={1920} height={1080}/>
            </div>
            <div className={styles.background}>
                <img className={styles.image} src="/images/panel.svg"/>
            </div>

            <div className={styles.navigation}>
                <div className="floox">
                    <Floox width={144}/>
                </div>

                <div className={styles.menu}>
                    <Link href="/about">
                        <Button>About</Button>
                    </Link>
                    <Link href="/downloads">
                        <Button>Downloads</Button>
                    </Link>
                    <Link href="/contact">
                        <Button>Contact Us</Button>
                    </Link>
                </div>

                <div className={styles.logsign}>
                    <Link href="/login">
                        <Button style={{ color: '#00ADF1', boxShadow: '0 1px 4px #0001' }} className="accentbutton">Log in</Button>
                    </Link>
                    <Link href="/signup" id="signup">
                        <Button style={{ color: 'white', boxShadow: '0 1px 4px #0001' }}  className="secondarybutton">Sign up</Button>
                    </Link>
                </div>

                <Panel>
                    <div className={ styles.panel }>
                        <div>
                            <Link href="/login">
                                <Button style={{ boxShadow: '0 1px 4px #0001' }} className="accentbutton">Log in</Button>
                            </Link>
                            <Link href="/signup">
                                <Button style={{ boxShadow: '0 1px 4px #0001' }} className="accentbutton">Sign up</Button>
                            </Link>
                        </div>

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
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    )
}
