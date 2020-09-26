const express = require('express'); //adiciona o express

app = express(); // inicia o app

app.use('/api', require('./src/routes'));





app.listen(3001); //inicia o servidor na porta 3001