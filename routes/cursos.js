const express = require('express');
const { Curso } = require('../models');
const router = express.Router();

// Ruta GET para obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta GET para obtener un curso por id
router.get('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo curso
router.post('/', async (req, res) => {
    try {
      const { nombre_curso, descripcion, creditos } = req.body;
      const nuevoCurso = await Curso.create({ nombre_curso, descripcion, creditos });
      res.status(201).json(nuevoCurso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 // Ruta PUT para actualizar un curso por id
router.put('/:id', async (req, res) => {
  try {
    const { nombre_curso, descripcion, creditos } = req.body;
    const curso = await Curso.findByPk(req.params.id);

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Actualizar el curso
    curso.nombre_curso = nombre_curso || curso.nombre_curso;
    curso.descripcion = descripcion || curso.descripcion;
    curso.creditos = creditos || curso.creditos;

    await curso.save();
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
// Ruta DELETE para eliminar un curso por id
router.delete('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    await curso.destroy();
    res.status(200).json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
