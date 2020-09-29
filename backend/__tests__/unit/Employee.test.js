require('./../config');

const employee = require('./../../src//controllers/Employees');

/* ------------------------ TESTES UNITÁRIOS ---------------------------- 
OBS: testa cada função pura, ou seja, aquelas que não dependem funções externas */

describe('Testa função filterData()', () => {

    data = [{
            DataCad: "26/09/2020",
            Cargo: "Dev Jr",
            Cpf: "454565954651",
            Nome: "John Locke",
            UfNasc: "SP",
            Salario: 1500.00,
            Status: "ATIVO"
        },
        {
            DataCad: "26/09/2020",
            Cargo: "Dev Pl",
            Cpf: "858567566595",
            Nome: "Samuel Jack",
            UfNasc: "SP",
            Salario: 2000.00,
            Status: "BLOQUEADO"
        },
        {
            DataCad: "27/09/2020",
            Cargo: "Dev Pl",
            Cpf: "4435435646345",
            Nome: "Paul James",
            UfNasc: "RJ",
            Salario: 2500.00,
            Status: "ATIVO"
        }
    ]

    it('Filtra por campo', () => {

        query = { DataCad: '26/09/2020' }
        res = employee.filterData(query, data);
        expect(res.length).toBe(2);

        query = { DataCad: '27/09/2020' }
        res = employee.filterData(query, data);
        expect(res.length).toBe(1);

        query = { DataCad: '30/10/2035' }
        res = employee.filterData(query, data);
        expect(res.length).toBe(0);

    });

    it('Filtra por faixa salarial', () => {
        query = { SalarioMin: 1000.00, SalarioMax: 2100.00 }
        res = employee.filterData(query, data);
        expect(res.length).toBe(2);

        query = { SalarioMin: 2100.00, SalarioMax: 2600.00 }
        res = employee.filterData(query, data);
        expect(res.length).toBe(1);

        query = { SalarioMin: 0.00, SalarioMax: 900.00 }
        res = employee.filterData(query, data);
        expect(res.length).toBe(0);

        query = { SalarioMin: 3000.00, SalarioMax: 5000.00 }
        res = employee.filterData(query, data);
        expect(res.length).toBe(0);
    });

    it('Retorna quantidade de funcionários com a mesma UfNasc (Unidade Federativa de nascimento)', () => {
        query = { groupByUfNasc: 'RJ' }
        res = employee.filterData(query, data);
        expect(res.qtdEmployees).toBe(1)

        query = { groupByUfNasc: 'SP' }
        res = employee.filterData(query, data);
        expect(res.qtdEmployees).toBe(2)

        query = { groupByUfNasc: 'MG' }
        res = employee.filterData(query, data);
        expect(res.qtdEmployees).toBe(0)
    });

})