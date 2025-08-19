const express = require('express');
const router = express.Router();
const bienestarController = require('../controllers/bienestar.controller');

router.get('/verificar-bienestar/:finca', bienestarController.consultarBienestar);

router.post('/registrar-bienestar', bienestarController.registrarBienestar);

module.exports = router;