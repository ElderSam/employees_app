require('dotenv').config({  
    //path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    path: ".env.test"
})

const employee = require('./../../src//controllers/Employees');

/** ------------------------ TESTES DE INTEGRAÇÃO ---------------------------- 
OBS: testa conjuntos de funcionalidades que podem ter algum efeito colateral */

describe('Salvar funcionário', () => {

    const aux = {
        DataCad: "27/09/2020",
        Cargo: "PO Jr",
        Cpf: "347367548768",
        Nome: "John",
        UfNasc: "RS",
        Salario: 5070.98,
        Status: "EM ANÁLISE"
    }

    it('Insere um novo funcionário', () => {
        qtdInicial = employee.getEmployees().length

        newEmployee = employee.saveEmployee(aux)

        expect(newEmployee).toBe(aux)

        qtdNova = employee.getEmployees().length
        expect(qtdNova).toBe(qtdInicial + 1)
    });

    it('Atualiza um funcionário existente', () => {
        qtdInicial = employee.getEmployees().length
        aux.Cargo = "PO Pl";

        res = employee.saveEmployee(aux)
        expect(res).toBe(aux)

        qtdNova = employee.getEmployees().length
        expect(qtdNova).toBe(qtdInicial)
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
    });
})

describe('Exclui um funcionário', () => {
    
    cpf = '347367548768'; //cpf do funcionário a ser excluído
    const query = { Cpf: cpf }

    it('deleta uma posição do array de funcionários (JSON) que tenha o mesmo Cpf passado', () => {
        qtdInicial = employee.getEmployees().length
        
        obj = employee.getEmployees(query); //busca o objeto por Cpf
        res = employee.deleteEmployee(cpf); //recebe o Cpf por parâmetro e retorna o objeto excluído
        
        expect(res).toStrictEqual(obj); //toStrictEqual para comparar os JSON

        qtdNova = employee.getEmployees().length
        expect(qtdNova).toBe(qtdInicial - 1);
    });

    it('tenta buscar um cpf de um funcionário excluído, e deve receber um array vazio', () => {
        
        res = employee.getEmployees(query);
        expect(res).toStrictEqual([]);
    });
})

describe('Limpa arquivo JSON', () => {

    it("esvazia o array de objetos no arquivo 'employees.test.json', salvando um array vazio", () => {
        const arquivo = require('./../../src/controllers/fileManager');
        arquivo.save([]); //esvazia o JSON

        res = employee.getEmployees()
        expect(res.length).toBe(0)
    });
})