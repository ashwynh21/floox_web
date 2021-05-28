/*
* This file will be used to handle the functionality of the verification page. We will begin by outlining how our
* verification implementation should look like once we are done.
* 1. once a user is signed up, they are redirected to this page where they are informed that they have been sent
*   an email in which they must follow a link to verify the page.
* 2. so we need to be able to tell when a user has signed up, and when a user is here to verify their account.
*   hence we will expect that a user is here by a parameter set in the request object of the page.
* 3. this parameter must be unique in its origin similar to an otp that is only known by the server.
* */

// so first let us get the parameters in the url
const parameters = new URLSearchParams(window.location.search);

// now if we get the _id and otp then we are verifying an account and need to push this forward to an API request
if(parameters.get('_id') && parameters.get('otp')) {
    // so we will have to alter the UI a bit to react to this fact and forward the data
    const user = localStorage.getItem('user');
    if(!user || !JSON.parse(user).verified) {
        document.querySelector('#hint').innerHTML = 'Great, your account is being verified.';

        fetch(`${root}/user/verify`, {
            method: 'post',
            body: parameters
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
            .then(() => {
                // then we redirect the user properly. since we already have the users data onboard the application
                // by now then we can access that data and update it.

                // so if the user has not logged in as in there is no local storage then we redirect to log in page
                if(!localStorage.getItem('user')) {
                    return window.location = '../../login';
                }

                // then the account is verified so we update the local storage and send the user to their dashboard
                // since they are already logged in.
                const user = JSON.parse(localStorage.getItem('user'));
                user.verified = true;

                localStorage.setItem('user', JSON.stringify(user));
                return window.location = '../../dashboard';
            })
            .catch((error) => {
                document.querySelector('#hint').innerHTML = error.debug;
            });
    }
}

/*
* Let us also setup the user interface to be reactive to the actions that the user took before landing on this page
* */
((button, note) => {
    // so same thing, if there is data in local storage we check it and offer the user to go to their dashboard.
    if(localStorage.getItem('user')) {
        button.innerHTML = 'Dashboard';
        // then we check if this account has not already been verified.
        const user = JSON.parse(localStorage.getItem('user'));

        if(user.verified) {
            note.innerHTML = 'Awesome, your account is already verified, you can go straight to your dashboard.';
        }
    } else {
        button.children[0].innerHTML = 'Log in';
    }

    button.addEventListener('click', () => {

        if(localStorage.getItem('user')) {
            window.location = '../../dashboard';
        } else {
            window.location = '../../login';
        }
    })
})(document.querySelector('#login'), document.querySelector('#hint'));
