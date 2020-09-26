const express = require('express'); //adiciona o express
const routes = express.Router();

const Employee = require('./controllers/Employees')

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api", (req, res) => {
    
    e1 = new Employee()
    data = e1.getJSON();

    res.send(JSON.stringify(data))

});

module.exports = routes;