
/*
* Here we will describe the functionality that relates to the rating system that we have introduced on the footer
* of the page so here we will simply collect the rating value and forward the information accordingly to our API
* */

function rate(value) {
    return fetch(`${root}/rating`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: value,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
        })
    })
        .then(response => {
            return response.json();
        })
}
function setup() {
    /*
    * Here we want to setup the current state of the beta testers to show users how many testers have signed up
    * */

}

((stars, button) => {

    /*
    * so here we configure the event listener for the provided button so that we can call the rate function
    * to send the data to our API.
    * */
    button.addEventListener('click', () => {
        /*
        * so if the rating is greater that zero then we're good to send.
        * */

        // so once we start the rating process we should put up a loader with the button
        button.children[0].setAttribute('style', 'display: none;');
        button.children[1].setAttribute('style', 'display: normal;');

        rate(stars.value)
            .then(result => {
                /*
                * So if everything went well then we will just remove the form information so that the user
                * does not keep repeating the functionality
                * */
                const parent = button.parentNode;

                parent.innerHTML = '<floox-button border>Awesome, thanks for your feedback!</floox-button>'
            })
            .catch(error => {
                button.children[0].setAttribute('style', '');
                button.children[1].setAttribute('style', 'display: none;');
            })
    })
})(document.querySelector('floox-rating'), document.querySelector('#rating'));
