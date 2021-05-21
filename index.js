const express = require('express');
const fs = require('fs');

const app = express();
//
const cert = fs.readFileSync('/etc/letsencrypt/live/www.floox.co.za/fullchain.pem', 'utf8').toString();
const key = fs.readFileSync('/etc/letsencrypt/live/www.floox.co.za/privkey.pem', 'utf8').toString();
//
const server = https.createServer(
    {
        cert,
        key,
    },
    app,
);

app.use(express.static(`${__dirname}/build/default`));

server.listen(443, () => console.log('listening on port 443'));
