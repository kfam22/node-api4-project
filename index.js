const express = require('express');
const server = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`**** server running on http://localhost:${PORT} ****`)
})

server.use('*', (req, res) => {
    res.send('<h1>Hello, Heroku</h1>')
})