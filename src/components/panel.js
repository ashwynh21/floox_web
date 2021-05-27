import { PolymerElement, html } from "@polymer/polymer/polymer-element";

import '@polymer/paper-button';

class Panel extends PolymerElement {
    static get properties() {
        return {
            state: {
                type: Boolean,
                value: false
            }
        };
    }
    static get template () {
        return html`
            <style>
            :host {
                height: 40px;
                width: 40px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            svg {
              transform: scale(1);
              pointer-events: none;
              position: relative;
              z-index: 2;
            }
            #top {
              fill:none;
              stroke: #5086b6;
              stroke-width: 3;
              stroke-linecap: square;
              stroke-miterlimit: 10;
            }
            #bottom {
              fill: none;
              stroke: #5086b6;
              stroke-width: 3;
              stroke-linecap: square;
              stroke-miterlimit: 10;
            }
            
            .filter {
              filter: drop-shadow(0 2px 4px #00000008);
            }
            #container {
                position: fixed;
                top: 0;
                bottom: 0;
                right: -100vw;
                background: #5187B7;
                
                width: 100vw;
                max-width: 512px;
                z-index: 2;
                box-shadow: 0 0 3px 1px #00000008;
            }
            #button {
                position: absolute;
                padding: 4px;
                border-radius: 44px;
                width: 80px;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
            }
            </style>
            
            <div id="container">
                <slot/>
            </div>
            
            <div id="button">
                <paper-ripple>
                </paper-ripple>
            </div>
            <svg class="filter" id="svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="44px" height="44px" viewBox="0 0 44 44" xml:space="preserve">
                <polyline id="top" points="2.1,17.2,21.3,17.2 40.6,17.2 "/>
                <polyline id="bottom" points="24.1,28.2 32.3,28.2 40.6,28.2 "/>
            </svg>
        `;
    }

    ready() {
        super.ready();

        this.addEventListener('click', (e) => {
            this.togglemenu(e);
        });
    }

    togglemenu(e) {
        const svg = e.target.$.svg;
        const bottom = svg.children.bottom;
        const top = svg.children.top;

        function open() {
            anime({
                duration: 750,
                stroke: '#FFFFFF',
                targets: [bottom],
                points: '11.4,11.4,22,22 32.6,32.6'
            });
            anime({
                duration: 750,
                stroke: '#FFFFFF',
                targets: [top],
                points: '11.4,32.6 22,22 32.8,11.2'
            });

            anime({
                targets: [menu],
                duration: 250,
                delay: 250,
                easing: 'linear'
            });
            anime({
                targets: [svg],
                delay: 250,
                duration: 1000,
            });
        }
        function close() {
            anime({
                duration: 750,
                stroke: '#5086b6',
                targets: [bottom],
                points: '2.1,17.2,21.3,17.2 40.6,17.2'
            });
            anime({
                duration: 750,
                stroke: '#5086b6',
                targets: [top],
                points: '24.1,28.2 32.3,28.2 40.6,28.2'
            });

            anime({
                targets: [menu],
                duration: 250,
                easing: 'linear'
            });
            anime({
                targets: [svg],
                duration: 1000,
            });
        }

        if(!this.state) {
            this.state = true;
            open();
            document.body.classList = ['noscroll'];

            anime({
                targets: [this.$.container],
                right: '-20vw',
                duration: 444,
                easing: 'easeOutCubic'
            });
        } else {
            this.state = false;
            close();
            document.body.classList = [];

            anime({
                targets: [this.$.container],
                right: '-100vw',
                duration: 360,
                easing: 'easeOutCubic'
            });
        }
    }
}

customElements.define('floox-panel', Panel);
