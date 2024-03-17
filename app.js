const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta GET para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación de torneos!');
});

// Endpoint POST para crear un torneo
app.post('/crear-torneo', (req, res) => {
  const datosTorneo = req.body;
  
  // Guardar los datos del torneo en un archivo
  const torneoFilePath = path.join(__dirname, 'resultados-torneo', 'torneo.json');
  fs.writeFile(torneoFilePath, JSON.stringify(datosTorneo, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar los datos del torneo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Torneo creado correctamente');
      res.status(200).json({ mensaje: 'Torneo creado correctamente', datosTorneo });
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
