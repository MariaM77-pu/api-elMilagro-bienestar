const db = require('../db');

// Consultar todos los pagos asociados a un número de plano
exports.consultarBienestar = (req, res) => {
  const finca = req.params.finca;

  const query = `
    SELECT 
      id,
      finca,
      puntaje,
      fecha_inspeccion,
      evaluador,
      vigencia
    FROM bienestar
    WHERE finca = ?
    ORDER BY fecha_inspeccion DESC
  `;

  db.query(query, [finca], (err, results) => {
    if (err) {
      console.error('Error al consultar bienestar:', err);
      return res.status(500).json({ error: 'Error al consultar bienestar en esta finca' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró bienestar en esta finca.' });
    }

    res.status(200).json({
      mensaje: 'Bienestar encontrado exitosamente',
      data: results
    });
  });
};


// Insertar 
exports.registrarBienestar = (req, res) => {
  const { finca, puntaje, fecha_inspeccion, evaluador, vigencia } = req.body;

  if (!finca || !puntaje || !fecha_inspeccion || !evaluador || !vigencia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = `
    INSERT INTO bienestar 
    (finca, puntaje, fecha_inspeccion, evaluador, vigencia) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [finca, puntaje, fecha_inspeccion, evaluador, vigencia], (err, result) => {
    if (err) {
      console.error('Error al registrar el bienestar:', err);
      return res.status(500).json({ error: 'Error al registrar el bienestar' });
    }

    res.status(201).json({
      message: 'Bienestar registrado correctamente',
      data: { finca, puntaje, fecha_inspeccion, evaluador, vigencia }
    });
  });
};

