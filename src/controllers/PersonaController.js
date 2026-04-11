const Controller = require('./Controller.js');
const PersonaService = require('../services/PersonaService.js');
const asyncHandler = require('../utils/asyncHandler.js'); // Importamos para el método extra

const personaService = new PersonaService();

class PersonaController extends Controller {
  constructor() {
    super(personaService);
    // Envolvemos el método específico que no está en el padre
    this.consultarMatriculas = asyncHandler(
      this.consultarMatriculas.bind(this)
    );
  }

  async consultarMatriculas(req, res) {
    const { id } = req.params;
    const listaMatriculas = await personaService.consultarMatriculasEstudiante(
      Number(id)
    );

    // Si el estudiante no existe o no tiene matrículas, podrías manejarlo aquí
    // pero por ahora, enviamos la lista (aunque sea vacía)
    return res.status(200).json(listaMatriculas);
  }
}

module.exports = PersonaController;
