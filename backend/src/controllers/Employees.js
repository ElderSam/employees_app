let Employee = function() {
    
    this.getJSON = () => { /* Método getJSON ---------------------------------------- */
        
        var contentFilePath = 'src/bd_funcionarios.txt';
        data = this.loadFile(contentFilePath)
        //console.log(data)

        arr = data.split('\n');

        arr = arr.filter((item) => item != false) //filtra todas os item (linhas) que não estão vazias

        let columns = arr.shift(0); //remove o primeiro elemento do array e retorna para columns

        columns = columns.replace('\r', '').split(';') // separa os itens do array por ;

        //const objData = arr.map((item) => {
        // arrayToJSON(item)
        // });
    
        return this.arrayToJSON(columns, arr[0]);
        
    }

    this.loadFile = (contentFilePath) => { /* Método loadFile ---------------------------------------- */
        const fs = require('fs');
        const content = fs.readFileSync(contentFilePath, 'utf-8');
        return content;
    }
     
    this.arrayToJSON = (columns, item) => { /* Método arrayToJSON ---------------------------------------- */
        obj = {};

        item = item.replace('\r', '');
        arrLine = item.split(';');
    
        //console.log(arrLine)

        let i = 0;

        const myObj = arrLine.reduce((obj, value) => { //retorna um objeto com as propriedades
            key = columns[i];
            obj[key] = value
            i++;

            //console.log(`${key}: ${value}`);
            return obj
        }, {});

        console.log(myObj)
        return myObj
        //console.log(JSON.stringify(myObj))     
    }
};


module.exports = Employee;