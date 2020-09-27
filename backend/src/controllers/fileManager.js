/* CARREGAR E SALVAR EM DISCO (JSON) */

const fs = require('fs');
const contentFilePath = './employees.json';

function load() {
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
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