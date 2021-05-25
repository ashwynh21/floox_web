/*
* We will use this file to define the client connection to the socket server that we have
* defined on our API so let us get to it then.
* */

// we define a constant for the server url.
const server = 'http://localhost';

((client) => {
    /*
    * So here  we will configure the events that we will want to listen to.
    * */
    client.on('general/count', (message) => {
        /*
        * so here we simply get the dom object that we will fill with
        * this data.
        * */
        const counter = document.querySelector('#active_clients');
        const pill = counter.parentNode;

        counter.innerHTML = message.data;
        // then here we can animate the pill to draw the users attention.
        nudge(pill);
    });
})(io(server, { transports: ['websocket'] }));

function nudge(target) {
    anime({
        targets: [ target ],
        easing: 'easeOutQuad',
        rotate: [
            { value: -4, duration: 128 },
            { value: 4, duration: 128 },
            { value: -4, duration: 128 },
            { value: 4, duration: 128 },
            { value: 0, duration: 128 }
        ]
    })
}
