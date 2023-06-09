import axios from 'axios';

// Ruta base de la API
const apiUrl = 'http://localhost:3000';

// Función para cargar un archivo al backend
function cargarArchivo(file) {
  const formData = new FormData();
  formData.append('archivo', file);

  return axios.post(`${apiUrl}/cargar-archivo`, formData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error al cargar el archivo:', error);
      throw error;
    });
}

// Función para obtener el total de registros cargados
function getTotalRegistros() {
  return axios.get(`${apiUrl}/total-registros`)
    .then((response) => response.data.total)
    .catch((error) => {
      console.error('Error al obtener el total de registros:', error);
      throw error;
    });
}

// Función para obtener los registros cargados en un rango de fecha
function getRegistrosPorFecha(startDate, endDate) {
  return axios.get(`${apiUrl}/registros-por-fecha?startDate=${startDate}&endDate=${endDate}`)
    .then((response) => response.data.results)
    .catch((error) => {
      console.error('Error al obtener los registros por fecha:', error);
      throw error;
    });
}

// Función para buscar un nombre específico en los registros cargados
function buscarPorNombre(nombre) {
  return axios.get(`${apiUrl}/buscar-nombre?nombre=${nombre}`)
    .then((response) => response.data.results)
    .catch((error) => {
      console.error('Error al buscar el nombre en los registros:', error);
      throw error;
    });
}

// Manejador de evento para la carga de archivos
function handleFileUpload(event) {
  const file = event.target.files[0];

  cargarArchivo(file)
    .then((data) => {
      console.log('Archivo cargado exitosamente:', data);
      // Realizar acciones después de cargar el archivo
    })
    .catch((error) => {
      console.error('Error al cargar el archivo:', error);
    });
}

// Obtener referencia al elemento de carga de archivos en el DOM
const fileInput = document.getElementById('fileInput');

// Agregar el manejador de evento al elemento de carga de archivos
fileInput.addEventListener('change', handleFileUpload);

// Ejemplo de uso de las funciones de consulta
getTotalRegistros()
  .then((total) => {
    console.log('Total de registros:', total);
    // Realizar acciones con el total de registros
  })
  .catch((error) => {
    console.error('Error al obtener el total de registros:', error);
  });

const startDate = '2023-01-01';
const endDate = '2023-12-31';

getRegistrosPorFecha(startDate, endDate)
  .then((results) => {
    console.log('Registros en el rango de fecha:', results);
    // Realizar acciones con los registros por fecha
  })
  .catch((error) => {
    console.error('Error al obtener los registros por fecha:', error);
  });

const searchName = 'John Doe';

buscarPorNombre(searchName)
  .then((results) => {
    console.log('Registros que coinciden con el nombre:', results);
    // Realizar acciones con los registros por nombre
  })
  .catch((error) => {
    console.error('Error al buscar el nombre en los registros:', error);
  });
