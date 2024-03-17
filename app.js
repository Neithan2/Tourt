const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Endpoint POST para crear un torneo
app.post('/crear-torneo', (req, res) => {
  // Aquí procesas la solicitud para crear un torneo
  // Los datos del torneo estarán en req.body
  const datosTorneo = req.body;
  
  // Aquí debes implementar la lógica para crear el torneo
  // Por ejemplo, puedes hacer una llamada a la API de torneos de Riot Games
  
  // Envía una respuesta al cliente
  res.status(200).json({ mensaje: 'Torneo creado correctamente', datosTorneo });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
