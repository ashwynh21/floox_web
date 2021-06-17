import React, {useEffect, useRef, useState} from "react";

import styles from '../styles/Panel.module.css';
import anime from "animejs";
import IconButton from "@material-ui/core/IconButton";

export default function Panel({ children }) {
    const [toggled, set] = useState(false);
    const container = useRef(undefined);

    const togglemenu = (e) => {
        const svg = e.target.querySelector('svg');
        const bottom = svg.children.bottom;
        const top = svg.children.top;

        function open() {
            anime({
                targets: [bottom],
                duration: 750,
                stroke: '#FFFFFF',
                points: '11.4,11.4,22,22 32.6,32.6'
            });
            anime({
                targets: [top],
                duration: 750,
                stroke: '#FFFFFF',
                points: '11.4,32.6 22,22 32.8,11.2'
            });
            anime({
                targets: [container.current],
                right: '-20vw',
                duration: 444,
                easing: 'easeOutCubic'
            });
        }
        function close() {
            anime({
                targets: [bottom],
                duration: 750,
                stroke: '#5086b6',
                points: '2.1,17.2,21.3,17.2 40.6,17.2'
            });
            anime({
                targets: [top],
                duration: 750,
                stroke: '#5086b6',
                points: '24.1,28.2 32.3,28.2 40.6,28.2'
            });
            anime({
                targets: [container.current],
                right: '-100vw',
                duration: 360,
                easing: 'easeInCubic'
            });
        }

        if(!toggled) {
            set(true);

            open();
            document.body.classList = ['noscroll'];
        } else {
            set(false);

            close();
            document.body.classList = [];
        }
    }

    return (
        <div className={ styles.host }>
            <IconButton size={'small'} className={ styles.button } onClick={ togglemenu }>
                <svg className={ styles.svg } id="svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="44px" height="44px" viewBox="0 0 44 44">
                    <polyline className={ styles.top } id="top" points="2.1,17.2,21.3,17.2 40.6,17.2 "/>
                    <polyline className={ styles.bottom } id="bottom" points="24.1,28.2 32.3,28.2 40.6,28.2 "/>
                </svg>
            </IconButton>

            <div className={ styles.container } ref={container}>
                { children }
            </div>

        </div>
    )
}
