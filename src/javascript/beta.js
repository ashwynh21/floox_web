
/*
* Here we are going to work with the functionality of enrolling testers onto the floox environment
* */

async function beta(email) {
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email.value)) {
        email.valid = false;

        throw Error('Oops, email address is invalid.');
    }

    return fetch(`${root}/beta`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            created: new Date().toISOString(),
            updated: new Date().toISOString(),

            email: email.value,
        })
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }

            return response.json()
                .then(error => {
                    throw error;
                });
        });
}

((email, button) => {
    /*
    * First let us get the status of the ui going
    * */
    fetch(`${root}/beta/count`, {
        method: 'get',
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }

            throw Error(response.json());
        })
        .then(response => {
            /*
            * Now with the response we can then update the user interface
            * */
            button.nextSibling.nextSibling.innerHTML = `${response.payload.count}/${response.payload.total}`;
        });

    button.addEventListener('click', () => {
        /*
        * We then display the loader first
        * */
        button.children[0].setAttribute('style', 'display: none;');
        button.children[1].setAttribute('style', 'display: normal;');

        return beta(email)
            .then(response => {
                /*
                * So here we want to replace this interface with new html to react for the user...
                * */
                button.parentNode.setAttribute('style', 'flex-flow: column;');
                button.parentNode.innerHTML = '' +
                    '<floox-button border style="font-weight: lighter; font-size: 12pt; margin-top: 16px;">' +
                    '   Great, we will get back to you via email' +
                    '</floox-button>' +
                    '<p style="font-size: 10pt; margin-left: 0;">Thank you for requesting to participate in our beta test of <strong style="color: #7EC6FF">Floox</strong>.</p>'

                document.querySelector('#message').innerHTML = '';
            })
            .catch((error) => {
                document.querySelector('#message').innerHTML = error.message;
            })
            .finally(() => {
                button.children[0].setAttribute('style', '');
                button.children[1].setAttribute('style', 'display: none;');
            });
    });
})(document.querySelector('floox-input[name="email"]'), document.querySelector('#beta'))
