# Backend
    Desenvolvido em Node.js

# Instalar dependências do projeto
    Abrir o terminal, entrar nesta pasta (backend/) e dar o comando;
    $ npm install

# Inicia o servidor;
    $ npm start
    /*depois é só abrir o navegador e colocar o endereço do servidor: http://localhost:3001*/

# Realizar os testes unitários e de integração
$ npm test

------------------------------------------------------------
# Rotas da API;
   
   Documentação da API;
    Utilizei o Insomnia para documentar a API, caso queira utilizar para facilitar, segue o link;
        https://insomnia.rest/download/

    Para importar o arquivo da documentação dentro do Insomnia, basta abrir o programa e seguir os passos;
        1. pegue o arquivo 'Insomnia_API_doc.json' (dentro desta pasta) e arraste para o menu esquerdo do Insomnia até aparecer 'Mover'.
        2. Solte o arquivo e confirme a importação com 'OK'.
        3. Agora pode entrar na pasta (Funcionarios_App) da Documentação dentro do Insomnia e testar a API.


    ---------------------------------
    Como usar as rotas da API;

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

    # Nodemon (foi usado como dependência de desenvolvimento);
    Reinicializa o servidor automaticamente toda vez que  modificamos o arquivo server.js

--------------------------------------------------------

# Estrutura do projeto

    O primeiro arquivo a ser lido quando inicia o servidor backend é o server.js
    dentro da pasta src/ nós temos o nosso código desenvolvido nessa aplicação;


        As rotas da API estão no arquivo src/routes.js, que recebe as requisições pelos métodos GET e POST e faz chamada às funções do controller de funcionários retornando a resposta deste.
        
        na pasta controllers/ estão;
            O nosso controller de funcionários, Employees.js (dentro de src/controllers/), que recebe as chamadas de funções das rotas, executa as funções e retorna. Nós temos funções de listar, filtrar, inserir, atualizar e excluir um funcionário (employee).
            O arquivo fileManager.js (dentor de src/controllers/) que gerencia o acesso ao arquivo JSON que está funcionando como nosso banco de dados. Ele basicamente tem 2 funções; load() e save(), que respectivamente leem dados do arquivo JSON e salvam dados nesse mesmo arquivo JSON (employees.json dentro da pasta backend/).
        
        os nossos testes estão na pasta __tests__ onde tem os testes unitários e testes de integração;
        OBS: para rodar todos os testes, basta dar o comando 'npm test'
