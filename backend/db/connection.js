/**
 * Configuración de Conexión a MySQL
 * 
 * Este archivo gestiona el pool de conexiones a la base de datos remota.
 * Se utiliza mysql2 con soporte para Promesas (async/await).
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración del Pool de Conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 segundos de timeout para conexiones remotas
});

/**
 * Función para probar la conexión inicial
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('==========================================');
    console.log('✅ Conexión a MySQL (REMOTA) exitosa');
    console.log(`📍 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log('==========================================');
    connection.release();
  } catch (error) {
    console.error('==========================================');
    console.error('❌ ERROR de conexión a MySQL:');
    console.error(`Mensaje: ${error.message}`);
    console.error(`Código: ${error.code}`);
    
    if (error.code === 'ETIMEDOUT') {
      console.error('CONSEJO: Verifica si tu IP está autorizada en el firewall del servidor.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('CONSEJO: Revisa las credenciales (Usuario/Password) en el archivo .env.');
    }
    console.error('==========================================');
  }
};

// Ejecutar prueba de conexión al cargar el módulo
testConnection();

module.exports = pool;
