//EN ESTE ARCHIVO SE PUEDE CAMBIAR AL ESTUDIANTE DE CURSO, SE DEBE ENVIAR EL ID DEL ESTUDIANTE, 
//EL ID DEL CURSO ACTUAL Y EL ID DEL CURSO NUEVO

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

// Ruta PUT para actualizar la inscripción de un estudiante a otro curso
router.put('/', async (req, res) => {
    try {
      const { id_estudiante, id_curso_actual, id_curso_nuevo } = req.body;
  
      // Verificar si el estudiante está inscrito en el curso actual
      const estudiante = await Estudiante.findByPk(id_estudiante);
      const cursoActual = await Curso.findByPk(id_curso_actual);
      const cursoNuevo = await Curso.findByPk(id_curso_nuevo);
  
      if (!estudiante || !cursoActual || !cursoNuevo) {
        return res.status(404).json({ error: 'Estudiante o curso no encontrado' });
      }
  
      // Eliminar la inscripción del curso actual
      await estudiante.removeCurso(cursoActual);
  
      // Inscribir el estudiante en el nuevo curso
      await estudiante.addCurso(cursoNuevo);
  
      res.status(200).json({ message: 'Inscripción actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
