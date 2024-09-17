const express = require('express');
const { Login, Estudiante } = require('../models');
const router = express.Router();

// Ruta POST para crear un login para un estudiante
router.post('/', async (req, res) => {
  try {
    const { id_estudiante, usuario, password_hash } = req.body;

    // Verificar que el estudiante exista
    const estudiante = await Estudiante.findByPk(id_estudiante);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Crear el registro en la tabla login
    const nuevoLogin = await Login.create({ id_estudiante, usuario, password_hash });
    res.status(201).json(nuevoLogin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta PUT para actualizar un login por id
router.put('/:id', async (req, res) => {
  try {
    const { usuario, password_hash, ultima_conexion } = req.body;
    const login = await Login.findByPk(req.params.id);

    if (!login) {
      return res.status(404).json({ error: 'Login no encontrado' });
    }

    // Actualizar el login
    login.usuario = usuario || login.usuario;
    login.password_hash = password_hash || login.password_hash;
    login.ultima_conexion = ultima_conexion || login.ultima_conexion;

    await login.save();
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un login por id
router.delete('/:id', async (req, res) => {
  try {
    const login = await Login.findByPk(req.params.id);

    if (!login) {
      return res.status(404).json({ error: 'Login no encontrado' });
    }

    await login.destroy();
    res.status(200).json({ message: 'Login eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
