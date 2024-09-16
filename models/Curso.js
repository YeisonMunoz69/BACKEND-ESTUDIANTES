const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
  id_curso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'curso',
  timestamps: false,
});

module.exports = Curso;
