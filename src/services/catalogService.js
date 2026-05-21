/**
 * Servicio para manejar las llamadas a la API de catálogos.
 * Centraliza las peticiones para mantener el código limpio y reutilizable.
 */

const API_BASE_URL = 'https://lhh-formulario.onrender.com/api';

export const catalogService = {
  /**
   * Obtiene la lista de niveles educativos desde el backend.
   */
  getEducationLevels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/niveles-educativos`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getEducationLevels:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de ciudades.
   * (Migrado del fetch directo en FormContainer)
   */
  getCiudades: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getCiudades:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de estados civiles.
   */
  getMaritalStatuses: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/estados-civiles`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getMaritalStatuses:', error);
      throw error;
    }
  },
  /**
   * Obtiene la lista de profesiones.
   */
  getProfesiones: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profesiones`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getProfesiones:', error);
      throw error;
    }
  },
  /**
   * Obtiene la lista de idiomas.
   */
  getIdiomas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/idiomas`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getIdiomas:', error);
      throw error;
    }
  },
  /**
   * Obtiene la lista de tecnologías.
   */
  getTecnologias: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tecnologias`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getTecnologias:', error);
      throw error;
    }
},

  // Agregar los otros métodos:

  /**
   * Obtiene la lista de niveles laborales.
   */
  getLevels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/niveles-laborales`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getLevels:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de áreas de expertiz.
   */
  getInterestingAreas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/areas-expertiz`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getInterestingAreas:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de motivos de retiro.
   */
  getReasons: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/motivos-retiro`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getReasons:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de paquetes de desvinculación.
   */
  getPackageItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/paquetes-desvinculacion`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getPackageItems:', error);
      throw error;
    }
  },

}
