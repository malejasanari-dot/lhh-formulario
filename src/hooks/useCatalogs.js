import { useState, useCallback } from 'react';
import { catalogService } from '../services/catalogService';

/**
 * Hook personalizado para gestionar la carga de catálogos dinámicos.
 * Maneja estados de carga, error y datos de forma centralizada.
 */
export const useCatalogs = () => {
  const [catalogs, setCatalogs] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  /**
   * Carga un catálogo específico por su ID.
   * @param {string} catalogId - Identificador del catálogo (ej: 'nivel_educativo', 'ciudad')
   * @param {function} fetchFn - Función del servicio que realiza la petición
   */
  const loadCatalog = useCallback(async (catalogId, fetchFn) => {
    // Si ya está cargando, no hacer nada
    if (loading[catalogId]) return;

    setLoading(prev => ({ ...prev, [catalogId]: true }));
    setErrors(prev => ({ ...prev, [catalogId]: null }));

    try {
      const data = await fetchFn();

      // Formatear los datos si es necesario (label, value)
      const formattedData = data.map(item => ({
        label: item.label || item.name || item,
        value: item.value || item.name || item
      }));

      setCatalogs(prev => ({ ...prev, [catalogId]: formattedData }));
      return formattedData;
    } catch (error) {
      console.error(`Error cargando catálogo ${catalogId}:`, error);
      setErrors(prev => ({ ...prev, [catalogId]: error.message }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [catalogId]: false }));
    }
  }, [loading]);

  return {
    catalogs,
    loading,
    errors,
    loadCatalog,
    // Atajos para catálogos específicos
    fetchEducationLevels: () => loadCatalog('nivel_educativo', catalogService.getEducationLevels),
    fetchCiudades: () => loadCatalog('ciudad', catalogService.getCiudades),
    fetchEstadosCiviles: () => loadCatalog('estado_civil', catalogService.getMaritalStatuses),
    fetchProfesiones: () => loadCatalog('profesiones', catalogService.getProfesiones),
    fetchIdiomas: () => loadCatalog('idiomas', catalogService.getIdiomas),
    fetchTecnologias: () => loadCatalog('tecnologias', catalogService.getTecnologias),
    fetchLevels: () => loadCatalog('levels', catalogService.getLevels),
    fetchInterestingAreas: () => loadCatalog('interestingAreas', catalogService.getInterestingAreas),
    fetchReasons: () => loadCatalog('reasons', catalogService.getReasons),
    fetchPackageItems: () => loadCatalog('packageItems', catalogService.getPackageItems),
    fetchEmpresas: () => loadCatalog('empresas', catalogService.getEmpresas)
  };
};
