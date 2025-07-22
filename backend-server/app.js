// app.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MySQL
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hakoroom'
});

mc.connect(err => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        process.exit(1);
    }
    console.log('Conexión a la base de datos establecida');
});



// --------- RUTAS LOCACIONES ---------

// GET todas las locaciones
app.get('/locaciones', (req, res) => {
    mc.query('SELECT * FROM locacion', (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, data: results });
    });
});

// GET locación por ID
app.get('/locaciones/:id', (req, res) => {
    const id = req.params.id;
    mc.query('SELECT * FROM locacion WHERE IDLocacion = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err });
        if (results.length === 0) return res.status(404).json({ error: true, message: 'Locación no encontrada' });
        res.json({ error: false, data: results[0] });
    });
});

// POST crear locación
app.post('/locaciones', (req, res) => {
    const nuevaLocacion = {
        Area: req.body.Area,
        Habitaciones: req.body.Habitaciones,
        Imagen: req.body.Imagen,
        Ubicacion: req.body.Ubicacion,
        Descripcion: req.body.Descripcion,
        PrecioMensual: req.body.PrecioMensual,
        IDAdmin: req.body.IDAdmin,
        TipoLocacion: req.body.TipoLocacion,
        Puntaje: req.body.Puntaje
    };
    mc.query('INSERT INTO locacion SET ?', nuevaLocacion, (err, result) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.status(201).json({ error: false, message: 'Locación creada', id: result.insertId });
    });
});

// PUT actualizar locación
app.put('/locaciones/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    mc.query('UPDATE locacion SET ? WHERE IDLocacion = ?', [data, id], (err) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, message: 'Locación actualizada' });
    });
});

// DELETE eliminar locación
app.delete('/locaciones/:id', (req, res) => {
    const id = req.params.id;
    mc.query('DELETE FROM locacion WHERE IDLocacion = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, message: 'Locación eliminada' });
    });
});

// --------- RUTAS USUARIOS ---------

// GET todos los usuarios
app.get('/usuarios', (req, res) => {
    mc.query('SELECT * FROM usuario', (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, data: results });
    });
});

// GET usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    mc.query('SELECT * FROM usuario WHERE IDUsuario = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err });
        if (results.length === 0) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
        res.json({ error: false, data: results[0] });
    });
});

// POST crear usuario
app.post('/usuarios', (req, res) => {
    console.log('Datos recibidos para crear usuario:', req.body); 
    const nuevoUsuario = {
        Run: req.body.Run,
        Nombre: req.body.Nombre,
        ApellidoPaterno: req.body.ApellidoPaterno,
        ApellidoMaterno: req.body.ApellidoMaterno,
        Correo: req.body.Correo,
        Contrasena: req.body.Contrasena,
        IdRol: req.body.IdRol
    };
    mc.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error MySQL:', err); // Log del error MySQL
            return res.status(500).json({ error: true, message: err.sqlMessage || err });
        }
        res.status(201).json({ error: false, message: 'Usuario creado', id: result.insertId });
    });
});

// PUT actualizar usuario
app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    mc.query('UPDATE usuario SET ? WHERE IDUsuario = ?', [data, id], (err) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, message: 'Usuario actualizado' });
    });
});

// DELETE eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    mc.query('DELETE FROM usuario WHERE IDUsuario = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, message: 'Usuario eliminado' });
    });
});

// Servidor escucha puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
