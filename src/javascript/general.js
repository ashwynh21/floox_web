/*
* We will use this file to define the client connection to the socket server that we have
* defined on our API so let us get to it then.
* */

// we define a constant for the server url.

window.onload = () => {
    ((client) => {
        /*
        * So here  we will configure the events that we will want to listen to.
        * */
        const counter = document.querySelector('#active_clients');
        const profit = document.querySelector('#total_profit');
        const won = document.querySelector('#won');
        const lost = document.querySelector('#lost');

        client.on('general/summary', (message) => {
            console.log(message);
            /*
            * so here we simply get the dom object that we will fill with
            * this data.
            * */
            counter.innerHTML = message.data.clients;
            profit.innerHTML = tocurrency(message.data.profit);
            won.innerHTML = message.data.won;
            lost.innerHTML = message.data.lost;

            if(counter.value !== message.data.clients) {
                nudge(counter.parentNode);
            }
            if(profit.value !== message.data.profit) {
                nudge(profit.parentNode);
            }
            if(won.value !== message.data.won) {
                nudge(won.parentNode);
            }
            if(lost.value !== message.data.lost) {
                nudge(lost.parentNode);
            }

            won.value = message.data.won;
            lost.value = message.data.lost;
            counter.value = message.data.clients;
            profit.value = message.data.profit;
        });

    })(socket);
}

function nudge(target) {
    anime({
        targets: [ target ],
        easing: 'easeOutQuad',
        scale: [
            { value: 1.1, duration: 180 },
            { value: 1, duration: 256 }
        ]
    })
}

/*
* We define a function to format numbers to currency in
* */
function tocurrency(value) {
    const formatter = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    return formatter.format(value);
}
