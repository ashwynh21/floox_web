/*
* We will define functions here that relate to the logging in functionality of the application.
* */
import {configuration, root} from "./environment";

export function login(username, password) {

    return fetch(`${root}/access`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
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
            return response.payload;
        })
}
/*
* Here we are google */
export function google(token) {
    /*
    * We will then use this user information to create an account for the user, we will need to take note of how
    * we deal with the password system for the user...
    * */
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
            return user;
        })
}
/*
* Then we define the facebook login function that will allow us to authenticate users with their facebook accounts
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
            return response.payload;
        })
}
