import React from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { FormDropdown } from './FormDropdown';
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
            {experience.empresa || 'Última experiencia'}
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
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest pl-1">
            Empresa
          </label>
          <input
            type="text"
            value={experience.empresa || ''}
            onChange={(e) => handleFieldChange('empresa', e.target.value)}
            placeholder="Ej: Bancolombia, Google..."
            className={cn(
              "w-full bg-surface-card border rounded-xl px-4 py-3 text-sm text-content-primary placeholder:text-content-secondary/40 focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-focus-ring focus:shadow-[var(--shadow-soft-card)] transition-all duration-300",
              errors.empresa ? "border-red-500/50" : "border-border-subtle"
            )}
          />
          {errors.empresa && (
            <span className="text-[11px] text-red-500 mt-1 block pl-1">{errors.empresa}</span>
          )}
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

        {/* Áreas de expertiz */}
        <div className="col-span-1 md:col-span-2">
          <FormDropdown
            label="Áreas de expertiz"
            value={experience.areasExpertiz}
            onChange={(val) => handleFieldChange('areasExpertiz', val)}
            options={catalogs.interestingAreas || []}
            placeholder="Selecciona una o más áreas de experticia"
            multiselect={true}
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
        <FormDropdown
          label="Paquete de desvinculación"
          value={experience.paqueteDesvinculacion}
          onChange={(val) => handleFieldChange('paqueteDesvinculacion', val)}
          options={catalogs.packageItems || []}
          placeholder="¿Recibiste paquete de salida?"
          error={errors.paqueteDesvinculacion}
        />
      </div>
    </motion.div>
  );
};
