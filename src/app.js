const express = require('express');

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.status(200).send({ mensagem: 'Bienvenido a la API' });
});

module.exports = app;
