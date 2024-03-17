const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Obtener la API key desde la variable de entorno
const API_KEY = process.env.API_KEY;

// Registro como proveedor en la región LAS
async function registrarProveedor(region, url) {
    try {
        console.log('Registrando proveedor en la región:', region);
        const response = await axios.post(`https://${region}.api.riotgames.com/lol/tournament-stub/v5/providers?api_key=${API_KEY}`, {
            region,
            url
        });
        console.log('Proveedor registrado exitosamente:', response.data);
        return response.data.providerId;
    } catch (error) {
        console.error('Error al registrar el proveedor:', error.response.data);
        throw error;
    }
}

// Endpoint POST para crear un torneo
app.post('/crear-torneo', async (req, res) => {
    try {
        console.log('Recibida solicitud para crear torneo:', req.body);
        const providerId = await registrarProveedor('LAS', 'https://tournament123-326820419c99.herokuapp.com/');
        console.log('ProveedorId obtenido:', providerId);
        // Resto del código...
        res.status(200).json({ mensaje: 'Torneo creado correctamente', providerId, tournamentId, codigos });
    } catch (error) {
        console.error('Error al crear el torneo:', error.message);
        res.status(500).json({ error: 'Error al crear el torneo', mensaje: error.message });
    }
});


// Ruta GET para la página de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación de torneos!');
});
