const asyncHandler = require('../utils/asyncHandler.js');

class Controller {
  constructor(service) {
    this.service = service;

    // Envolvemos los métodos automáticamente en el constructor
    // para que las clases que hereden ya tengan el manejo de errores
    this.consultarTodos = asyncHandler(this.consultarTodos.bind(this));
    this.consultarPorId = asyncHandler(this.consultarPorId.bind(this));
    this.crearRegistro = asyncHandler(this.crearRegistro.bind(this));
    this.actualizarRegistro = asyncHandler(this.actualizarRegistro.bind(this));
    this.borrarRegistro = asyncHandler(this.borrarRegistro.bind(this));
  }

  async consultarTodos(req, res) {
    const listarRegistros = await this.service.consultarTodos();
    return res.status(200).json(listarRegistros);
  }

  async consultarPorId(req, res) {
    const { id } = req.params;
    const registro = await this.service.consultarPorId(Number(id));
    return res.status(200).json(registro);
  }

  async crearRegistro(req, res) {
    const datosDelRegistro = req.body;
    const nuevoRegistro = await this.service.crearRegistro(datosDelRegistro);
    return res.status(201).json(nuevoRegistro); // 201 es el estándar para "Creado"
  }

  async actualizarRegistro(req, res) {
    const { id } = req.params;
    const datosDelRegistro = req.body;

    const isUpdate = await this.service.actualizarRegistro(
      datosDelRegistro,
      Number(id)
    );

    if (!isUpdate) {
      // Lanzamos un error que el errorMiddleware atrapará
      const error = new Error(`id: ${id} no encontrado`);
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: `id: ${id} actualizado correctamente` });
  }

  async borrarRegistro(req, res) {
    const { id } = req.params;
    await this.service.borrarRegistro(Number(id));
    return res
      .status(200)
      .json({ message: `id: ${id} eliminado correctamente` });
  }
}

module.exports = Controller;
