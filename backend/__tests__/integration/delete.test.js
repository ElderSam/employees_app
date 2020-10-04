
require('./../config');
const employee = require('./../../src//controllers/Employees');
const arquivo = require('./../../src/controllers/fileManager');

let qtdInicial;
myCpf = '347367548768'
const query = { Cpf: myCpf }

describe('Exclui um funcionário', () => {
    


    it('deleta uma posição do array de funcionários (JSON) que tenha o mesmo Cpf passado', () => {
        arquivo.save([{ Cpf: '347367548768' }]); //esvazia o JSON e salva um objeto
        qtdInicial = employee.getEmployees().length

        obj = employee.getEmployees(query); //busca o objeto por Cpf
        res = employee.deleteEmployee(myCpf); //recebe o Cpf por parâmetro e retorna o objeto excluído
        
        expect(res).toStrictEqual(obj); //toStrictEqual para comparar os JSON
    });

    it('verifica se o item excluido realmente não existe mais no JSON', () => {

        qtdNova = employee.getEmployees().length
        expect(qtdNova).toBe(qtdInicial - 1);
    });

    it('tenta buscar um cpf de um funcionário excluído, e deve receber um array vazio', () => {
        
        res = employee.getEmployees(query);
        expect(res).toStrictEqual([]);

        arquivo.save([]); //esvazia o JSON
    });
})