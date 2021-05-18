/*
* Here we are going to get the commit history and run it through the UI
* */
function commits() {
    return fetch(`${root}/github`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(response => response.payload);
}

((container) => {
    const html =
        '        <span>#date</span>\n' +
        '        <div>\n' +
        '          <p>#message' +
        '          </p>\n' +
        '          <paper-ripple>' +
        '          </paper-ripple>\n' +
        '        </div>\n';

    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    commits()
        .then(data => {
            data.forEach(item => {
                const commit = document.createElement('div');
                const date = new Date(item.pushedDate);
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]

                commit.innerHTML = html
                    .replace('#message', item.message)
                    .replace('#date', `
                        <div>
                            <img src="${item.author.avatarUrl}"/>
                            <p>${item.author.name}</p>
                        </div>
                        <p>${date.getDate()}<sup>${nth(date.getDate())}</sup> ${month} ${date.getFullYear()} <small>${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}</small></p>`);
                container.insertBefore(commit, container.querySelector('a'));
            })
        })
})(document.querySelector('#github'))
