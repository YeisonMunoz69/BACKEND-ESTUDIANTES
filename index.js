const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const estudiantesRoutes = require('./routes/estudiantes');
const cursosRoutes = require('./routes/cursos');
const inscripcionRoutes = require('./routes/inscripcion');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas
app.use('/estudiantes', estudiantesRoutes); // Rutas para estudiantes
app.use('/cursos', cursosRoutes); // Rutas para cursos
app.use('/inscripcion', inscripcionRoutes);  // Rutas para inscripciones
app.use('/login', loginRoutes);  // Rutas para logins

/*
// !BORRAR LUEGO DE USAR
//sirve para sincronizar la base de datos con los modelos de sequelize 
sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
*/

// Conectar a la base de datos y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    return sequelize.sync(); // Sincroniza los modelos con las tablas
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
