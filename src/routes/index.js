const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const submisionRouter = require('./submision.routes');
const circuloRouter = require('./circulo.routes');
const organismoRouter = require('./organismo.routes');
const userRouter = require('./user.routes');

const router = express.Router();

// Crear una ruta base para todas las rutas de la API y agregar las rutas de cada entidad a la ruta base
router.use('/api', cors(), helmet(), express.json());
router.use('/api/submisions', submisionRouter);
router.use('/api/circulos', circuloRouter);
router.use('/api/organismos', organismoRouter);
router.use('/api/users', userRouter);

module.exports = {router};
