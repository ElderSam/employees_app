let Employee = function() {
    
    this.getData = () => { /* Método getData ---------------------------------------- */
        
        var contentFilePath = 'src/bd_funcionarios.txt';
        data = this.loadFile(contentFilePath)
        //console.log(data)

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
};

module.exports = Employee;