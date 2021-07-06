import {root} from "./environment";

export function verify(user, parameters) {
    return fetch(`${root}/user/verify`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters)
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }

            return response.json()
                .then((error) => {
                    throw error;
                });
        })
        .then(() => {
            user.verified = true;
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

export function request(user) {
    return fetch(`${root}/user/request`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }

            return response.json()
                .then((error) => {
                    throw error;
                });
        });
}
