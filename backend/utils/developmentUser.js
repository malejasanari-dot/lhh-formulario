/**
 * EXCLUSIVAMENTE TEMPORAL PARA ENTORNO DE DESARROLLO
 * 
 * Esta utilidad genera un email y password falsos para poder crear
 * el registro en la tabla `users` mientras el flujo real de creación 
 * de usuario (login/registro previo) aún no está integrado.
 * 
 * TODO: ELIMINAR ESTE ARCHIVO Y SU USO cuando el proceso de login
 * se encargue de suministrar el email y el password.
 */

const crypto = require('crypto');

const generateDevUserCredentials = () => {
    const timestamp = Date.now();
    const email = `test_${timestamp}@lhh.local`;
    
    // Generar un hash temporal simulando el encriptado
    // Como el proyecto no tiene bcrypt instalado aún, usaremos SHA-256 nativo de Node
    const rawPassword = 'TemporalPassword123!';
    const passwordHash = crypto.createHash('sha256').update(rawPassword).digest('hex');

    return {
        email,
        password: passwordHash
    };
};

module.exports = {
    generateDevUserCredentials
};
