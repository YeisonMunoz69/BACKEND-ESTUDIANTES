const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Login = sequelize.define('Login', {
  id_login: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiantes', // Nombre de la tabla de estudiantes
      key: 'id_estudiante',
    },
    onDelete: 'CASCADE',  // Si el estudiante es eliminado, también se elimina el login
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ultima_conexion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'login', // Nombre de la tabla en la base de datos
  timestamps: false,  // Desactiva el uso de createdAt y updatedAt
});

module.exports = Login;
