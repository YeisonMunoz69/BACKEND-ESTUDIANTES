const Estudiante = require('./Estudiante');
const Curso = require('./Curso');
const Login = require('./Login');

// Relación muchos a muchos entre Estudiantes y Cursos
Estudiante.belongsToMany(Curso, { through: 'estudiante_curso', foreignKey: 'id_estudiante' });
Curso.belongsToMany(Estudiante, { through: 'estudiante_curso', foreignKey: 'id_curso' });

// Relación uno a uno entre Estudiantes y Login
Estudiante.hasOne(Login, { foreignKey: 'id_estudiante' });
Login.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });

module.exports = { Estudiante, Curso, Login };
