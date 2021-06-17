import React, {useEffect, useRef} from "react";
import anime from 'animejs';
import styles from '../styles/Loader.module.css';

let load = 0;
let cursor = {
    x: 0,
    y: 0,
};

function initialize(element) {
    let minions = Array.from(element.children);

    anime({
        targets: [minions],
        translateX: (_) => Math.random() * 256 - 128 + window.screen.width * 0.46,
        translateY: (_) => Math.random() * 256 - 128 + window.screen.height * 0.4,

        duration: 0
    });
    anime({
        targets: element,
        opacity: [0, 1],
        delay: 1024,
        duration: 2048
    });

    minions = minions.map((particle) => {
        particle.px = particle.getBoundingClientRect().x;
        particle.py = particle.getBoundingClientRect().y;
        particle.vx = 0;
        particle.vy = 0;
        particle.rotate = Math.random() * 360 - 180;

        return particle;
    });

    document.addEventListener('mousemove', (event) => {
        cursor = {x: event.clientX, y: event.clientY};
    });
}
function primephysics(element) {
    let minions = Array.from(element.children);

    const force = (pointa, pointb, axis) => {
        const r = Math.sqrt((pointa.px - pointb.px) ** 2 + (pointa.py - pointb.py) ** 2);

        const h = 1;
        const g = 1e1;
        const e = Math.random() * 1e1;
        const x = 1e-10;
        const dx = axis ? pointa.px - pointb.px : pointa.py - pointb.py;

        const center = () => {
            const c = Math.sqrt((window.innerWidth / 2 - pointa.px) ** 2 + (window.innerHeight / 2 - pointa.py));
            const cx = axis ? window.innerWidth / 2 - pointa.px : window.innerHeight / 2 - pointa.py;
            const result = cx / c ** 3;

            if(isNaN(result)) return 0;

            return -result;
        };
        const repulsive = () => {
            return h ** 2 * (g * (dx / r ** 3))
                - 1E1 * dx * r ** 2 * x + dx * (Math.random() - 0.5) * 1e-3;
        };
        const cursive = () => {
            const cr = Math.sqrt((pointa.px - cursor.x) ** 2 +  (pointa.py - cursor.y) ** 2);
            const cx = (axis ? pointa.px - cursor.x : pointa.py - cursor.y);

            return cr > window.innerWidth * 0.2 ? 0 : 10 * e * (h ** 2) * (g * (cx / cr ** 3));
        };

        return repulsive() + cursive();
    };
    const boundary = (pointa, axis) => {
        let result = 0;
        const margin = 16;

        if (axis) {
            if (pointa.px <= margin) { result += margin - pointa.px; }
            else if (pointa.px >= window.innerWidth - margin) { result += (window.innerWidth - margin - pointa.px); }

            return result;
        }
        if (pointa.py <= margin) { result += margin - pointa.py; }
        else if (pointa.py >= window.innerHeight - margin) { result += (window.innerHeight - margin - pointa.py); }

        return result;
    };

    minions = minions.map((particle) => {
        const friction = 0.98;

        particle.thread = false;

        const repeat = (p) => {
            requestAnimationFrame((_) => {
                /* So here we need to get the position of this particle as well as the position of other
                * particles to begin our computation. */
                minions.filter((p) => p !== particle)
                    .forEach((partner) => {

                        particle.px = particle.px + particle.vx;
                        particle.py = particle.py + particle.vy;

                        particle.vx = particle.vx * friction + force(particle, partner, true) + boundary(particle, true);
                        particle.vy = particle.vy * friction + force(particle, partner, false) + boundary(particle, false);

                        particle.rotate = particle.rotate + (particle.rotate < 0 ? -1 : 1) * ((Math.random()) * 0.05);

                        particle.setAttribute('style', `transform: translateX(${particle.px}px) translateY(${particle.py}px) rotateZ(${particle.rotate}deg)`)

                    });
                if(!p.thread) {
                    repeat(p);
                }
            });
        }
        repeat(particle);

        return particle;
    });
}
function stopanimation(element) {
    let minions = Array.from(element.children);

    return Promise.all(minions.reverse().map(m => {
        return new Promise((resolve) => {
            setTimeout(() => {
                m.thread = true;

                requestAnimationFrame(() =>
                    m.setAttribute(
                        'style',
                        `transform: translateX(${window.innerWidth * 0.5 - 48}px) translateY(${window.innerHeight * 0.5 - 24}px) rotateZ(0deg); transition-duration: 0.32s;`
                    )
                );
                setTimeout(resolve, 256);
            }, (minions.indexOf(m) + 1) * 64 + 256);
        });
    }))
        .then(async () => {
            await anime({
                targets: minions,
                scale: [1, 0],
                opacity: {
                    value: [1, 0],
                    duration: 14
                },
                translateX: window.innerWidth * 0.5,
                translateY: window.innerHeight * 0.5 - 32,
                duration: 256,
                delay: 1200,
                easing: 'linear'
            }).finished;

            return new Promise(resolve => setTimeout(resolve, 388));
        });

}

export default function Loader({ onLoad }) {
    const text = useRef(undefined);
    const groups = useRef(undefined);

    useEffect(() => {

        const timer = setInterval(() => {
            const count = load % 3;

            load = load + 1;

            if(text.current) {
                text.current.innerHTML = `loading${(new Array(count + 2)).join('.')}`;
            }
        }, 880);

        initialize(groups.current);
        primephysics(groups.current);

        setTimeout(() => {
            stopanimation(groups.current)
                .then(() => {
                    clearInterval(timer);

                    onLoad(false);
                    // connector(io(server, { transports: ['websocket'] }));
                });
        }, 3000);

    }, []);

    return (
        <div className={styles.host}>
            <svg className={styles.svg} ref={groups} xmlns="http://www.w3.org/2000/svg">
                <polygon className={styles.st0}
                         points="3.3,1.6 3.3,23.5 10.4,23.5 10.4,15.8 16.5,15.8 16.5,11.4 10.4,11.4 10.4,8 19.3,8 19.3,1.6 "/>
                <polygon className={styles.st0} points="19.3,23.5 40.7,23.5 40.7,16.4 26.5,16.4 26.5,1.6 19.3,1.6 "/>
                <path className={styles.st0}
                      d="M48.8,12.5c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7s2.1-4.7,4.7-4.7C46.6,7.8,48.8,9.9,48.8,12.5zM44,0.8c-6.5,0-11.7,5.3-11.7,11.7S37.6,24.3,44,24.3S55.8,19,55.8,12.5S50.5,0.8,44,0.8z"/>
                <path className={styles.st0}
                      d="M65.4,12.5c0,2.6-2.1,4.7-4.7,4.7s-4.7-2.1-4.7-4.7s2.1-4.7,4.7-4.7S65.4,9.9,65.4,12.5z M60.7,0.8c-6.5,0-11.7,5.3-11.7,11.7s5.3,11.7,11.7,11.7S72.4,19,72.4,12.5S67.1,0.8,60.7,0.8z"/>
                <polygon className={styles.st1}
                         points="79.1,12.5 75.2,19.3 72.7,23.6 64.8,23.6 71.2,12.5 64.9,1.5 72.8,1.5 75.2,5.6 "/>
                <polygon className={styles.st0} points="85.4,1.5 79.1,12.5 75.2,5.6 77.5,1.5 "/>
                <polygon className={styles.st0} points="85.5,23.6 77.6,23.6 75.2,19.3 79.1,12.5 "/>
                <polygon className={styles.st1}
                         points="99.8,12.6 95.8,19.5 93.5,23.6 85.5,23.6 91.9,12.6 85.5,1.5 93.4,1.5 95.8,5.7 "/>
            </svg>
            <p className={styles.load} ref={text}></p>
        </div>
    )
}
