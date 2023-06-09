const express = require('express');
const app = express();

// Importar módulos y archivos necesarios
const mysql = require('mysql');
const connection = require('./conexion');
const {
  getTotalRegistros,
  getRegistrosPorFecha,
  getRegistrosPorNombre,
  closeConnection,
} = require('./consulta');
const uploadRoutes = require('./upload');

// Configuración del servidor
app.use(express.json());

// Rutas
app.use('/cargar-archivo', uploadRoutes);

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

// Conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para obtener el total de registros cargados
app.get('/total-registros', (req, res) => {
  getTotalRegistros()
    .then((total) => {
      res.json({ total });
    })
    .catch((error) => {
      console.error('Error al obtener el total de registros:', error);
      res.status(500).json({ error: 'Error al obtener el total de registros' });
    });
});

// Ruta para obtener los registros cargados en un rango de fecha
app.get('/registros-por-fecha', (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  getRegistrosPorFecha(startDate, endDate)
    .then((results) => {
      res.json({ results });
    })
    .catch((error) => {
      console.error('Error al obtener los registros por fecha:', error);
      res.status(500).json({ error: 'Error al obtener los registros por fecha' });
    });
});

// Ruta para buscar un nombre específico en los registros cargados
app.get('/buscar-nombre', (req, res) => {
  const searchName = req.query.nombre;

  getRegistrosPorNombre(searchName)
    .then((results) => {
      res.json({ results });
    })
    .catch((error) => {
      console.error('Error al buscar el nombre en los registros:', error);
      res.status(500).json({ error: 'Error al buscar el nombre en los registros' });
    });
});

// Cerrar la conexión a la base de datos al finalizar la aplicación
process.on('exit', () => {
  closeConnection();
});
