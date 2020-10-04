require('../config');
const arquivo = require('../../src/controllers/fileManager');
arquivo.save([]); //esvazia o JSON
const employee = require('../../src/controllers/Employees');


describe('Listar funcionários', () => {
    it('lista todos os funcionários em JSON (array de objetos)', () => {
        const aux = {
            DataCad: "27/09/2020",
            Cargo: "PO Jr",
            Cpf: "347367548768",
            Nome: "John",
            UfNasc: "RS",
            Salario: 5070.98,
            Status: "EM ANÁLISE"
        }
        arquivo.save([aux]); //esvazia o JSON e insere um objeto
        
        res = employee.getEmployees()
        expect(res.length).toBe(1)
    });

    it('filtra funcionários por data de cadastro', () => {
                
        const aux1 = {
            DataCad: "26/09/2020",
            Cargo: "Dev Jr",
            Cpf: "567567657567",
            Nome: "Cris P.",
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
    });

    it('filtra funcionários por cargo', () => { 
        query = { Cargo: 'Dev Jr' }
        res = employee.getEmployees(query)
 
        expect(res.length).toBe(1)
    });
    
    it('filtra funcionários por cpf', () => { 
        query = { Cpf: '467585858595' }
        res = employee.getEmployees(query)
 
        expect(res.length).toBe(1)
    });

    it('filtra funcionários por nome', () => { 
        query = { Nome: 'John' }
        res = employee.getEmployees(query)
 
        expect(res.length).toBe(1)
    });

    it('filtra funcionários por UfNasc (unidade federativa de nascimento)', () => { 
        query = { UfNasc: 'RS' }
        res = employee.getEmployees(query)
 
        expect(res.length).toBe(2)
    });
    
    it('filtra funcionários por Status', () => { 
        query = { Status: 'ATIVO' }
        res = employee.getEmployees(query)
 
        expect(res.length).toBe(2)
    });

    it('filtra por faixa salarial', () => {
        query = { SalarioMin: 0.00, SalarioMax: 5000.00 }
        res = employee.getEmployees(query)
        expect(res.length).toBe(1)

        query = { SalarioMin: 5000.00, SalarioMax: 10000.00 }
        res = employee.getEmployees(query)
        expect(res.length).toBe(2)
    });

    it('retorna um objeto que possue como atributo a quantidade de funcionários agrupados por Estado (UfNasc)', () => {
        query = { groupByUfNasc: 'SP' }
        res = employee.getEmployees(query)
        expect(res.qtdEmployees).toBe(1)

        query = { groupByUfNasc: 'RS' }
        res = employee.getEmployees(query)
        expect(res.qtdEmployees).toBe(2)

        arquivo.save([]); //esvazia o JSON
    });
})