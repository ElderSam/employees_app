require('dotenv').config({  
    //path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    path: ".env.test"
})

const employee = require('./../../src//controllers/Employees');

describe('Salvar funcionário', () => {
    it('Insere um novo funcionário ou atualiza um existente, e deve retornar o próprio objeto', () => {

        const aux = {
            DataCad: "27/09/2020",
            Cargo: "PO Jr",
            Cpf: "347367548768",
            Nome: "John",
            UfNasc: "RS",
            Salario: 5070.98,
            Status: "EM ANÁLISE"
        }

        newEmployee = employee.saveEmployee(aux)

        expect(newEmployee).toBe(aux)
    });
})

const arquivo = require('./../../src/controllers/fileManager');
arquivo.save([]); //esvazia o JSON