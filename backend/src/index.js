const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app); // servidor http fora do express

setupWebsocket(server);

mongoose.connect('mongodb+srv://<user>:<password>@<cluster>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipo de parâmetros:
// Query params: request.query - Filtros, ordenação, paginação...
// Route params: request.params - Identificar um recurso na alteração ou remoção
// Body: request.body - Dados para criação ou alteração de um registro

server.listen(3333);
