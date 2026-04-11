const Services = require('./Services.js');

class PersonaService extends Services {
  constructor() {
    super('Persona');
  }

  async consultarMatriculasEstudiante(id) {
    // Validamos existencia del estudiante (Lanza 404 si no existe)
    const estudiante = await super.consultarPorId(id);

    // Obtenemos las matrículas usando el mixin
    const listaMatriculas = await estudiante.getCursosMatriculados();

    // Regla: Si el estudiante es un 'docente', no debería tener matrículas de alumno.
    if (estudiante.rol !== 'estudiante') {
      const error = new Error(
        'Solo los alumnos pueden tener matrículas de cursos.'
      );
      error.statusCode = 400; // Bad Request: Petición semánticamente incorrecta
      throw error;
    }

    // Regla: Si el estudiante está inactivo, quizás no queramos mostrar sus cursos
    if (!estudiante.activo) {
      const error = new Error(
        'No se pueden consultar matrículas de un estudiante inactivo.'
      );
      error.statusCode = 403; // Forbidden: Entiendo quién eres pero no tienes permiso
      throw error;
    }

    return listaMatriculas;
  }
}

module.exports = PersonaService;
