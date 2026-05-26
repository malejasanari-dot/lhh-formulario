import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight, ChevronLeft, AlertCircle, Briefcase, Sparkles } from 'lucide-react';
import { WorkExperienceCard } from './WorkExperienceCard';
import { WorkExperienceSummary } from './WorkExperienceSummary';
import { cn } from '../../../utils/cn';

// Initial empty experience state
const createEmptyExperience = () => ({
  id: Math.random().toString(36).substring(2, 9),
  empresa: '',
  nivelLaboral: '',
  cargo: '',
  funcionPrincipal: '',
  areasExpertiz: '',
  motivoRetiro: '',
  antiguedad: '',
  ultimoSalario: '',
  fechaRetiro: '',
  paqueteDesvinculacion: []
});

const validateExperience = (exp) => {
  const errors = {};
  if (exp.empresa === '' || exp.empresa == null) errors.empresa = 'La empresa es obligatoria';
  if (!exp.cargo || !exp.cargo.trim()) errors.cargo = 'El cargo es obligatorio';
  if (!exp.nivelLaboral) errors.nivelLaboral = 'El nivel laboral es obligatorio';
  if (!exp.funcionPrincipal || !exp.funcionPrincipal.trim()) errors.funcionPrincipal = 'La función es obligatoria';
  if (!exp.areasExpertiz) errors.areasExpertiz = 'Selecciona un área';
  if (!exp.motivoRetiro) errors.motivoRetiro = 'El motivo de retiro es obligatorio';
  if (!exp.antiguedad) errors.antiguedad = 'La antigüedad es obligatoria';
  if (!exp.ultimoSalario || !exp.ultimoSalario.trim()) errors.ultimoSalario = 'El salario es obligatorio';
  if (!exp.fechaRetiro) errors.fechaRetiro = 'La fecha de retiro es obligatoria';
  if (!exp.paqueteDesvinculacion || exp.paqueteDesvinculacion.length === 0) errors.paqueteDesvinculacion = 'Este campo es obligatorio';
  return errors;
};

export const WorkExperienceSection = ({
  question,
  onNext,
  onPrev,
  isFirst,
  isLast,
  catalogs
}) => {
  console.log('WorkExperienceSection catalogs', catalogs);
  // Start with one empty experience card
  const [experiences, setExperiences] = useState([createEmptyExperience()]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorsList, setErrorsList] = useState({});
  const [globalError, setGlobalError] = useState(null);

  const activeExperience = experiences[activeIndex];

  const handleExperienceChange = (updatedExp) => {
    const newExperiences = [...experiences];
    newExperiences[activeIndex] = updatedExp;
    setExperiences(newExperiences);

    // Clear validation error on type
    if (errorsList[activeIndex]) {
      const currentErrors = { ...errorsList[activeIndex] };
      // Check which field was updated and clear its error
      Object.keys(currentErrors).forEach(field => {
        if (updatedExp[field] && (typeof updatedExp[field] !== 'string' || updatedExp[field].trim() !== '')) {
          delete currentErrors[field];
        }
      });
      setErrorsList({
        ...errorsList,
        [activeIndex]: currentErrors
      });
    }
    setGlobalError(null);
  };

  const handleAddExperience = () => {
    // Validate current active experience before adding a new one
    const activeErrors = validateExperience(activeExperience);

    if (Object.keys(activeErrors).length > 0) {
      setErrorsList({
        ...errorsList,
        [activeIndex]: activeErrors
      });
      setGlobalError('Por favor completa todos los campos de la experiencia actual antes de agregar otra.');
      return;
    }

    // Collapse current, add a new one, expand it
    const newExp = createEmptyExperience();
    setExperiences([...experiences, newExp]);
    setActiveIndex(experiences.length);
    setGlobalError(null);
  };

  const handleRemoveExperience = (idxToRemove) => {
    if (experiences.length === 1) return; // Keep at least one

    const newExperiences = experiences.filter((_, i) => i !== idxToRemove);
    setExperiences(newExperiences);

    // Adjust active index
    if (activeIndex >= newExperiences.length) {
      setActiveIndex(newExperiences.length - 1);
    } else if (activeIndex === idxToRemove) {
      setActiveIndex(Math.max(0, idxToRemove - 1));
    }

    // Clean up errors list
    const newErrors = {};
    Object.keys(errorsList).forEach(key => {
      const numKey = parseInt(key);
      if (numKey < idxToRemove) {
        newErrors[numKey] = errorsList[numKey];
      } else if (numKey > idxToRemove) {
        newErrors[numKey - 1] = errorsList[numKey];
      }
    });
    setErrorsList(newErrors);
    setGlobalError(null);
  };

  const handleExpandExperience = (idx) => {
    // Optional: Validate current active before leaving
    const activeErrors = validateExperience(activeExperience);

    // Store current errors but allow switching for smoother UX,
    // only block if it's completely empty.
    if (!activeExperience.empresa && !activeExperience.cargo) {
      setErrorsList({
        ...errorsList,
        [activeIndex]: activeErrors
      });
      setGlobalError('Completa la información básica (Empresa/Cargo) antes de cambiar.');
      return;
    }

    setActiveIndex(idx);
    setGlobalError(null);
  };

  const handleContinue = () => {
    // Validate all experiences
    let hasErrors = false;
    const newErrorsList = {};

    experiences.forEach((exp, idx) => {
      const expErrors = validateExperience(exp);
      if (Object.keys(expErrors).length > 0) {
        newErrorsList[idx] = expErrors;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrorsList(newErrorsList);

      // Expand the first experience that has errors
      const firstErrorIdx = Object.keys(newErrorsList)[0];
      setActiveIndex(parseInt(firstErrorIdx));

      setGlobalError('Por favor completa todos los campos requeridos en tu historia laboral.');
      return;
    }

    // Success! Proceed to next step
    onNext(experiences);
  };

  return (
    <div className="space-y-8 w-full max-w-5xl">
      {/* Header */}
      <div className="space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-badge-text font-bold text-xs uppercase tracking-[0.2em]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Historia Laboral
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-content-primary leading-[1.1] tracking-tight"
        >
          HISTORIA LABORAL
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-content-secondary text-base md:text-lg font-light"
        >
          Agrega tus experiencias laborales más relevantes.
        </motion.p>
      </div>

      {/* Main Experience Flow */}
      <div className="space-y-6">
        {/* Collapsed Summaries (Timeline) */}
        {experiences.length > 1 && (
          <div className="space-y-3">
            <span className="block text-[10px] font-bold text-text-secondary/70 uppercase tracking-widest pl-1">
              Experiencias Guardadas
            </span>
            <div className="space-y-2 border-l border-border-primary/50 ml-3 pl-4">
              <AnimatePresence mode="popLayout">
                {experiences.map((exp, idx) => {
                  if (idx === activeIndex) return null; // Don't show active here
                  return (
                    <WorkExperienceSummary
                      key={exp.id}
                      experience={exp}
                      index={idx}
                      onExpand={() => handleExpandExperience(idx)}
                      onRemove={() => handleRemoveExperience(idx)}
                      catalogs={catalogs}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Active Expanded Card */}
        <div className="space-y-2">
          {experiences.length > 1 && (
            <span className="block text-[10px] font-bold text-text-secondary/70 uppercase tracking-widest pl-1">
              Experiencia Activa
            </span>
          )}
          <AnimatePresence mode="wait">
            {activeExperience && (
              <WorkExperienceCard
                key={activeExperience.id}
                experience={activeExperience}
                onChange={handleExperienceChange}
                onRemove={() => handleRemoveExperience(activeIndex)}
                errors={errorsList[activeIndex] || {}}
                isOnly={experiences.length === 1}
                catalogs={catalogs}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Add to History Button */}
        <motion.button
          type="button"
          onClick={handleAddExperience}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border-subtle hover:border-border-strong rounded-2xl text-content-secondary hover:text-content-primary font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-surface-hover hover:shadow-[var(--shadow-soft-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          <Plus className="w-4 h-4" />
          Agregar al Historial
        </motion.button>
      </div>

      {/* Global Error Banner */}
      <AnimatePresence>
        {globalError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{globalError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4 pt-4"
      >
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-10 py-5 font-bold rounded-2xl transition-all duration-300 group active:scale-95 bg-gradient-to-r from-lhh-primary-magenta to-lhh-accent-pink text-action-primary-text hover:shadow-[var(--shadow-magenta-glow)] shadow-[var(--shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          {isLast ? 'Finalizar' : 'Continuar'}
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {!isFirst && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-5 bg-surface-card text-content-secondary font-bold rounded-2xl hover:bg-surface-hover hover:text-content-primary hover:border-border-strong transition-all duration-300 active:scale-95 border border-border-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </div>
  );
};
export default WorkExperienceSection;
