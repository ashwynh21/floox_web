import {root} from "./environment";

export function join(email) {
    const date = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))));

    return fetch(`${root}/beta`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            created: date.toISOString(),
            updated: date.toISOString(),

            email,
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
export function count(setter) {
    fetch(`${root}/beta/count`, {
        method: 'get',
    })
        .then(response => {
            return response.json()
                .then((result) => {
                    if(response.ok) {
                        return result;
                    }
                    throw Error(result);
                })
        })
        .then(response => {
            setter(`${response.payload.count}/${response.payload.total}`)
        });
}
