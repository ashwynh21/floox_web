
let socket;
let root;

if(process.env.production === 'true') {
    socket = 'https://floox.co.za'
    root = 'https://floox.co.za/api/v1.0';
} else {
    socket = 'http://localhost'
    root = 'http://localhost/api/v1.0';
}

const configuration = {
    client_id: '221425552189-arh623bv6n39sbvqdv0lgqh9dn7imr98.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
};

module.exports = {
    socket,
    root,
    configuration
}
