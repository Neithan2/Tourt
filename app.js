const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta POST para guardar los resultados del torneo
app.post('/resultados-torneo', (req, res) => {
  const datosResultados = req.body;
  
  // Guardar los datos de resultados en un archivo en la carpeta /resultados-torneo
  fs.writeFile('./resultados-torneo/resultados.json', JSON.stringify(datosResultados), (err) => {
    if (err) {
      console.error('Error al guardar los resultados:', err);
      res.status(500).send('Error al guardar los resultados');
    } else {
      console.log('Resultados del torneo guardados correctamente');
      res.status(200).send('Resultados del torneo guardados correctamente');
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
