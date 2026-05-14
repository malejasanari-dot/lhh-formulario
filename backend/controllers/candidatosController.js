/**
 * Controlador de candidatos
 * 
 * Recibe el formulario completo del frontend.
 * Por ahora NO guarda en MySQL.
 * Solo valida y muestra datos en consola.
 */

const createCandidato = async (req, res) => {
    try {

        const data = req.body;

        // Validación básica
        if (!data.personal) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan datos personales'
            });
        }

        console.log('=================================');
        console.log('📩 FORMULARIO RECIBIDO');
        console.log(JSON.stringify(data, null, 2));
        console.log('=================================');

        res.status(200).json({
            status: 'success',
            message: 'Formulario recibido correctamente'
        });

    } catch (error) {

        console.error('Error en createCandidato:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error procesando formulario'
        });

    }
};

module.exports = {
    createCandidato
};