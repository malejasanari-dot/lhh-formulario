const pool = require('../db/connection');

/**
 * Controlador para obtener los estados civiles desde la base de datos.
 */
const getMaritalStatuses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, name
      FROM marital_statuses
      ORDER BY name ASC
    `);

    // Si no hay datos, devolvemos una lista base por defecto para evitar que el front quede vacío
    // aunque la idea es que existan en la DB.
    const statuses = rows.length > 0 
      ? rows.map((status) => ({
          label: status.name,
          value: status.name
        }))
      : [
          { label: 'Soltero(a)', value: 'soltero' },
          { label: 'Casado(a)', value: 'casado' },
          { label: 'Unión Libre', value: 'union_libre' },
          { label: 'Divorciado(a)', value: 'divorciado' },
          { label: 'Viudo(a)', value: 'viudo' }
        ];

    res.json(statuses);
  } catch (error) {
    console.error('Error obteniendo estados civiles:', error);
    
    // Fallback en caso de error de DB (ej. tabla no existe aún) para no romper el flujo
    res.json([
      { label: 'Soltero(a)', value: 'soltero' },
      { label: 'Casado(a)', value: 'casado' },
      { label: 'Unión Libre', value: 'union_libre' },
      { label: 'Divorciado(a)', value: 'divorciado' },
      { label: 'Viudo(a)', value: 'viudo' }
    ]);
  }
};

module.exports = {
  getMaritalStatuses
};
