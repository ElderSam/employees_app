const express = require('express'); //adiciona o express

const routes = express.Router();

// Primeira rota
app.get("/", (req, res) => { res.send('Server is running!'); });

app.get("/api", (req, res) => {

    var file = 'src/bd_funcionarios.txt';
    readFile(file);

    function readFile(file) {
        
        var arr = [];

        const readline = require('readline');
        const fs = require('fs');

        const rl = readline.createInterface({
            input: fs.createReadStream(file)
        });

        rl.on('line', function (line) { // para cada linha do arquivo

            if(line) { //se a linha não está vazia
                //console.log('Line from file:', line);
                arr.push(line);
            }
        });

        rl.on('close', function() { // quando termina a leitura do arquivo
            
            console.log('arr', arr);
        });
    }
    
});

module.exports = routes;