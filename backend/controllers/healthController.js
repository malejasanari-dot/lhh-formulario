/**
 * Controlador de Salud (Health Controller)
 * 
 * Este controlador se encarga de responder con el estado actual del servidor.
 * Es útil para verificar que el backend está en línea.
 */

const getHealth = (req, res) => {
  res.json({
    status: "ok",
    message: "Backend funcionando correctamente"
  });
};

module.exports = {
  getHealth
};
