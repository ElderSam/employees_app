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

describe('Listar funcionários', () => {
    it('lista todos os funcionários em JSON (array de objetos)', () => {

        res = employee.getEmployees()
        expect(res.length).toBe(1)
    });



    it('filtra funcionários por data de cadastro', () => {
                
        const aux1 = {
            DataCad: "26/09/2020",
            Cargo: "Dev Jr",
            Cpf: "567567657567",
            Nome: "John",
            UfNasc: "RS",
            Salario: 5070.98,
            Status: "ATIVO"
        }

        const aux2 = {
            DataCad: "26/09/2020",
            Cargo: "Dev Pl",
            Cpf: "467585858595",
            Nome: "Samuel Jack",
            UfNasc: "SP",
            Salario: 2000.00,
            Status: "ATIVO"
        }

        employee.saveEmployee(aux1)
        employee.saveEmployee(aux2)
        //console.log(employee.getEmployees())

        query = { DataCad: '26/09/2020' }
        res = employee.getEmployees(query)
        //console.log(res)
        expect(res.length).toBe(2)

    })
})

describe('Limpa arquivo JSON', () => {

    it("esvazia o array de objetos no arquivo 'employees.test.json', salvando um array vazio", () => {
        const arquivo = require('./../../src/controllers/fileManager');
        arquivo.save([]); //esvazia o JSON
        
        res = employee.getEmployees()
        expect(res.length).toBe(0)
    });
})