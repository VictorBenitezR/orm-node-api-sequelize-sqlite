const db = require('../models');

class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async consultarTodos() {
    return db[this.model].findAll();
  }

  async consultarPorId(id) {
    const registro = await db[this.model].findByPk(id);
    if (!registro) {
      const error = new Error(
        `No se encontró registro con el ID ${id} en ${this.model}`
      );
      error.statusCode = 404;
      throw error;
    }
    return registro;
  }

  async crearRegistro(datosDelRegistro) {
    return db[this.model].create(datosDelRegistro);
  }

  async actualizarRegistro(datosDelRegistro, id) {
    const listaRegistrosActualizados = await db[this.model].update(
      datosDelRegistro,
      {
        where: { id: id },
      }
    );

    if (listaRegistrosActualizados[0] === 0) {
      const error = new Error(
        `Error al actualizar: El ID ${id} no existe en ${this.model}`
      );
      error.statusCode = 404;
      throw error;
    }
    return true;
  }

  async borrarRegistro(id) {
    const fueBorrado = await db[this.model].destroy({ where: { id: id } });

    if (!fueBorrado) {
      const error = new Error(
        `Error al eliminar: El ID ${id} no existe en ${this.model}`
      );
      error.statusCode = 404;
      throw error;
    }
    return fueBorrado;
  }
}

module.exports = Services;
