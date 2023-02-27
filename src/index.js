require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const {createServer} = require('http');
const { router } = require('./routes');
/* const { expressjwt } = require('express-jwt'); */


const app = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

/* app.use(expressjwt({ secret: process.env.JWT_PRIVATE_KEY, algorithms: ["HS256"] }).unless({ path: ['/api/login'] })); */

app.use(router);

/* Start */
  const Server = createServer(app); 

  connectDB(process.env.MONGO_URI)
  .catch(err => {
    console.error(`Error al conectarse a la base de datos: ${err.message}`);
    process.exit(1);
  });
  
  Server.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });



