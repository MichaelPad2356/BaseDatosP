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

// Endpoint para actualizar el stock del producto
app.put('/api/productos/:productoId', (req, res) => {
  const { productoId } = req.params;  // Obtenemos el ID del producto de la URL
  const { stock } = req.body;         // Obtenemos el nuevo stock desde el cuerpo de la solicitud

  if (!productoId || stock == undefined) {
    return res.status(400).json({ success: false, message: 'Producto ID o stock no válidos.' });
  }

  // Actualizar el stock del producto en la base de datos
  const query = 'UPDATE producto SET Stock = ? WHERE ID_Producto = ?';
  db.query(query, [stock, productoId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el stock:', err);
      return res.status(500).json({ success: false, message: 'Error al actualizar el stock.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
    }

    res.status(200).json({ success: true, message: 'Stock actualizado correctamente.' });
  });
});

// Endpoint para agregar un producto al carrito
app.post('/api/carrito', (req, res) => {
  const { usuarioId, productoId, cantidad } = req.body;

  if (!usuarioId || !productoId || !cantidad) {
    return res.status(400).json({ success: false, message: 'Faltan datos para agregar al carrito.' });
  }

  // Primero verificamos si el usuario ya tiene un carrito activo
  // Primero verificamos si el usuario ya tiene un carrito activo
  db.query('SELECT * FROM carrito WHERE ID_Usuario = ?', [usuarioId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }

    let carritoId;

    if (results.length > 0) {
      // Si el carrito existe, usamos su ID
      carritoId = results[0].ID_Carrito;
      // Agregamos el producto al detalle del carrito
      agregarProductoAlCarrito(carritoId);
    } else {
      // Si no existe, creamos uno nuevo
      db.query('INSERT INTO carrito (ID_Usuario, Fecha_Creacion) VALUES (?, NOW())', [usuarioId], (err, result) => {
        if (err) {
          console.error('Error al crear carrito:', err);
          return res.status(500).json({ success: false, message: 'Error al crear carrito.' });
        }
        carritoId = result.insertId;
        // Ahora que se creó el carrito, agregamos el producto
        agregarProductoAlCarrito(carritoId);
      });
    }

    // Función para agregar el producto al carrito
    function agregarProductoAlCarrito(carritoId) {
      db.query('INSERT INTO detalle_carrito (ID_Carrito, ID_Producto, Cantidad) VALUES (?, ?, ?)', [carritoId, productoId, cantidad], (err, result) => {
        if (err) {
          console.error('Error al agregar producto al carrito:', err);
          return res.status(500).json({ success: false, message: 'Error al agregar producto al carrito.' });
        }
        res.status(200).json({ success: true, message: 'Producto agregado al carrito correctamente.' });
      });
    }
  });
});

// Endpoint para agregar productos al carrito
app.post('/api/carrito/agregar', (req, res) => {
  const { carritoId, productoId, cantidad } = req.body;

  if (!carritoId || !productoId || !cantidad) {
    return res.status(400).json({ success: false, message: 'Faltan datos (carritoId, productoId, cantidad).' });
  }

  // Verificar si el producto ya está en el carrito
  const queryCheck = 'SELECT * FROM detalle_carrito WHERE ID_Carrito = ? AND ID_Producto = ?';
  db.query(queryCheck, [carritoId, productoId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error al verificar el producto.' });
    }

    if (results.length > 0) {
      // Si el producto ya existe, actualizamos la cantidad
      const queryUpdate = 'UPDATE detalle_carrito SET Cantidad = ? WHERE ID_Carrito = ? AND ID_Producto = ?';
      db.query(queryUpdate, [cantidad, carritoId, productoId], (err, updateResults) => {
        if (err) {
          console.error('Error al actualizar el producto:', err);
          return res.status(500).json({ success: false, message: 'Error al actualizar el producto en el carrito.' });
        }

        res.status(200).json({
          success: true,
          message: 'Producto actualizado en el carrito.',
        });
      });
    } else {
      // Si el producto no existe, lo insertamos
      const queryInsert = 'INSERT INTO detalle_carrito (ID_Carrito, ID_Producto, Cantidad) VALUES (?, ?, ?)';
      db.query(queryInsert, [carritoId, productoId, cantidad], (err, insertResults) => {
        if (err) {
          console.error('Error al agregar el producto:', err);
          return res.status(500).json({ success: false, message: 'Error al agregar el producto al carrito.' });
        }

        res.status(200).json({
          success: true,
          message: 'Producto agregado al carrito.',
        });
      });
    }
  });
});

// Endpoint para obtener el contenido del carrito
app.get('/api/carrito/:carritoId', (req, res) => {
  const { carritoId } = req.params;

  const query = `
    SELECT p.ID_Producto, p.Nombre, p.Descripcion, p.Precio, dc.Cantidad
    FROM detalle_carrito dc
    JOIN producto p ON dc.ID_Producto = p.ID_Producto
    WHERE dc.ID_Carrito = ?
  `;

  db.query(query, [carritoId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener el contenido del carrito.' });
    }

    res.status(200).json({
      success: true,
      productos: results,
    });
  });
});


// Vista de stock por categoría
app.get('/api/reportes/stock-categoria', (req, res) => {
  const query = 'SELECT * FROM Vista_Stock_Categoria';  // Consulta SQL
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al obtener datos.' });
    }
    res.status(200).json({ success: true, stock: results });
  });
});

// Ruta para obtener los pedidos completos desde la vista
app.get('/api/pedidos', (req, res) => {
  const query = 'SELECT * FROM vista_pedidos_completa'; // Consulta la vista directamente

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar la vista:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al obtener los pedidos completos.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      pedidos: results // Devuelve los pedidos obtenidos de la vista
    });
  });
});

// Endpoint para obtener productos más vendidos
app.get('/api/productos-mas-vendidos', (req, res) => {
  const query = 'SELECT * FROM productos_mas_vendidos';  // Usando la vista con los productos más vendidos
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos más vendidos', err);
      return res.status(500).send('Error al obtener productos más vendidos');
    }
    res.json(results);  // Devuelve los productos más vendidos como un JSON
  });
});




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


