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

module.exports = router;
