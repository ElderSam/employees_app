require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express'); //adiciona o express
const cors = require('cors'); //permite acesso de domínios externos

app = express(); // inicia o app

app.use(express.json()); //permite receber informações em JSON
app.use(cors()); //cors() sem parâmetros permite acesso de todos os domínios, a API se torna pública

app.use('/api', require('./src/routes'));

porta = 3001
//inicia o servidor na porta 3001
app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
}); 