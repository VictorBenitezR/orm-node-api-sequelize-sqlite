const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

// Endpoint: GET http://localhost:3000/Categorias
router.get('/Categorias', (req, res) => {
  categoriaController.consultarTodos(req, res);
});

router.get('/Categorias/:id', (req, res) => {
  categoriaController.consultarPorId(req, res);
});

router.post('/Categorias', (req, res) => {
  categoriaController.crearRegistro(req, res);
});

router.put('/Categorias/:id', (req, res) => {
  categoriaController.actualizarRegistro(req, res);
});

router.delete('/Categorias/:id', (req, res) => {
  categoriaController.borrarRegistro(req, res);
});
module.exports = router;
