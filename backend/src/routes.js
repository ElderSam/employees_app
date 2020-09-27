const express = require('express'); //adiciona o express
const routes = express.Router();

const Employee = require('./controllers/Employees')

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api/employees", (req, res) => {

    e1 = new Employee()
    data = e1.getData(req.query);
    
    res.send(data)
});

module.exports = routes;