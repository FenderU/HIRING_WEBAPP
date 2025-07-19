const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Ruta para guardar constancia en base de datos
router.post('/guardar-constancia', (req, res) => {
  const { nombre, cargo, salario, tiempo, email } = req.body;

  const sql = `INSERT INTO constancias (nombre, cargo, salario, tiempo, email)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, cargo, salario, tiempo, email], (err, result) => {
    if (err) {
      console.error('Error al guardar:', err);
      return res.status(500).json({ mensaje: 'Error al guardar la constancia' });
    }
    res.json({ mensaje: 'Constancia guardada exitosamente' });
  });
});

// Ruta GET /api/contratado/ (raíz del router)
router.get('/', (req, res) => {
  res.send('API contratado funcionando');
});

module.exports = router;
