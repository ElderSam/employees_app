const express = require('express'); //adiciona o express
const routes = express.Router();

const employee = require('./controllers/Employees')

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api/employees", (req, res) => {

    data = employee.getData(req.query);

    res.send(data)
});

module.exports = routes;