const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
  id_estudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'estudiantes', // Nombre de la tabla en la base de datos
  timestamps: false, // No utiliza createdAt y updatedAt
});

module.exports = Estudiante;
