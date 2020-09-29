/* CARREGAR E SALVAR EM DISCO (JSON) */
require('dotenv/config');

const fs = require('fs');
const contentFilePath = './' + process.env.DB_FILE;
console.log('DB_FILE:', process.env.DB_FILE)

function load() {
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')

    try{
        return JSON.parse(fileBuffer)
    }catch(error){
        console.error(error);
        return JSON.parse([]);
    }
    
    //return contentJson
}

const save = (content) => {
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(contentFilePath, contentString/*, err => { //salva o conteúdo em disco
        console.log(err || 'Arquivo salvo!')
    }*/)
}

module.exports = {
    load,
    save
}