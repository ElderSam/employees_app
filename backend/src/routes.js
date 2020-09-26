const express = require('express'); //adiciona o express
const routes = express.Router();

require('./controllers/Employees')

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api", (req, res) => {


});

module.exports = routes;