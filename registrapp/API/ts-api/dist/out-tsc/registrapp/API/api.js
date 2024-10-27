import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { User } from '../model/user';          // Importa la clase User
import { Profile } from './profile';    // Importa la clase Profile
import { Contacto } from './contacto';  // Importa la clase Contacto si la necesitas
import { Persona } from './persona';    // Importa la interfaz Persona si la necesitas

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
app.post('/api/usuarios/register', async (req, res) => {
    const { username, password, correo, nombre, tipo, sede, telefono } = req.body;

    // Validar campos
    if (!username || !password || !correo || !nombre || !tipo) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    try {
        // Crear un nuevo perfil
        const profile = new Profile(1, 'defaultCode', 'Default Name'); // Cambia estos valores según tu lógica

        // Crear un nuevo usuario
        const nuevoUsuario = new User(0, username, password, profile); // Asegúrate de asignar el idUser correctamente

        // Crear un nuevo documento en la colección "usuarios"
        const usuarioRef = await db.collection('usuarios').add({
            username: nuevoUsuario.username,
            password: nuevoUsuario.password,
            profile: {
                id: nuevoUsuario.profile.id,
                code: nuevoUsuario.profile.code,
                name: nuevoUsuario.profile.name
            },
            correo,
            nombre,
            tipo,
            sede,
            telefono,
        });
        return res.status(201).json({ id: usuarioRef.id, ...nuevoUsuario });
    } catch (error) {
        console.error("Error agregando usuario: ", error);
        return res.status(500).send('Error al registrar el usuario.');
    }
});

// Obtener Todos los Usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const snapshot = await db.collection('usuarios').get();
        const usuarios = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            const profile = new Profile(data.profile.id, data.profile.code, data.profile.name);
            const user = new User(0, data.username, data.password, profile);
            usuarios.push({ id: doc.id, ...user });
        });
        return res.json(usuarios);
    } catch (error) {
        console.error("Error obteniendo usuarios: ", error);
        return res.status(500).send('Error al obtener usuarios.');
    }
});
