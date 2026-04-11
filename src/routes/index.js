const express = require('express');
const personas = require('./personasRoute.js');
const categorias = require('./categoriasRoute.js');
const cursos = require('./cursosRoute.js');
const errorMiddleware = require('../middlewares/errorMiddleware.js');

module.exports = (app) => {
  app.use(express.json(), personas, categorias, cursos);

  app.use(errorMiddleware);
};
