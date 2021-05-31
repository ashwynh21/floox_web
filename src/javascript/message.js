
/*
* Here we are going to define functionality that will allow users to send messages
* */

async function send(message) {
    if(message.value.length < 10) {
        message.valid = false;

        throw Error('Oops, message must be at least 10 characters long');
    }
    const date = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))));

    return fetch(`${root}/message`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message.value,
            created: date.toISOString(),
            updated: date.toISOString()
        })
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }

            throw response.json();
        })
        .then((response) => response.payload);
}

((message, button) => {
    /*
    * Here we setup our functionality initialization so that the click event trigger on
    * the button will allow the user to submit the message that they have entered
    * */
    button.addEventListener('click', () => {
        button.children[0].setAttribute('style', 'display: none;');
        button.children[1].setAttribute('style', 'display: normal;');

        return send(message)
            .then(response => {
                message.value = '';
                /*
                * So here we want to replace this interface with new html to react for the user...
                * */
                button.parentNode.setAttribute('style', 'flex-flow: column;');
                button.parentNode.innerHTML = '' +
                    '<floox-button border style="font-weight: lighter; font-size: 12pt;">' +
                    '   Awesome, thanks for touching base with us.' +
                    '</floox-button>';
            })
            .catch((error) => {
                document.querySelector('#message_error').innerHTML = error.message;
            })
            .finally(() => {
                button.children[0].setAttribute('style', '');
                button.children[1].setAttribute('style', 'display: none;');
            });
    })
})(document.querySelector('floox-text[name="message"]'), document.querySelector('#texter'));
