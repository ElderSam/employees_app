const express = require('express'); //adiciona o express

app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001); //inicia o servidor na porta 3001