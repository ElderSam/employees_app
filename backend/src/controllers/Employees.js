let Employee = function() { // Classe Employee (Funcionario)
    
    this.getData = (query='{}') => { /* Método getData ---------------------------------------- */
        
        response = this.getJSON();  

        if(JSON.stringify(query) != '{}'){ //verifica se o objeto query não é vazio
            response = this.filterData(query, response); //filtra os funcionários
        }
        
        return response
    }

    this.getJSON = () => { /* Método getJSON (pega todos os funcionários) ---------------------------------------- */
        
        var contentFilePath = 'src/bd_funcionarios.txt';
        data = this.loadFile(contentFilePath)

        arr = data.split('\n');
        arr = arr.filter((item) => item != false) //filtra todas os item (linhas) que não estão vazias

        let columns = arr.shift(0); //remove o primeiro elemento do array e retorna para columns
        columns = columns.replace('\r', '').split(';') // separa os itens do array por ;

        const arrObj = arr.map((item) => {
            return this.arrayToJSON(columns, item)
        });
    
        return arrObj;
    }

    this.loadFile = (contentFilePath) => { /* Método loadFile ---------------------------------------- */
        const fs = require('fs');
        const content = fs.readFileSync(contentFilePath, 'utf-8');
        return content;
    }
     
    this.arrayToJSON = (columns, item) => { /* Método arrayToJSON ---------------------------------------- */
        obj = {};

        item = item.replace('\r', '');
        arrLine = item.split(';'); // transforma a linha (string) em um array

        let i = 0;

        const myObj = arrLine.reduce((obj, value) => { //retorna um objeto com as propriedades
            key = columns[i];
            obj[key] = value
            i++;

            return obj
        }, {});

        return myObj;  
    }

    this.filterData = (query, data) => {  /* Método filterData ---------------------------------------- */

        if(query.groupByUfNasc) { // quando quer retornar a quantidade de funcionários em um Estado (UfNasc)

            const dataByUfNasc = data.filter((item) => (item.UfNasc == query.groupByUfNasc))
            let qtd = JSON.stringify(dataByUfNasc.length); 
            objFiltered = { qtdEmployees: qtd}
            
            return objFiltered
        }

        let arrQuery = [];

        for(var key in query){ // percorre os atributos do objeto
            arrQuery.push([key, query[key]]) // coloca em cada posição do array [key, value]
        }

        if(query.SalarioMin) { //se quer filtrar por faixa salarial

            const filtraFaixaSalarial = (salario) => {
                salario = parseFloat(salario);
                min = parseFloat(query.SalarioMin);
                max = parseFloat(query.SalarioMax);
                
                if((salario >= min) && (salario <= max)) {
                    return true;
                }else {
                    return false
                }
            }

            return data.filter(({ Salario }) => filtraFaixaSalarial(Salario));      
        }

        function filtraPorCampos(item, arrQueries){ //filtra por qualquer campo, mas apenas um por vez
            let query = arrQueries[0];
            key = query[0];
            value = query[1];

            return item[key] === value
        } 

        return data.filter((item) => filtraPorCampos(item, arrQuery))
    }
};

module.exports = Employee;