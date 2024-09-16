const express = require('express');
const { Estudiante } = require('../models');
const router = express.Router();

// Ruta GET para obtener todos los estudiantes
router.get('/', async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll();
      res.status(200).json(estudiantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta GET para obtener un estudiante por id
  router.get('/:id', async (req, res) => {
    try {
      const estudiante = await Estudiante.findByPk(req.params.id);
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.status(200).json(estudiante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta POST para crear un estudiante
router.post('/', async (req, res) => {
    try {
      const { nombre, apellido, correo, fecha_nacimiento } = req.body;
      const nuevoEstudiante = await Estudiante.create({ nombre, apellido, correo, fecha_nacimiento });
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
