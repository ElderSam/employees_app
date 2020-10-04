require('./../config');
const arquivo = require('./../../src/controllers/fileManager');
const employee = require('./../../src//controllers/Employees');

manyEmployees = [
    { Cpf: "16049505690" },
    { Cpf: "26049505690" },
    { Cpf: "36049505690" },
    { Cpf: "46049505690" },
    { Cpf: "56049505690" },
    { Cpf: "66049505690" },
    { Cpf: "76049505690" },
    { Cpf: "86049505690" },
    { Cpf: "96049505690" },
    { Cpf: "106049505690" },
    { Cpf: "116049505690" },
];

save = arquivo.save(manyEmployees); //esvazia o arquivo JSON e salva 11 funcionários


describe('Listar funcionários por página (retorna uma quantidade limitada a cada vez)', () => {


    it('listar funcionários na página 1, espera retornar 10', () => {
        const query = { page: 1 }
        const res = employee.getEmployees(query)
        docs = res.docs
        console.log(res)
        expect(save).toBe('Arquivo salvo!')
        expect(docs.length).toBe(10)
    });

    it('listar funcionários na página 2, espera retornar somente 1', () => {
        const query = { page: 2 }
        const { docs } = employee.getEmployees(query)
        expect(docs.length).toBe(1)
    });

    it('listar funcionários na página 3, espera retornar 0', () => {
        const query = { page: 3 }
        const { docs } = employee.getEmployees(query)
        expect(docs.length).toBe(0)

        arquivo.save([]); //esvazia o JSON
    });
})