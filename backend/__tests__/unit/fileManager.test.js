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
        res = arquivo.save(content);
        expect(res).toBe('Arquivo salvo!');
    });

    it('Testa função load()', () => {
        res1 = arquivo.load();
        expect(res1).toStrictEqual(content);

        res2 = arquivo.save([]); //esvazia o JSON
        expect(res2).toBe('Arquivo salvo!')

        res3 = arquivo.load().length;
        expect(res3).toBe(0)
    });  
})