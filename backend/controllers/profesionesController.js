const pool = require('../db/connection');

const getProfesiones = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM professions
      ORDER BY name ASC
    `);

        const profesiones = rows.map((profession) => ({
            id: profession.id,
            name: profession.name,
            label: profession.name,
            value: profession.id
        }));

        res.json(profesiones);

    } catch (error) {

        console.error('Error obteniendo profesiones:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo profesiones'
        });

    }
};

module.exports = {
    getProfesiones
};