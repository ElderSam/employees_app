const express = require('express'); //adiciona o express

const routes = express.Router();

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api", (req, res) => {

    res.send('Hello API!');
});

module.exports = routes;