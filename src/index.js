const { PORT, MONGO_URI } = require('./config/constanst');
const connectDB = require('./config/database');
const express = require('express');
const { createServer } = require('http');
const { router } = require('./routes');
require('express-async-errors');
/* const { expressjwt } = require('express-jwt'); */

const app = express();

/* app.use(expressjwt({ secret: process.env.JWT_PRIVATE_KEY, algorithms: ["HS256"] }).unless({ path: ['/api/login'] })); */

app.use(router);

/* Start */
const Server = createServer(app);

connectDB(MONGO_URI).catch((err) => {
  console.error(`Error al conectarse a la base de datos: ${err.message}`);
  process.exit(1);
});

Server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
