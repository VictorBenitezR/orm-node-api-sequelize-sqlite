const express = require('express');
const routes = require('./routes');
const app = express();

// Eliminamos el const port = 3000 y el app.listen de aquí
routes(app);

module.exports = app; // Exportamos solo la configuración
