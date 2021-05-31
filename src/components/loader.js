/*
* Here we are going to create a loading icon that will be separate from the main icon that we use for the logo
* */

import { PolymerElement, html } from "@polymer/polymer/polymer-element";

class Button extends PolymerElement {

    static get properties() {
        return {};
    }
    static get template () {
        return html`
            <style>
                #circle {
                    border-radius: 50%;
                    background: #7EC6FF;
                    position: absolute;
                }
                :host {
                  display: flex;
                
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  position: relative;
                  z-index: 15;
                }
                svg {
                  min-width: 100vw;
                  min-height: 100vh;
                
                  position: absolute;
                  left: 1px;
                }
                svg > * {
                  filter: drop-shadow(0px 0px 1px #00000008);
                }
                #load {
                    color: #7EC6FF;
                    position: relative;
                    top: 32px;
                    left: 8px;
                    font-weight: bold;
                    font-size: 12pt;
                    letter-spacing: 2px;
                    text-shadow: 0 1px 2px #00000008;
                }
            </style>
            
            <svg id="groups"  xmlns="http://www.w3.org/2000/svg">
                <!-- -->
                <g>
                    <line y1="37.55" transform="translate(22.62 8.483)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                    <rect width="10.665" height="28.05" transform="translate(17.288 13.233)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                </g>
                <g>
                    <line  y2="30.918" transform="translate(6.332 30.059)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                    <rect  width="10.665" height="22.046" transform="translate(1 34.495)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                </g>
                <g>
                    <line y2="34.413" transform="translate(56.428, 1)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                    <rect width="10.665" height="24.914" transform="translate(51.096 5.75)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                </g>
                <g>
                    <line y1="28.633" transform="translate(40.387 26.026)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                    <rect width="10.665" height="19.357" transform="translate(35.055 30.663)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                </g>
            </svg>
            <p id="load"></p>
        `;
    }

    ready() {
        super.ready();
        this.load = 0;

        this.cursor = {
            x: 0,
            y: 0,
        };
        this.initialize(this.$.groups);
        this.primephysics();

        setInterval(() => {
            const count = this.load % 3;
            this.load = this.load + 1;
            this.$.load.innerHTML = `loading${(new Array(count + 2)).join('.')}`;
        }, 880);
        window.onload = () => {
            setTimeout(() => {
                this.stopanimation()
                    .then(() => {
                        this.setAttribute('style', 'display: none;');
                        this.innerHTML = "";
                        document.body.classList = [];

                        connector(io(server, { transports: ['websocket'] }));
                    });
            }, 3000);
        };
    }
    /*
    * Now we define a function to introduce a single candle component
    * */
    initialize(element) {
        /*
        * We will use this function to establish the physics on each particle generated in the ngFor
        * loop.
        * */
        this.minions = Array.from(element.children);

        /* Okay let us start by dispersing the particles across a small space to make sure we do not
        * encounter any errors.
        * */
        anime({
            targets: [this.minions],
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

        /* Then let us set the initial condition variables for each particle here */
        this.minions = this.minions.map((particle) => {
            /* Here we should set the initial conditions of the particle */
            particle.px = particle.getBoundingClientRect().x;
            particle.py = particle.getBoundingClientRect().y;
            particle.vx = 0;
            particle.vy = 0;
            particle.rotate = Math.random() * 360 - 180;

            return particle;
        });

        /* Let us also set the document cursor listener to update the cursor object */
        document.addEventListener('mousemove', (event) => {
            this.cursor = {x: event.clientX, y: event.clientY};
        });
    }

    primephysics() {
        /* Here we need to create multiple asynchronous threads that will be assigned
        * to manage each particle. */

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
            /*
            * Here we separate the responsible forces into components using arrow functions. */
            const repulsive = () => {
                return h ** 2 * (g * (dx / r ** 3))
                    - 1E1 * dx * r ** 2 * x + dx * (Math.random() - 0.5) * 1e-3;
            };
            const cursive = () => {
                const cr = Math.sqrt((pointa.px - this.cursor.x) ** 2 +  (pointa.py - this.cursor.y) ** 2);
                const cx = (axis ? pointa.px - this.cursor.x : pointa.py - this.cursor.y);

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

        this.minions = this.minions.map((particle) => {
            const friction = 0.98;

            particle.thread = setInterval((_) => {
                /* So here we need to get the position of this particle as well as the position of other
                * particles to begin our computation. */

                this.minions.filter((p) => p !== particle)
                    .forEach((partner) => {

                        particle.px = particle.px + particle.vx;
                        particle.py = particle.py + particle.vy;

                        particle.vx = particle.vx * friction + force(particle, partner, true) + boundary(particle, true);
                        particle.vy = particle.vy * friction + force(particle, partner, false) + boundary(particle, false);

                        particle.rotate = particle.rotate + (particle.rotate < 0 ? -1 : 1) * ((Math.random()) * 0.2);

                        particle.setAttribute('style', `transform: translateX(${particle.px}px) translateY(${particle.py}px) rotateZ(${particle.rotate}deg)`)

                    });
            }, 36);

            return particle;
        });
    }

    stopanimation() {
        return Promise.all(this.minions.reverse().map(m => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    clearInterval(m.thread);
                    m.setAttribute('style', `transform: translateX(${window.innerWidth * 0.5 - 32}px) translateY(${window.innerHeight * 0.5 - 64}px) rotateZ(0deg); transition-duration: 0.32s;`);

                    setTimeout(resolve, 256);
                }, (this.minions.indexOf(m) + 1) * 64 + 256);
            });
        }))
            .then(async () => {
                await anime({
                    targets: this.minions,
                    scale: [1, 0],
                    opacity: {
                        value: [1, 0],
                        duration: 14
                    },
                    translateX: window.innerWidth * 0.5,
                    translateY: window.innerHeight * 0.5 - 32,
                    duration: 256,
                    delay: 720,
                    easing: 'linear'
                }).finished;

                return new Promise(resolve => setTimeout(resolve, 388));
            });

    }
}

customElements.define('floox-loader', Button);
