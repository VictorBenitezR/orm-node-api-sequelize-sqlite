const Controller = require('./Controller.js');
const PersonaService = require('../services/PersonaService.js');

const personaService = new PersonaService();

class PersonaController extends Controller {
  constructor() {
    super(personaService);
  }
}

module.exports = PersonaController;
