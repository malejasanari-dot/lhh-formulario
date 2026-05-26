const pool = require('../db/connection');

const getCompanies = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name
      FROM wwsilh_uat.companies
      ORDER BY name ASC
    `);

        const companies = rows.map((item) => ({
            label: item.name,
            value: item.id
        }));

        res.json(companies);

    } catch (error) {
        console.error('Error obteniendo empresas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo empresas'
        });
    }
};

module.exports = {
    getCompanies
};
