
/*
* Here we are going to define functionality that will allow users to send messages
* */

import {root} from "./environment";

export function send(message) {
    const date = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))));

    return fetch(`${root}/message`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
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
