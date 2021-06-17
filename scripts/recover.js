import {root} from "./environment";

export function recover(username) {
    return fetch(`${root}/access/recover`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
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

export function reset(_id, otp, password) {
    // once this is done then we can make the reset request...
    return fetch(`${root}/access/reset`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id,
            otp,
            password,
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
