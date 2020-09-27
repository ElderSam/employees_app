# Backend

# Inicia o servidor;
Abrir o terminal, entrar nesta pasta (backend/) e dar o comando;

$ npm run dev
/*depois é só abrir o navegador e colocar o endereço do servidor: http://localhost:3001*/

------------------------------------------------------------
# Rotas da API;
    Listar todos os funcionários
    http://localhost:3001/api/employees (GET)

    Listar funcionários filtrando por campos;
        
        CAMPOS POSSÍVEIS: KEY(DataCad, Cargo, Nome, UfNasc, Salario e Status)
        http://localhost:3001/api/employees?KEY=VALUE (GET)

            Exemplos;
            http://localhost:3001/api/employees?DataCad=01/04/2017 (GET)
            "                                 " ?Cargo=Dev%Jr
            "                                 " ?Cpf=70550486640
            "                                 " ?Nome=Alaine Abbs
            "                                 " ?UfNasc=PE
            "                                 " ?Salario=2269.90
            "                                 " ?Status=ATIVO

        Filtrar por faixa salarial;
        http://localhost:3001/api/employees?SalarioMin=1000.00&SalarioMax=3000.00

        Obter quantidade de funcionários em um Estado (UfNasc);
        http://localhost:3001/api/employees?groupByUfNasc=SP (GET)

------------------------------------------------------------
# Algumas dependências do projeto:

    #  Express;
    Microframework que nos ajuda com rotas (endereços, url)

    # Nodemon;
    Reinicializa o servidor automaticamente toda vez que  modificamos o arquivo server.js