/**
 * Servicio para manejar las llamadas a la API de catálogos.
 * Centraliza las peticiones para mantener el código limpio y reutilizable.
 */

const API_BASE_URL = '/api';

export const catalogService = {
  /**
   * Obtiene la lista de niveles educativos desde el backend.
   */
  getEducationLevels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/education-levels`);
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
  getCities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getCities:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de estados civiles.
   */
  getMaritalStatuses: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/marital-statuses`);
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
  getProfessions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/professions`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getProfessions:', error);
      throw error;
    }
  },
  /**
   * Obtiene la lista de idiomas.
   */
  getLanguages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getLanguages:', error);
      throw error;
    }
  },
  /**
   * Obtiene la lista de tecnologías.
   */
  getTechnologies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/technologies`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getTechnologies:', error);
      throw error;
    }
},

  // Agregar los otros métodos:

  /**
   * Obtiene la lista de niveles laborales.
   */
  getWorkLevels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/work-levels`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getWorkLevels:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de áreas de interés.
   */
  getInterestingAreas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/interesting-areas`);
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
      const response = await fetch(`${API_BASE_URL}/reasons`);
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
      const response = await fetch(`${API_BASE_URL}/package-items`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getPackageItems:', error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de empresas.
   */
  getCompanies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en catalogService.getCompanies:', error);
      throw error;
    }
  },

}
