// app.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// GET todas las locaciones sin las imágenes
app.get('/locaciones', (req, res) => {
    // Seleccionamos los campos incluyendo Banos
    mc.query('SELECT IDLocacion, Area, Habitaciones, Ubicacion, Banos, Descripcion, PrecioMensual, IDAdmin, TipoLocacion, Puntaje FROM locacion', (err, results) => {
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
app.post('/locaciones', upload.array('imagenes'), (req, res) => {
    try {
        // Extraer datos del body
        const {
            Area,
            Habitaciones,
            Ubicacion,
            Descripcion,
            PrecioMensual,
            IDAdmin,
            TipoLocacion,
            Banos,
            ReglasCasa,           // <-- nuevo campo
            ServiciosIncluidos    // <-- nuevo campo
        } = req.body;

        // req.files es un array con las imágenes en memoria
        const imagenBuffer = req.files && req.files.length > 0 ? req.files[0].buffer : null;

        if (!imagenBuffer) {
            return res.status(400).json({ error: true, message: 'Se requiere al menos una imagen' });
        }

        const nuevaLocacion = {
            Area,
            Habitaciones,
            Imagen: imagenBuffer,
            Ubicacion,
            Descripcion,
            PrecioMensual,
            IDAdmin,
            TipoLocacion,
            Banos,
            ReglasCasa,           // <-- nuevo campo
            ServiciosIncluidos    // <-- nuevo campo
        };

        mc.query('INSERT INTO locacion SET ?', nuevaLocacion, (err, result) => {
            if (err) return res.status(500).json({ error: true, message: err });
            res.status(201).json({ error: false, message: 'Locación creada', id: result.insertId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Error interno del servidor' });
    }
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
    mc.query('DELETE FROM locacion WHERE IDLocacion = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: true, message: err });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: 'Locación no encontrada' });
        }
        res.json({ error: false, message: 'Locación eliminada' });
    });
});

// Ruta para obtener imagen por ID de locación
app.get('/locaciones/:id/imagen', (req, res) => {
    const id = req.params.id;

    mc.query('SELECT Imagen FROM locacion WHERE IDLocacion = ?', [id], (err, results) => {
        if (err || results.length === 0 || !results[0].Imagen) {
            return res.status(404).send('Imagen no encontrada');
        }

        res.setHeader('Content-Type', 'image/jpeg'); // Ajusta si usas otro formato
        res.send(results[0].Imagen);
    });
});
app.post('/locaciones/:id/calificar', (req, res) => {
    const id = req.params.id;
    const { Puntaje } = req.body; // nota que en frontend envías {Puntaje: valor}

    if (!Puntaje || isNaN(Puntaje)) {
        return res.status(400).json({ error: 'Puntaje inválido' });
    }

    // Primero obtener la locación actual y sus valores de Puntaje y TotalVotos
    mc.query('SELECT Puntaje, TotalVotos FROM locacion WHERE IDLocacion = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener locación para calificar:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Locación no encontrada' });
        }

        const locacion = results[0];
        const totalVotos = locacion.TotalVotos || 0;
        const puntajeActual = locacion.Puntaje || 0;

        // Calcular nuevo promedio
        const nuevoTotalVotos = totalVotos + 1;
        const nuevoPromedio = (puntajeActual * totalVotos + Puntaje) / nuevoTotalVotos;

        // Actualizar la base de datos con el nuevo puntaje y total de votos
        mc.query(
            'UPDATE locacion SET Puntaje = ?, TotalVotos = ? WHERE IDLocacion = ?',
            [nuevoPromedio, nuevoTotalVotos, id],
            (err2) => {
                if (err2) {
                    console.error('Error al actualizar la calificación:', err2);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }

                // Responder con el nuevo promedio y total de votos
                res.json({
                    data: {
                        Puntaje: nuevoPromedio,
                        TotalVotos: nuevoTotalVotos
                    }
                });
            }
        );
    });
});
app.post('/locaciones/:id/calificar', (req, res) => {
    const id = req.params.id;
    const { Puntaje } = req.body; // nota que en frontend envías {Puntaje: valor}

    if (!Puntaje || isNaN(Puntaje)) {
        return res.status(400).json({ error: 'Puntaje inválido' });
    }

    // Primero obtener la locación actual y sus valores de Puntaje y TotalVotos
    mc.query('SELECT Puntaje, TotalVotos FROM locacion WHERE IDLocacion = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener locación para calificar:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Locación no encontrada' });
        }

        const locacion = results[0];
        const totalVotos = locacion.TotalVotos || 0;
        const puntajeActual = locacion.Puntaje || 0;

        // Calcular nuevo promedio
        const nuevoTotalVotos = totalVotos + 1;
        const nuevoPromedio = (puntajeActual * totalVotos + Puntaje) / nuevoTotalVotos;

        // Actualizar la base de datos con el nuevo puntaje y total de votos
        mc.query(
            'UPDATE locacion SET Puntaje = ?, TotalVotos = ? WHERE IDLocacion = ?',
            [nuevoPromedio, nuevoTotalVotos, id],
            (err2) => {
                if (err2) {
                    console.error('Error al actualizar la calificación:', err2);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }

                // Responder con el nuevo promedio y total de votos
                res.json({
                    data: {
                        Puntaje: nuevoPromedio,
                        TotalVotos: nuevoTotalVotos
                    }
                });
            }
        );
    });
});
4

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

// POST login usuario
app.post('/login', (req, res) => {
    const { Correo, Contrasena } = req.body;

    if (!Correo || !Contrasena) {
        return res.status(400).json({ error: true, message: 'Faltan Correo o Contrasena' });
    }

    mc.query(
        'SELECT * FROM usuario WHERE Correo = ? AND Contrasena = ?',
        [Correo, Contrasena],
        (err, results) => {
            if (err) {
                console.error('Error en consulta login:', err);
                return res.status(500).json({ error: true, message: 'Error interno del servidor' });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
            }
            const usuario = { ...results[0] };
            delete usuario.Contrasena;
            res.json({ error: false, data: usuario });
        }
    );
});

// --------- RUTAS VISITAS ---------

// POST crear visita
app.post('/visitas', (req, res) => {
    const nuevaVisita = {
        FechaVisita: req.body.FechaVisita,
        HoraVisita: req.body.HoraVisita,
        Nombre: req.body.Nombre,
        ApellidoMaterno: req.body.ApellidoMaterno,
        ApellidoPaterno: req.body.ApellidoPaterno,
        Correo: req.body.Correo
    };
    mc.query('INSERT INTO visita SET ?', nuevaVisita, (err, result) => {
        if (err) {
            console.log('Error al guardar visita:', err); // <-- Aquí el log
            return res.status(500).json({ error: true, message: err });
        }
        res.status(201).json({ error: false, message: 'Visita creada', id: result.insertId });
    });
});

// --------- RUTAS REPORTES ---------

// GET todos los reportes
app.get('/reportes', (req, res) => {
    mc.query('SELECT * FROM reporte', (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err });
        res.json({ error: false, data: results });
    });
});

// Servidor escucha puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
