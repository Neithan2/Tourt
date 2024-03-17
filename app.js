const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta POST para manejar las notificaciones del servidor
app.post('/notificacion-servidor', (req, res) => {
  // Aquí procesas la notificación del servidor
  const notificacion = req.body;
  
  // Procesa la notificación según sea necesario para tu aplicación
  console.log('Notificación del servidor recibida:', notificacion);
  
  // Envía una respuesta al servidor de League of Legends para confirmar la recepción de la notificación
  res.status(200).send('Notificación recibida correctamente');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
