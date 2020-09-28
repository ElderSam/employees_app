require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express'); //adiciona o express

app = express(); // inicia o app

app.use('/api', require('./src/routes'));

porta = 3001
//inicia o servidor na porta 3001
app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
}); 