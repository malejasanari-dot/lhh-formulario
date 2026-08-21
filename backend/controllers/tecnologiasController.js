const pool = require('../db/connection');

const getTecnologias = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM technologies
      ORDER BY name ASC
    `);

        const tecnologias = rows.map((technology) => ({
            id: technology.id,
            name: technology.name,
            label: technology.name,
            value: technology.id
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