const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors()); // Permite solicitudes de otros dominios
app.use(bodyParser.json()); // Para parsear datos JSON

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiendaenlinea'  // Asegúrate de poner el nombre correcto de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});



//Endpoint Login
app.post('/api/login', (req, res) => {
    const { usuario, contraseña } = req.body;
  
    if (!usuario || !contraseña) {
      return res.status(400).json({ success: false, message: 'Por favor ingresa usuario y contraseña.' });
    }
  
    // Consulta para verificar si el usuario existe y si la contraseña es correcta
    const query = 'SELECT * FROM usuario WHERE Nombre = ? AND Contraseña = ?';
    db.query(query, [usuario, contraseña], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
      }
  
      // Si el usuario existe y la contraseña es correcta
      const usuarioLogueado = results[0];
      res.status(200).json({
        success: true,
        message: 'Login exitoso.',
        usuario: {
          id: usuarioLogueado.ID_Usuario,
          nombre: usuarioLogueado.Nombre,
          correo: usuarioLogueado.Correo, // Puedes seguir enviando el correo si lo necesitas
        }
      });
    });
  });
  


  // Endpoint para obtener los productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM producto';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener los productos.' });
    }

    res.status(200).json({
      success: true,
      productos: results  // Devuelve todos los productos
    });
  });
});




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
