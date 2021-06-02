/*
* Here we will define the logic and functionality that will run the sign up feature that we
* have for the users that have already signed up.
*
* We will also define the google authentication as well as the facebook authentication.
* */

/*
* We define a function to check if the policy was read
* */
function policy() {
    return document.querySelector('paper-checkbox[name="policy"]').checked;
}

function google(message, user) {
    /*
    * before the request is made let us set the button to loading
    * */
    const loader = document.querySelector('#signup > paper-spinner');
    const text = document.querySelector('#signup > div');

    /*
    * We will then use this user information to create an account for the user, we will need to take note of how
    * we deal with the password system for the user...
    * */
    const token = user.getAuthResponse().id_token;
    /*
    * So now we send this to the server that we have defined
    * */
    const date = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))));

    fetch(`${root}/user`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            token,
            verifier: 'google',
            created: date.toISOString(),
            updated: date.toISOString()
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
            /*
            * Once the user account has been created we can then redirect the user to a thank you for signing up page,
            * where they will be requested to verify their email address.
            * */
            localStorage.setItem('user', JSON.stringify(response.payload));
            window.location = './verify';
        })
        .catch(error => {
            console.error(error);
            /*
            * So here we will need a place to display this error to the user.
            * */
            message.innerText = error.debug;
        })
        .finally(() => {
            loader.setAttribute('style', '');
            text.setAttribute('style', '');
        });
}

/*
* Now we implement a function that will handle the facebook sign up aspect of our interface.
* */
function facebook() {
    const loader = document.querySelector('#signup > paper-spinner');
    const text = document.querySelector('#signup > div');

    if(!policy()) {
        /*
        * We return up here so the user can go read the disclaimer content
        * */
        document.querySelector('#message').innerText = 'Oops, please remember to read our policy agreement and disclaimer and agree to it before signing up';
        return;
    }

    loader.setAttribute('style', 'display: inline');
    text.setAttribute('style', 'display: none');
    /*
    * First we check if the user is not already logged in to their facebook account and act.
    * */
    return new Promise((resolve, reject) => {
        FB.getLoginStatus((result) => {

            if(result.status === 'connected') {
                resolve(result);
            }

            FB.login((result) => {
                if(result.status === 'connected') {
                    resolve(result);
                }
                else {
                    reject(result);
                }
            }, {
                scope: 'public_profile, email',
            });
        });
    })
        .then(response => {
            return fetch(`${root}/user`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    token: response.authResponse.accessToken,
                    verifier: 'facebook',
                    created: (new Date()).toISOString(),
                    updated: (new Date()).toISOString()
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
        })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.payload));
            window.location = './verify';
        })
        .catch(error => {
            console.error(error);
            /*
            * So here we will need a place to display this error to the user.
            * */
            document.querySelector('#message').innerText = error.debug;
        })
        .finally(() => {
            loader.setAttribute('style', '');
            text.setAttribute('style', '');
        });
}

/*
* Finally we implement the normal sign up functionality
* */
async function signup() {
    const loader = document.querySelector('#signup > paper-spinner');
    const text = document.querySelector('#signup > div');
    /*
    * so we need to get the information from the form provided in the html
    * */
    if(!policy()) {
        /*
        * We return up here so the user can go read the disclaimer content
        * */
        document.querySelector('#message').innerText = 'Oops, please remember to read our policy agreement and disclaimer and agree to it before signing up';
        return;
    }

    /*
    * So now we check the rest of the form here.
    * */
    const username = document.querySelector('floox-input[name="username"]');
    const password = document.querySelector('floox-input[name="password"]');
    const confirm = document.querySelector('floox-input[name="confirm"]');

    /*
    * Then we validate the inputs that we have above
    * */
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(username.value)) {
        username.valid = false;

        throw Error('Oops, email address is invalid.');
    }
    if(!/^.{8,}$/.test(password.value)) {
        password.valid = false;

        throw Error('Oops, password must be at least 8 characters long.');
    }
    if(password.value !== confirm.value) {
        confirm.valid = false;
        throw Error('Oops, passwords do not match.');
    }

    loader.setAttribute('style', 'display: inline');
    text.setAttribute('style', 'display: none');


    return fetch(`${root}/user`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,

            created: (new Date()).toISOString(),
            updated: (new Date()).toISOString()
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
            /*
            * So we want to store the response since we expect that it will be a user object carrying with it a token
            * */
            localStorage.setItem('user', JSON.stringify(response.payload));
            window.location = './verify';
        })
        .catch(error => {
            console.error(error);
            /*
            * So here we will need a place to display this error to the user.
            * */
            document.querySelector('#message').innerText = error.debug;
        })
        .finally(() => {
            loader.setAttribute('style', '');
            text.setAttribute('style', '');
        });
}

((button) => {
    button.addEventListener('click', facebook)
})(document.querySelector('#facebook'));

((button) => {
    button.addEventListener('click', () => {
        /*
        * before the request is made let us set the button to loading
        * */
        const loader = document.querySelector('#signup > paper-spinner');
        const text = document.querySelector('#signup > div');

        loader.setAttribute('style', 'display: inline');
        text.setAttribute('style', 'display: none');

        return signup()
            .then(() => {

            })
            .catch(error => {
                console.error(error);

                document.querySelector('#message').innerText = error.message;
            })
            .finally(() => {
                loader.setAttribute('style', '');
                text.setAttribute('style', '');
            });
    });
})(document.querySelector('#signup'));

/*
* put this guy at the bottom in case it fails and screws everything up here
* */
gapi.load('auth2', () => {
    document.querySelector('#google').addEventListener('click', (event) => {
        if(!policy()) {
            /*
            * We return up here so the user can go read the disclaimer content
            * */
            document.querySelector('#message').innerText = 'Oops, please remember to read our policy agreement and disclaimer and agree to it before signing up';
            return;
        }

        const loader = document.querySelector('#signup > paper-spinner');
        const text = document.querySelector('#signup > div');

        loader.setAttribute('style', 'display: inline');
        text.setAttribute('style', 'display: none');

        (
            (button, message, auth) => auth.attachClickHandler(
                button,
                {},
                (user) => google(message, user),
                (error) => console.error(error)
            )
        )(
            document.querySelector('#google'),
            document.querySelector('#message'),
            gapi.auth2.init(configuration),
        );

        // trickery, lol
        event.target.click();
    });
});
