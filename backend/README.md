# Backend

# Inicia o servidor;
Abrir o terminal, entrar nesta pasta (backend/) e dar o comando;

$ npm run dev
/*depois é só abrir o navegador e colocar o endereço do servidor: http://localhost:3001*/

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

    # Nodemon;
    Reinicializa o servidor automaticamente toda vez que  modificamos o arquivo server.js