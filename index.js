//----------------importar bibliotecas
const express = require('express');

const cors = require('cors');

//----------------importar dependencias
const routes = require('./src/routes/routes');

//------------------Principais variaveis
const server = express();
const port = 303;

//------------------configuração do servidor
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(routes);

//------------------inicializa servidor
server.listen(process.env.PORT || port, console.log('Servidor Rodando'));
