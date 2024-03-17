const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta POST para recibir los resultados del torneo desde Riot Games
app.post('/resultados-torneo', (req, res) => {
  // Aquí procesas los resultados del torneo enviados por Riot Games
  // Los datos del torneo estarán en req.body
  
  // Lógica para almacenar los resultados en tu base de datos o realizar cualquier acción necesaria
  
  // Envía una respuesta al cliente
  res.status(200).json({ mensaje: 'Resultados del torneo recibidos correctamente' });
});

// Ruta GET para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación de torneos!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
