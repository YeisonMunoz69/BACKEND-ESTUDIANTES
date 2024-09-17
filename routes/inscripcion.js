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

// Ruta GET para obtener los cursos de un estudiante
router.get('/estudiante/:id_estudiante', async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id_estudiante, {
      include: Curso
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.status(200).json(estudiante.Cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta GET para obtener los estudiantes inscritos en un curso
router.get('/curso/:id_curso', async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id_curso, {
      include: Estudiante
    });

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(200).json(curso.Estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta DELETE para eliminar una inscripción (quitar a un estudiante de un curso)
router.delete('/', async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.body;

    // Verificar si el estudiante y el curso existen
    const estudiante = await Estudiante.findByPk(id_estudiante);
    const curso = await Curso.findByPk(id_curso);

    if (!estudiante || !curso) {
      return res.status(404).json({ error: 'Estudiante o curso no encontrado' });
    }

    // Verificar si la inscripción realmente existe en la tabla intermedia
    const inscripcion = await estudiante.getCursos({ where: { id_curso } });

    if (inscripcion.length === 0) {
      return res.status(404).json({ error: 'La inscripción no existe.' });
    }

    // Si la inscripción existe, eliminarla
    await estudiante.removeCurso(curso);
    res.status(200).json({ message: 'Inscripción eliminada correctamente' });
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
