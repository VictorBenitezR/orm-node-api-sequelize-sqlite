const express = require('express');
const personas = require('./personasRoute.js');

module.exports = (app) => {
  app.use(express.json(), personas);
};
