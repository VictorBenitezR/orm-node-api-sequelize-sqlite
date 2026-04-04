class Controller {
  constructor(service) {
    this.service = service;
  }
  async consultarTodos(req, res) {
    try {
      const listarRegistros = await this.service.consultarTodos();
      return res.status(200).json(listarRegistros);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async consultarPorId(req, res) {
    const { id } = req.params;
    try {
      const registro = await this.service.consultarPorId(Number(id));
      return res.status(200).json(registro);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async crearRegistro(req, res) {
    const datosDelRegistro = req.body;
    try {
      const nuevoRegistro = await this.service.crearRegistro(datosDelRegistro);
      return res.status(200).json(nuevoRegistro);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async actualizarRegistro(req, res) {
    const { id } = req.params;
    const datosDelRegistro = req.body;
    try {
      const isUpdate = await this.service.actualizarRegistro(
        datosDelRegistro,
        Number(id)
      );
      if (isUpdate) {
        return res
          .status(200)
          .json({ message: `id: ${id} actualizado correctamente` });
      } else {
        return res.status(404).json({ message: `id: ${id} no encontrado` });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async borrarRegistro(req, res) {
    const { id } = req.params;
    try {
      await this.service.borrarRegistro(Number(id));
      return res
        .status(200)
        .json({ message: `id: ${id} eliminado correctamente` });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = Controller;
