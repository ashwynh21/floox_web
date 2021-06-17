import React from "react";
import Image from "next/image";

import styles from '../../styles/About.module.css';

export default function About() {
    return (
        <>
            <p className={styles.topic}>
                Automating the hard parts about Trading
            </p>
            <div className={styles.start}>
                Hi, let us tell you bit by bit, the story that has brought <strong>Floox</strong>
                to where it is now. It is crazy when we think back on how loosely the idea began,
                yet here we are, a fully integrated platform where traders can commune 😁.
            </div>

            <div className={styles.about}>
                <div>
                    <p>Where <strong>Floox</strong> began 🧐</p>
                    <div>
                        <p>"Everything begins with an idea."</p>
                        <p> - Earl Nightingale - </p>
                    </div>
                    <p>
                        So all our founders are from Eswatini by the way, and we have all known each other
                        from one place or the other. We met in Ezulwini for trading lessons and that is
                        where we had a casual discussion into realizing one of us was a programmer and so the
                        query came up about developing indicators for MT4/5 e.t.c.

                        We got really creative with our thoughts and quite simply decided to start a project
                        on it, and here we are.
                    </p>
                </div>
                <div>
                    <p>What does <strong>Floox</strong> do? 🤷</p>
                    <p>
                        <strong>Floox</strong> is a trading service platform that offers many different ways
                        to automate your trading using MT4/5. It's really quite easy to link many of your trading
                        accounts with <strong>Floox</strong>, <strong>Floox</strong> actually allows you a great
                        set of ways to manage and optimize your strategies.
                    </p>
                    <p>
                        <strong>Floox</strong> is built to understand the frustration of not being able to follow
                        a strategy and allows you to implement a way to use it diligently by letting you link
                        it with our automation system.
                    </p>
                </div>
                <div>
                    <p>Get in touch with us 👋</p>
                    <p>
                        So there's quite a few of us on the <strong>Floox</strong> team, and we are each
                        responsible for different functions in <strong>Floox</strong>.
                    </p>
                </div>
                <div>
                    <p>The <strong>Floox</strong> road map</p>
                    <p>
                        With all the work that we have planned for <strong>Floox</strong> we pretty much have our hands
                        tied for the next year or so. The general idea or approach we are discussing is
                        creating <strong>Floox</strong>
                        to be better at integrating with our clients.
                    </p>
                    <p>
                        However, if you want to keep up with the features our developer team is working on you should
                        check out the
                        release notes we have on our <a target="_blank" href="https://www.github.com/ashwynh21/floox_web">github</a>.
                        Here you will
                        get to open discussion on issues you might be experiencing or features you would like directly
                        with the
                        developer team.
                    </p>
                </div>

                <div>
                    <p>Hang out with us 😎</p>
                    <p>
                        We all have our preffered areas to lurk on, but as <strong>Floox</strong> you can catch mostly
                        on
                        <a target="_blank" href="https://www.instagram.com/floox"><Image src="/icons/instagram.svg" width={16} height={16}/></a>. We will be expanding in future, just at the
                        moment we might not have the man power to naturally catch us on any other social media platform.
                    </p>
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
