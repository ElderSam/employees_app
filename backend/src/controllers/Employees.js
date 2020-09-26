getJSON();
console.log(data);

function getJSON() {
    
    var contentFilePath = 'src/bd_funcionarios.txt';
    data = load(contentFilePath)
    //console.log(data)

    arr = data.split('\n');

    arr = arr.filter((item) => item != false) //filtra todas os item (linhas) que não estão vazias

    let columns = arr.shift(0); //remove o primeiro elemento do array e retorna para columns

    columns = columns.replace('\r', '').split(';') // separa os itens do array por ;

    return arr;
}

function load(contentFilePath) {
    const fs = require('fs');
    const content = fs.readFileSync(contentFilePath, 'utf-8');
    return content;
}