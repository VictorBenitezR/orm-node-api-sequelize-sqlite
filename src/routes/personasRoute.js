const { Router } = require('express');
const PersonaController = require('../controllers/PersonaController.js');

const personaController = new PersonaController();

const router = Router();

// Endpoint: GET http://localhost:3000/personas
router.get('/personas', (req, res) => {
  personaController.consultarTodos(req, res);
});

router.get('/personas/:id', (req, res) => {
  personaController.consultarPorId(req, res);
});

router.post('/personas', (req, res) => {
  personaController.crearRegistro(req, res);
});

router.put('/personas/:id', (req, res) => {
  personaController.actualizarRegistro(req, res);
});

router.delete('/personas/:id', (req, res) => {
  personaController.borrarRegistro(req, res);
});
module.exports = router;
