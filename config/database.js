const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres.jpxztixckjkwtkwmlqib:GESTION._.69@aws-0-us-west-1.pooler.supabase.com:6543/postgres', {
  dialect: 'postgres',
  logging: false, // Desactiva el logging de SQL en la consola
});

module.exports = sequelize;
