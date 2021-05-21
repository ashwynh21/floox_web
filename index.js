const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/build/default`));

app.listen(80, () => console.log('listening on port 80'));
