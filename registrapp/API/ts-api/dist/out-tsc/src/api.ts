import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';

// Inicializa la app de Firebase
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<tu-proyecto>.firebaseio.com' // Cambia <tu-proyecto> por el ID de tu proyecto
});

const db = admin.firestore();
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Registrar Usuario
app.post('/api/usuarios/register', async (req: Request, res: Response) => {
    const { username, password, correo, nombre, tipo, sede, telefono } = req.body;

    // Validar campos
    if (!username || !password || !correo || !nombre || !tipo) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    try {
        // Crear un nuevo documento en la colección "usuarios"
        const nuevoUsuario = {
            username,
            password,
            correo,
            nombre,
            tipo,
            sede,
            telefono,
        };

        const usuarioRef = await db.collection('usuarios').add(nuevoUsuario);
        return res.status(201).json({ id: usuarioRef.id, ...nuevoUsuario }); // Asegúrate de retornar la respuesta
    } catch (error) {
        console.error("Error agregando usuario: ", error);
        return res.status(500).send('Error al registrar el usuario.'); // Asegúrate de retornar la respuesta
    }
});

// Obtener Todos los Usuarios
app.get('/api/usuarios', async (req: Request, res: Response) => {
    try {
        const snapshot = await db.collection('usuarios').get();
        const usuarios: any[] = [];
        
        snapshot.forEach((doc) => {
            usuarios.push({ id: doc.id, ...doc.data() });
        });
        
        return res.json(usuarios); // Asegúrate de retornar la respuesta
    } catch (error) {
        console.error("Error obteniendo usuarios: ", error);
        return res.status(500).send('Error al obtener usuarios.'); // Asegúrate de retornar la respuesta
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
