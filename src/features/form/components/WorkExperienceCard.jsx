import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Trash2, Calendar, DollarSign, Briefcase, Plus } from 'lucide-react';
import { FormDropdown } from './FormDropdown';
import { PackageItemsSelector } from './PackageItemsSelector';
import { cn } from '../../../utils/cn';

// Dropdown options constants
// Static options removed – now using dynamic catalogs via props

// Static options removed – now using dynamic catalogs via props

// Static options removed – now using dynamic catalogs via props

const ANTIGUEDAD_OPTIONS = [
  { label: 'Menos de 1 año', value: 'Menos de 1 año' },
  { label: '1 año', value: '1 año' },
  { label: '2 años', value: '2 años' },
  { label: '3 años', value: '3 años' },
  { label: '4 años', value: '4 años' },
  { label: '5 años', value: '5 años' },
  { label: 'De 6 a 10 años', value: 'De 6 a 10 años' },
  { label: 'Más de 10 años', value: 'Más de 10 años' }
];

// Static options removed – now using dynamic catalogs via props

export const WorkExperienceCard = ({
  experience,
  onChange,
  onRemove,
  errors = {},
  isOnly = true,
  catalogs = {}
}) => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [selectedEconomicSector, setSelectedEconomicSector] = useState(null);

  const closeCompanyModal = () => {
    setIsCompanyModalOpen(false);
    setNewCompanyName('');
    setSelectedEconomicSector(null);
  };

  console.log('WorkExperienceCard catalogs', catalogs);
  const handleFieldChange = (field, val) => {
    onChange({
      ...experience,
      [field]: val
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full bg-surface-card border border-border-subtle rounded-3xl p-6 md:p-8 shadow-[var(--shadow-soft-card)] relative backdrop-blur-sm overflow-visible"
    >
      {/* Decorative top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink opacity-90" />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-badge-bg flex items-center justify-center text-badge-text border border-badge-border">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-content-primary opacity-90">
            {(typeof experience.empresa === 'object' && experience.empresa !== null)
              ? (experience.empresa.empresa || 'Última experiencia')
              : (catalogs?.companies?.find(e => e.value === experience.empresa)?.label || experience.empresa || 'Última experiencia')}
          </span>
        </div>

        {!isOnly && (
          <button
            type="button"
            onClick={onRemove}
            className="text-text-secondary/50 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg cursor-pointer"
            title="Eliminar experiencia"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Empresa */}
        <div className="relative">
          <FormDropdown
            label="Empresa"
            value={experience.empresa}
            onChange={(val) => handleFieldChange('empresa', val)}
            options={catalogs?.companies || []}
            placeholder="Busca y selecciona la empresa..."
            showSearch={true}
            error={errors.empresa}
            onCreateOption={(val) => {
              // Also open modal from the dropdown's "Create" option (implemented previously)
              setNewCompanyName(val);
              setIsCompanyModalOpen(true);
            }}
          />
          <button
            type="button"
            onClick={() => setIsCompanyModalOpen(true)}
            className="absolute top-0 right-0 flex items-center gap-1 text-action-primary hover:bg-surface-hover px-2 py-0.5 rounded-md transition-colors"
            title="Agregar nueva empresa"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Crear</span>
          </button>
        </div>

        {/* Nivel Laboral */}
        <FormDropdown
          label="Nivel Laboral"
          value={experience.nivelLaboral}
          onChange={(val) => handleFieldChange('nivelLaboral', val)}
          options={catalogs.levels || []}
          placeholder="Selecciona tu nivel"
          error={errors.nivelLaboral}
        />

        {/* Cargo */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1">
            Cargo
          </label>
          <input
            type="text"
            value={experience.cargo || ''}
            onChange={(e) => handleFieldChange('cargo', e.target.value)}
            placeholder="Ej: Coordinador de Proyectos, Ingeniero..."
            className={cn(
              "w-full bg-surface-card border rounded-xl px-4 py-3 text-sm text-content-primary placeholder:text-content-secondary/40 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring focus:shadow-[var(--shadow-soft-card)] transition-all duration-300",
              errors.cargo ? "border-red-500/50" : "border-border-subtle"
            )}
          />
          {errors.cargo && (
            <span className="text-[11px] text-red-500 mt-1 block pl-1">{errors.cargo}</span>
          )}
        </div>

        {/* Antigüedad en años */}
        <FormDropdown
          label="Antigüedad en años"
          value={experience.antiguedad}
          onChange={(val) => handleFieldChange('antiguedad', val)}
          options={ANTIGUEDAD_OPTIONS}
          placeholder="¿Cuántos años estuviste?"
          error={errors.antiguedad}
        />

        {/* Función principal en el cargo */}
        <div className="col-span-1 md:col-span-2 space-y-1">
          <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1">
            Función principal en el cargo
          </label>
          <textarea
            value={experience.funcionPrincipal || ''}
            onChange={(e) => handleFieldChange('funcionPrincipal', e.target.value)}
            placeholder="Describe brevemente tus responsabilidades principales y logros..."
            rows={3}
            className={cn(
              "w-full bg-surface-card border rounded-xl px-4 py-3 text-sm text-content-primary placeholder:text-content-secondary/40 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring focus:shadow-[var(--shadow-soft-card)] transition-all duration-300 resize-none",
              errors.funcionPrincipal ? "border-red-500/50" : "border-border-subtle"
            )}
          />
          {errors.funcionPrincipal && (
            <span className="text-[11px] text-red-500 mt-1 block pl-1">{errors.funcionPrincipal}</span>
          )}
        </div>

        {/* Área de expertiz */}
        <div className="col-span-1 md:col-span-2">
          <FormDropdown
            label="Área de expertiz"
            value={experience.areasExpertiz}
            onChange={(val) => handleFieldChange('areasExpertiz', val)}
            options={catalogs.interestingAreas || []}
            placeholder="Selecciona un área de experticia"
            multiselect={false}
            showSearch={true}
            error={errors.areasExpertiz}
          />
        </div>

        {/* Último salario */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1">
            Último salario (Mensual)
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-content-secondary/60 flex items-center pointer-events-none">
              <DollarSign className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={experience.ultimoSalario || ''}
              onChange={(e) => {
                // Formatting input to only digits/currency format
                const rawVal = e.target.value.replace(/[^0-9]/g, '');
                const formatted = rawVal ? Number(rawVal).toLocaleString('es-CO') : '';
                handleFieldChange('ultimoSalario', formatted);
              }}
              placeholder="Ej: 5.000.000"
              className={cn(
                "w-full bg-surface-card border rounded-xl pl-9 pr-4 py-3 text-sm text-content-primary placeholder:text-content-secondary/40 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring focus:shadow-[var(--shadow-soft-card)] transition-all duration-300",
                errors.ultimoSalario ? "border-red-500/50" : "border-border-subtle"
              )}
            />
          </div>
          {errors.ultimoSalario && (
            <span className="text-[11px] text-red-500 mt-1 block pl-1">{errors.ultimoSalario}</span>
          )}
        </div>

        {/* Rango Salarial */}
        <FormDropdown
          label="Rango Salarial"
          value={experience.salarial_range_id}
          onChange={(val) => handleFieldChange('salarial_range_id', val)}
          options={catalogs.salarial_ranges || []}
          placeholder="Selecciona el rango salarial"
          error={errors.salarial_range_id}
        />

        {/* Fecha de retiro */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1">
            Fecha de retiro
          </label>
          <div className="relative">
            <input
              type="date"
              value={experience.fechaRetiro || ''}
              onChange={(e) => handleFieldChange('fechaRetiro', e.target.value)}
              className={cn(
                "w-full bg-surface-card border rounded-xl px-4 py-2.5 text-sm text-content-primary placeholder:text-content-secondary/40 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring focus:shadow-[var(--shadow-soft-card)] transition-all duration-300 color-scheme-dark",
                errors.fechaRetiro ? "border-red-500/50" : "border-border-subtle"
              )}
            />
          </div>
          {errors.fechaRetiro && (
            <span className="text-[11px] text-red-500 mt-1 block pl-1">{errors.fechaRetiro}</span>
          )}
        </div>

        {/* Motivo de retiro */}
        <FormDropdown
          label="Motivo de retiro"
          value={experience.motivoRetiro}
          onChange={(val) => handleFieldChange('motivoRetiro', val)}
          options={catalogs.reasons || []}
          placeholder="Selecciona el motivo"
          error={errors.motivoRetiro}
        />

        {/* Paquete de desvinculación */}
        <div className="col-span-1 md:col-span-2">
          <PackageItemsSelector
            value={experience.paqueteDesvinculacion}
            onChange={(val) => handleFieldChange('paqueteDesvinculacion', val)}
            options={catalogs.packageItems || []}
            error={errors.paqueteDesvinculacion}
          />
        </div>
      </div>

      {/* Modal Crear Empresa */}
      <AnimatePresence>
        {isCompanyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="company-modal-card border p-6 rounded-2xl w-full max-w-sm shadow-[var(--shadow-premium)] relative overflow-visible"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lhh-primary-purple to-lhh-accent-pink" />
              <h3 className="text-lg font-bold text-content-primary mb-5 mt-2">Agregar Nueva Empresa</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1 mb-1.5">
                    Nombre de la empresa
                  </label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="Ej. Microsoft"
                    className="w-full bg-surface-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-content-primary focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring"
                    autoFocus
                  />
                </div>
                
                <div className="relative">
                  <FormDropdown
                    label="Sector económico"
                    value={selectedEconomicSector}
                    onChange={(val) => setSelectedEconomicSector(val)}
                    options={catalogs?.economicSectors || []}
                    placeholder="Selecciona el sector..."
                    showSearch={true}
                  />
                </div>

                <div className="flex gap-3 justify-end mt-8">
                  <button
                    type="button"
                    onClick={closeCompanyModal}
                    className="px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const payload = {
                        empresa: newCompanyName.trim(),
                        sector: Number(selectedEconomicSector)
                      };
                      handleFieldChange('empresa', payload);
                      closeCompanyModal();
                    }}
                    disabled={!newCompanyName.trim() || !selectedEconomicSector}
                    className="px-4 py-2 text-sm font-medium bg-action-primary text-white rounded-xl hover:bg-action-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
