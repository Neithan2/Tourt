const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Obtener la API key desde la variable de entorno
const API_KEY = process.env.API_KEY;

// Crear un torneo
async function crearTorneo(providerId, nombre) {
    try {
        console.log('Creando torneo:', nombre);
        const response = await axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v5/tournaments?api_key=${API_KEY}`, {
            name: nombre,
            providerId
        });
        console.log('Torneo creado exitosamente:', response.data);
        const tournamentId = response.data.tournamentId;
        
        // Generar códigos de torneo
        const codigos = await generarCodigosTorneo(tournamentId, 10); // Generar 10 códigos de torneo
        
        return { tournamentId, codigos };
    } catch (error) {
        console.error('Error al crear el torneo:', error.response.data);
        throw error;
    }
}

// Endpoint POST para crear un torneo
app.post('/crear-torneo', async (req, res) => {
    try {
        console.log('Recibida solicitud para crear torneo:', req.body);
        const proveedor = await registrarProveedor('LAS', 'https://tournament123-326820419c99.herokuapp.com/');
        console.log('Proveedor obtenido:', proveedor);

        const { tournamentId, codigos } = await crearTorneo(proveedor.providerId, 'Torneo de prueba');
        console.log('Torneo creado:', tournamentId);
        console.log('Códigos de torneo generados:', codigos);

        res.status(200).json({ mensaje: 'Torneo creado correctamente', provider: proveedor, tournamentId, codigos });
    } catch (error) {
        console.error('Error al crear el torneo:', error.message);
        res.status(500).json({ error: 'Error al crear el torneo', mensaje: error.message });
    }
});


// Ruta GET para la página de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación de torneos!');
});
