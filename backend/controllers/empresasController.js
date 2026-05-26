const pool = require('../db/connection');

const getEmpresas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name
      FROM wwsilh_uat.companies
      ORDER BY name ASC
    `);

        const empresas = rows.map((item) => ({
            label: item.name,
            value: item.id
        }));

        res.json(empresas);

    } catch (error) {
        console.error('Error obteniendo empresas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo empresas'
        });
    }
};

module.exports = {
    getEmpresas
};
