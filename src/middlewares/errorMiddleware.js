module.exports = (err, req, res, next) => {
  // En desarrollo, es vital ver el stack trace para arreglar bugs rápido
  console.error('--- DETALLE DEL ERROR ---');
  console.error(err.stack);
  console.error('-------------------------');

  // 1. Errores de Validación (Campos obligatorios, formatos mal, etc.)
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Datos inválidos o incompletos',
      errors: err.errors.map((e) => e.message),
    });
  }

  // 2. Errores de Restricción Única (Email o DNI ya existen)
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      // 409 Conflict
      message: 'Conflicto: Algunos datos ya se encuentran registrados',
      errors: err.errors.map((e) => e.message),
    });
  }

  // 3. Errores de Llave Foránea (Intentar usar un ID que no existe en otra tabla)
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      message:
        'Error de relación: Uno de los IDs proporcionados no existe en el sistema',
    });
  }

  // 4. Errores de Base de Datos (Sintaxis SQL, conexión, etc.)
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      message: 'Ocurrió un error técnico con la base de datos',
      detail: err.message,
    });
  }

  // 5. Nuestros errores personalizados (los que lanzamos con error.statusCode)
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    status: 'error',
    message: message,
  });
};
