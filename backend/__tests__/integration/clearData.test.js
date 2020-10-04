require('./../config');
const arquivo = require('./../../src/controllers/fileManager');
const employee = require('./../../src//controllers/Employees');


describe('Limpa arquivo JSON', () => {

    it("esvazia o array de objetos no arquivo 'employees.test.json', salvando um array vazio", () => {
        res1 = arquivo.save([]); //esvazia o JSON
        expect(res1).toBe('Arquivo salvo!')
        
        res2 = employee.getEmployees()
        expect(res2.length).toBe(0)

        arquivo.save([]); //esvazia o JSON
    });
})