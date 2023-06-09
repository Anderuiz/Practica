// Consulta: Total de registros cargados
function getTotalRegistros() {
    const totalQuery = 'SELECT COUNT(*) AS total FROM registros';
  
    return executeQuery(totalQuery)
      .then((results) => {
        const total = results[0].total;
        console.log('Total de registros cargados:', total);
        return total;
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error);
      });
  }
  
  // Consulta: Registros cargados en un rango de fecha
  function getRegistrosPorFecha(startDate, endDate) {
    const dateQuery = `SELECT * FROM registros WHERE fecha BETWEEN '${startDate}' AND '${endDate}'`;
  
    return executeQuery(dateQuery)
      .then((results) => {
        console.log('Registros cargados en el rango de fecha:');
        console.log(results);
        return results;
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error);
      });
  }
  
  // Consulta: Buscar un nombre específico en los registros cargados
  function getRegistrosPorNombre(searchName) {
    const nameQuery = `SELECT * FROM registros WHERE nombre = '${searchName}'`;
  
    return executeQuery(nameQuery)
      .then((results) => {
        console.log('Registros que coinciden con el nombre:', searchName);
        console.log(results);
        return results;
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error);
      });
  }
  
  // Desconexión de la base de datos
  function closeConnection() {
    connection.end((error) => {
      if (error) {
        console.error('Error al cerrar la conexión:', error);
        return;
      }
      console.log('Conexión cerrada correctamente.');
    });
  }
  
  module.exports = {
    getTotalRegistros,
    getRegistrosPorFecha,
    getRegistrosPorNombre,
    closeConnection,
  };