const db = require('../models');

class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async consultarTodos() {
    return db[this.model].findAll();
  }

  async consultarPorId(id) {
    return db[this.model].findByPk(id);
  }

  async crearRegistro(datosDelRegistro) {
    return db[this.model].create(datosDelRegistro);
  }

  async actualizarRegistro(datosDelRegistro, id) {
    const resultado = await db[this.model].update(datosDelRegistro, {
      where: { id: id },
    });
    if (resultado[0] === 0) {
      return false;
    }
    return true;
  }

  async borrarRegistro(id) {
    return db[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
