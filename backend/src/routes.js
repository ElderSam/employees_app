const express = require('express'); //adiciona o express
const routes = express.Router();
const bodyParser = require('body-parser')

const employee = require('./controllers/Employees')

app.use(bodyParser.urlencoded({ extended: true }))

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api/employees", (req, res) => {
    res.send(employee.getEmployees(req.query))
});

app.post('/api/employees', (req, res, next) => { //Salvar

    const response = employee.saveEmployee({
        DataCad: req.body.DataCad,
        Cargo: req.body.Cargo,
        Cpf: req.body.Cpf,
        Nome: req.body.Nome,
        UfNasc: req.body.UfNasc,
        Salario: req.body.Salario,
        Status: req.body.Status
    })

    res.send(response)
})

module.exports = routes;