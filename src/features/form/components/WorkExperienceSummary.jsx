import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const WorkExperienceSummary = ({
  experience,
  onExpand,
  onRemove,
  index,
  catalogs = {}
}) => {
  const empresaLabel = catalogs?.companies?.find(e => e.value === experience.empresa)?.label || experience.empresa || 'Empresa sin nombre';
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="group relative flex items-center justify-between bg-surface-card hover:bg-surface-hover border border-border-subtle hover:border-border-strong rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[var(--shadow-soft-card)]"
      onClick={onExpand}
    >
      <div className="flex items-center gap-4">
        {/* Timeline connector visual dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-badge-bg flex items-center justify-center text-badge-text border border-badge-border transition-transform duration-300 group-hover:scale-110">
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-[1px]" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-content-primary">
            {empresaLabel}
          </span>
          <span className="text-xs text-content-secondary font-medium">
            {experience.cargo || 'Cargo sin especificar'} • {experience.nivelLaboral || 'Nivel sin especificar'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="p-1.5 hover:bg-surface-hover rounded-lg text-content-secondary hover:text-badge-text transition-colors cursor-pointer"
          title="Editar experiencia"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-1.5 hover:bg-red-500/10 rounded-lg text-content-secondary hover:text-red-500 transition-colors cursor-pointer"
          title="Eliminar experiencia"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
