const Estudiante = require('./Estudiante');
const Curso = require('./Curso');
const EstudianteCurso = require('./EstudianteCurso');
const Login = require('./Login');

// Relación muchos a muchos entre Estudiantes y Cursos a través de EstudianteCurso
Estudiante.belongsToMany(Curso, { through: EstudianteCurso, foreignKey: 'id_estudiante' });
Curso.belongsToMany(Estudiante, { through: EstudianteCurso, foreignKey: 'id_curso' });

// Relación uno a uno entre Estudiantes y Login
Estudiante.hasOne(Login, { foreignKey: 'id_estudiante' });
Login.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });

module.exports = { Estudiante, Curso, EstudianteCurso, Login };
