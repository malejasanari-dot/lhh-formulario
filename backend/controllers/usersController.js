const db = require('../db/connection');

/**
 * Busca un usuario por su dirección de correo electrónico.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
const findByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Validación: verificar si el email fue enviado
        if (!email || email.trim() === '') {
            return res.status(400).json({
                status: 'error',
                message: 'El correo es obligatorio.'
            });
        }

        console.log("=== BUSQUEDA POR EMAIL ===");
        console.log("Correo recibido:", email);

        // Consulta parametrizada para buscar al usuario por email
        const [rows] = await db.query(
            'SELECT id, first_name, last_name, email FROM users WHERE email = ?',
            [email]
        );

        if (rows && rows.length > 0) {
            const user = rows[0];
            const userId = user.id;
            const firstName = user.first_name;
            const lastName = user.last_name;
            const userEmail = user.email;

            console.log("Usuario encontrado:", {
                userId,
                firstName,
                lastName,
                email: userEmail
            });

            return res.status(200).json({
                exists: true,
                userId,
                firstName,
                lastName,
                email: userEmail
            });
        } else {
            console.log("Usuario no encontrado");

            return res.status(200).json({
                exists: false,
                message: 'Usuario no encontrado.'
            });
        }
    } catch (error) {
        console.error('Error al consultar usuario por email:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor al consultar el usuario.'
        });
    }
};

module.exports = {
    findByEmail
};
