const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstudianteCurso = sequelize.define('EstudianteCurso', {
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiantes',  // Nombre de la tabla de estudiantes
      key: 'id_estudiante',
    },
    onDelete: 'CASCADE',  // Si el estudiante se elimina, también se elimina la inscripción
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'curso',  // Nombre de la tabla de cursos
      key: 'id_curso',
    },
    onDelete: 'CASCADE',  // Si el curso se elimina, también se elimina la inscripción
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Fecha actual por defecto
  },
}, {
  tableName: 'estudiante_curso',  // Nombre de la tabla en la base de datos
  timestamps: false,  // No agregar createdAt o updatedAt
});

module.exports = EstudianteCurso;
