import {root} from "./environment";

export function google(message, user) {
    return fetch(`${root}/user`, {
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
            localStorage.setItem('user', JSON.stringify(response.payload));
            return response.payload
        })
}

/*
* Now we implement a function that will handle the facebook sign up aspect of our interface.
* */
export function facebook() {
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
            return response.payload
        })
}

/*
* Finally we implement the normal sign up functionality
* */
export function signup(username, password) {
    return fetch(`${root}/user`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,

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
            return response.payload;
        });
}
