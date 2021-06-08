/*
* We will define functions here that relate to the logging in functionality of the application.
* */
async function login(form) {

    /*
    * Then here we will collect and evaluate the forms integrity and submit this data for the API
    * */
    const username = form.querySelector('floox-input[name="username"]');
    const password = form.querySelector('floox-input[name="password"]');

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(username.value)) {
        username.valid = false;

        throw Error('Oops, email address is invalid.');
    }

    return fetch(`${root}/access`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
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
            * We can then store the user data and redirect the user to their dashboard
            * */
            return response.payload;
        })
}
/*
* Here we are google */
function google(message, user) {
    const loader = document.querySelector('#login > paper-spinner');
    const text = document.querySelector('#login > div');

    /*
    * We will then use this user information to create an account for the user, we will need to take note of how
    * we deal with the password system for the user...
    * */
    const token = user.getAuthResponse().id_token;

    return fetch(`${root}/access`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            verifier: 'google',
            token,
        }),
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
            * We can then store the user data and redirect the user to their dashboard
            * */
            return response.payload;
        })
        .then(user => {
            /*
            * We then save the user and redirect them to the dashboard
            * */
            localStorage.setItem('user', JSON.stringify(user));
            window.location = `../dashboard`;
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
* Then we define the facebook login function that will allow us to authenticate users with their facebook accounts
* */
async function facebook() {
    const loader = document.querySelector('#login > paper-spinner');
    const text = document.querySelector('#login > div');

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
            return fetch(`${root}/access`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    token: response.authResponse.accessToken,
                    verifier: 'facebook',
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
            window.location = `../dashboard`;
        })
        .catch(error => {
            console.error(error);
            /*
            * So here we will need a place to display this error to the user.
            * */
            document.querySelector('#message').innerText = error.message;
        })
        .finally(() => {
            loader.setAttribute('style', '');
            text.setAttribute('style', '');
        });
}

((form, button) => {
    button.addEventListener('click', () => {
        const loader = document.querySelector('#login > paper-spinner');
        const text = document.querySelector('#login > div');

        loader.setAttribute('style', 'display: inline');
        text.setAttribute('style', 'display: none');

        login(form, button)
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                window.location = `../dashboard`;
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
})(document.querySelector('.signup'), document.querySelector('#login'));

((button) => {
    button.addEventListener('click', () => {
        return facebook()
    })
})(document.querySelector('#facebook'));
/*
* put this guy at the bottom in case it fails and screws everything up here
* */
gapi.load('auth2', () => {
    document.querySelector('#google').addEventListener('click', (event) => {
        const loader = document.querySelector('#login > paper-spinner');
        const text = document.querySelector('#login > div');

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
