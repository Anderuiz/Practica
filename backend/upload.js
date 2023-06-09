const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos subidos

let isUploading = false; // Variable para controlar si se está realizando una carga

// Ruta para manejar la carga del archivo
router.post('/cargar-archivo', upload.single('archivo'), (req, res) => {
  // Validar si ya se está realizando una carga
  if (isUploading) {
    return res.status(400).json({ error: 'Ya se está realizando una carga de archivo. Por favor, espere.' });
  }

  // Validar que se haya enviado un archivo
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha enviado ningún archivo.' });
  }

  // Validar que el archivo sea .txt o .csv
  if (req.file.mimetype !== 'text/plain' && req.file.mimetype !== 'text/csv') {
    return res.status(400).json({ error: 'El archivo debe ser de tipo .txt o .csv.' });
  }

  // Establecer la variable de carga en true
  isUploading = true;

  // Aquí puedes procesar el archivo y realizar las operaciones necesarias
  const filePath = req.file.path;

  // Lógica para procesar el archivo y extraer los campos seleccionados
const selectedFields = ['Nombres', 'Apellidos', 'Teléfonos', 'Direcciones'];
const data = [];

const separators = [',', '.', ':', ';', '%']; // Agrega aquí los separadores que deseas permitir

fs.readFile(filePath, 'utf8', (err, fileContent) => {
  if (err) {
    isUploading = false; // Limpiar la variable de carga en caso de error
    return res.status(500).json({ error: 'Error al leer el archivo' });
  }

  let lines = fileContent.split('\n');

  // Detectar el separador utilizado
  let separator;
  lines.some((line) => {
    const matchedSeparator = separators.find((sep) => line.includes(sep));
    if (matchedSeparator) {
      separator = matchedSeparator;
      return true;
    }
  });

  if (!separator) {
    isUploading = false; // Limpiar la variable de carga en caso de error
    return res.status(400).json({ error: 'No se pudo detectar el separador utilizado en el archivo' });
  }

  lines = lines.map((line) => line.split(separator));

  lines.forEach((fields) => {
    const processedRow = {};

    selectedFields.forEach((field, index) => {
      if (fields[index]) {
        processedRow[field] = fields[index].trim();
      }
    });

    data.push(processedRow);
  });

  // Aquí puedes guardar los datos en la base de datos o realizar otras operaciones
  console.log(data);

  // Limpiar la variable de carga al finalizar el procesamiento
  isUploading = false;
  res.json({ message: 'Archivo cargado exitosamente' });
});

  // Simulación de tiempo de procesamiento
  setTimeout(() => {
    // Limpiar la variable de carga al finalizar el procesamiento
    isUploading = false;
    res.json({ message: 'Archivo cargado exitosamente' });
  }, 3000); // Tiempo de espera de 3 segundos como ejemplo
});

module.exports = router;
