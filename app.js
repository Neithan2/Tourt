const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Registro como proveedor en la región LAS
async function registrarProveedor(region, url) {
    try {
        const response = await axios.post(`https://${region}.api.riotgames.com/lol/tournament-stub/v5/providers?api_key=TU_API_KEY`, {
            region,
            url
        });
        return response.data.providerId;
    } catch (error) {
        console.error('Error al registrar el proveedor:', error.response.data);
        throw error;
    }
}

// Crear un torneo
async function crearTorneo(providerId, nombre) {
    try {
        const response = await axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v5/tournaments?api_key=TU_API_KEY`, {
            name: nombre,
            providerId
        });
        return response.data.tournamentId;
    } catch (error) {
        console.error('Error al crear el torneo:', error.response.data);
        throw error;
    }
}

// Generar códigos de torneo
async function generarCodigosTorneo(tournamentId, cantidad) {
    try {
        const response = await axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v5/codes?api_key=TU_API_KEY`, {
            tournamentId,
            count: cantidad
        });
        return response.data;
    } catch (error) {
        console.error('Error al generar códigos de torneo:', error.response.data);
        throw error;
    }
}

// Endpoint POST para crear un torneo
app.post('/crear-torneo', async (req, res) => {
    try {
        const providerId = await registrarProveedor('LAS', 'https://tournament123-326820419c99.herokuapp.com/');
        const tournamentId = await crearTorneo(providerId, 'Torneo de prueba');
        const codigos = await generarCodigosTorneo(tournamentId, 10); // Generar 10 códigos de torneo
        res.status(200).json({ mensaje: 'Torneo creado correctamente', providerId, tournamentId, codigos });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el torneo', mensaje: error.message });
    }
});

// Ruta GET para la página de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación de torneos!');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
