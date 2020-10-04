require('../config');

const arquivo = require('../../src/controllers/fileManager');
arquivo.save([]); //esvazia o JSON

const employee = require('../../src/controllers/Employees');

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

        arquivo.save([]); //esvazia o JSON
    });
})