
// so first let us get the parameters in the url
const parameters = new URLSearchParams(window.location.search);
/*
* Here we will define the password recover functionality that will allow users to recover
* forgotten passwords securely
* */
async function recover() {
    /*
    * We will first get the email field and check if everything there is okay
    * */
    const username = document.querySelector('floox-input[name="username"]');

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(username.value)) {
        username.valid = false;

        throw Error('Oops, email address is invalid.');
    }

    /*
    * If all is good then we should be able to request recovery using this email
    * */
    return fetch(`${root}/access/recover`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
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

/*
* Now, this url or page will also be used to run recoveries for the user should they follow the needed link to reset
* their password so here, if the link is set then we need to show the user the correct ui to reset their password.
* */
async function reset() {
    const password = document.querySelector('floox-input[name="password"]');
    const confirm = document.querySelector('floox-input[name="confirm"]');

    if(!/^.{8,}$/.test(password.value)) {
        password.valid = false;

        throw Error('Oops, password must be at least 8 characters long.');
    }
    if(password.value !== confirm.value) {
        confirm.valid = false;
        throw Error('Oops, passwords do not match.');
    }

    // once this is done then we can make the reset request...
    return fetch(`${root}/access/reset`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: parameters.get('_id'),
            otp: parameters.get('otp'),
            password: password.value,
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
        })
        .then(response => {
            return response.payload;
        });
}

// now if we get the _id and otp then we are verifying an account and need to push this forward to an API request
if(parameters.get('_id') && parameters.get('otp')) {
    /*
    * So if these parameters are set then we must alter the UI to allow the user to reset their password.
    * */
    const username = document.querySelector('floox-input[name="username"]');
    const password = document.querySelector('floox-input[name="password"]');
    const confirm = document.querySelector('floox-input[name="confirm"]');
    const loader = document.querySelector('#recover > paper-spinner');
    const text = document.querySelector('#recover > div');

    username.setAttribute('style', 'display: none;');
    password.setAttribute('style', 'display: normal;');
    confirm.setAttribute('style', 'display: normal;');
    document.querySelector('#content').innerHTML = 'Enter your new password and confirm by entering the same password in the next field';

    ((button) => {
        button.children[0].innerHTML = 'Reset Password';

        button.addEventListener('click', () => {
            loader.setAttribute('style', 'display: inline');
            text.setAttribute('style', 'display: none');

            reset()
                .then(response => {
                    window.location = '../';
                })
                .catch(error => {
                    console.error(error);

                    document.querySelector('#message').innerText = error.message;
                })
                .finally(() => {
                    loader.setAttribute('style', '');
                    text.setAttribute('style', '');
                });
        })
    })(document.querySelector('#recover'));
} else {
    document.querySelector('floox-input[name="password"]').setAttribute('style', 'display: none;');
    document.querySelector('floox-input[name="confirm"]').setAttribute('style', 'display: none;');

    ((button) => {
        button.addEventListener('click', () => {
            const loader = document.querySelector('#recover > paper-spinner');
            const text = document.querySelector('#recover > div');

            loader.setAttribute('style', 'display: inline');
            text.setAttribute('style', 'display: none');

            recover()
                .then(response => {
                    document.querySelector('#content').innerText = 'Your recovery link has been sent to your email address.';
                })
                .catch(error => {
                    console.error(error);

                    document.querySelector('#message').innerText = error.message;
                })
                .finally(() => {
                    loader.setAttribute('style', '');
                    text.setAttribute('style', '');
                });

        })
    })(document.querySelector('#recover'));
}
