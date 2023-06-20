const { PORT, MONGO_URI } = require('./config/constanst');
const connectDB = require('./config/database');
const express = require('express');
const { createServer } = require('http');
const { router } = require('./routes');

const app = express();

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
