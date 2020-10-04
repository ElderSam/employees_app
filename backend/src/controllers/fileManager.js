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

    try{
        fs.writeFileSync(contentFilePath, contentString, 'utf-8')   
        
        res = 'Arquivo salvo!'
        console.log(res)
        return res;

    }catch(error) {
        console.log('Erro ao salvar arquivo JSON', error);
        return error
    }      
}

module.exports = {
    load,
    save
}