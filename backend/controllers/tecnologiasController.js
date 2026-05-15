const pool = require('../db/connection');

const getTecnologias = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM technologies
      ORDER BY name ASC
    `);

        const tecnologias = rows.map((technology) => ({
            label: technology.name,
            value: technology.name
        }));

        res.json(tecnologias);

    } catch (error) {

        console.error('Error obteniendo tecnologías:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo tecnologías'
        });

    }
};

module.exports = {
    getTecnologias
};