const express = require('express');
const { Estudiante, Curso } = require('../models');
const router = express.Router();

// Ruta POST para inscribir a un estudiante en un curso
router.post('/', async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.body;

    // Encuentra al estudiante y al curso
    const estudiante = await Estudiante.findByPk(id_estudiante);
    const curso = await Curso.findByPk(id_curso);

    if (!estudiante || !curso) {
      return res.status(404).json({ error: 'Estudiante o Curso no encontrado' });
    }

    // Inscribir el estudiante en el curso
    await estudiante.addCurso(curso);
    res.status(201).json({ message: 'Estudiante inscrito en el curso correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una inscripción (quitar a un estudiante de un curso)
router.delete('/', async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.body;

    const estudiante = await Estudiante.findByPk(id_estudiante);
    const curso = await Curso.findByPk(id_curso);

    if (!estudiante || !curso) {
      return res.status(404).json({ error: 'Estudiante o curso no encontrado' });
    }

    // Eliminar la inscripción
    await estudiante.removeCurso(curso);
    res.status(200).json({ message: 'Inscripción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


module.exports = router;
