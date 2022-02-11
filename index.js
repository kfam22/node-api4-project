require('dotenv').config();
const express = require('express');
const server = express();
const users = require('./mockDb');

const PORT = process.env.PORT || 8000;



server.use(express.json());

server.get('/api/users', (req, res) => {
    res.json(users)
})

server.post('/api/register', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
})

server.post('/api/login', (req, res, next) => {
    const validLogin = users.filter(user => {
        return req.body.username === user.username && 
        req.body.password === user.password
    })

    validLogin.length === 0 ? next({status: 400, message: "invalid username or password"}) : res.status(201).json({ message: `welcome ${req.body.username}, login successful!`})
})

server.use('*', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

server.listen(PORT, () => {
    console.log(`**** server running on http://localhost:${PORT} ****`)
})