require('./../config');
const arquivo = require('./../../src//controllers/fileManager');
arquivo.save([]);

describe('Testa funções do arquivo fileManager.js', () => {
    
    const content = [{
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

    it('Testa função save()', () => {    
        arquivo.save(content);
        //const readJSON = require('./../../employees.test.json'); OBS: este jeito de ler um arquivo é a pior maneira porque lê uma única vez e guarda o valor como um 'cache'
        const readJSON = arquivo.load();
        expect(readJSON).toStrictEqual(content);
    });

    it('Testa função load()', () => {
        res = arquivo.load();
        expect(res).toStrictEqual(content);

        arquivo.save([]); //esvazia o JSON
    });  
})

