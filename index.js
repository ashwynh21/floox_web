const express = require('express');
const fs = require('fs');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static(`${__dirname}/build/default`));

server.listen(6000, () => console.log('listening on port 6000'));
