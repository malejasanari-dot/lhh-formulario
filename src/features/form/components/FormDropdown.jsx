import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const FormDropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Selecciona una opción',
  error,
  multiselect = false,
  showSearch = false
}) => {
  console.log('FormDropdown options', options);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const shouldShowSearch = showSearch || options.length > 6;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    if (multiselect) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(val => val !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getSelectedLabel = () => {
    if (multiselect) {
      if (!Array.isArray(value) || value.length === 0) return null;
      return value.map(val => {
        const found = options.find(opt => (opt.value || opt) === val);
        return found ? (found.label || found) : val;
      });
    } else {
      if (!value) return null;
      const found = options.find(opt => (opt.value || opt) === value);
      return found ? (found.label || found) : value;
    }
  };

  const filteredOptions = options.filter(option => {
    const optLabel = option.label || option;
    return String(optLabel).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedLabels = getSelectedLabel();

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      {label && (
        <span className="block text-[11px] font-bold text-content-secondary uppercase tracking-widest mb-1.5 pl-1">
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-surface-card hover:bg-surface-hover border border-border-subtle rounded-xl px-4 py-3 text-sm flex items-center justify-between transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer",
          isOpen && "border-border-strong ring-2 ring-focus-ring shadow-[var(--shadow-soft-card)]",
          error && "border-red-500/50"
        )}
      >
        <div className="flex flex-wrap gap-1.5 items-center mr-2 max-w-[85%] overflow-hidden">
          {multiselect ? (
            selectedLabels && selectedLabels.length > 0 ? (
              selectedLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-badge-bg text-badge-text text-xs font-semibold px-2 py-0.5 rounded-md border border-badge-border"
                >
                  {lbl}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      const valToRemove = options.find(o => (o.label || o) === lbl)?.value || lbl;
                      handleSelect(valToRemove);
                    }}
                    className="hover:bg-surface-hover rounded p-0.5 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </span>
                </span>
              ))
            ) : (
              <span className="text-content-secondary/60 font-normal">{placeholder}</span>
            )
          ) : (
            selectedLabels ? (
              <span className="text-content-primary font-medium">{selectedLabels}</span>
            ) : (
              <span className="text-content-secondary/60 font-normal">{placeholder}</span>
            )
          )}
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-content-secondary transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-180 text-action-primary"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1.5 bg-surface-dropdown border border-border-subtle rounded-xl shadow-[var(--shadow-premium)] overflow-hidden max-h-60 flex flex-col"
          >
            {shouldShowSearch && (
              <div className="p-2 border-b border-border-subtle flex items-center gap-2 bg-surface-card">
                <Search className="w-3.5 h-3.5 text-content-secondary" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-0 p-1 text-sm focus:outline-none text-content-primary placeholder:text-content-secondary/40"
                />
              </div>
            )}

            <div className="overflow-y-auto flex-1 py-1 max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-xs text-content-secondary text-center">
                  No hay opciones
                </div>
              ) : (
                filteredOptions.map((option, idx) => {
                  const optVal = option.value !== undefined ? option.value : option;
                  const optLabel = option.label || option;
                  const isSelected = multiselect
                    ? (Array.isArray(value) && value.includes(optVal))
                    : value === optVal;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(optVal)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between hover:bg-surface-hover hover:shadow-[inset_3px_0_0_var(--state-active-border)] cursor-pointer",
                        isSelected ? "bg-state-active-bg text-state-active-text font-bold" : "text-content-primary font-medium"
                      )}
                    >
                      <span className="truncate mr-2">{optLabel}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <span className="text-[11px] text-red-500 mt-1 block pl-1">{error}</span>}
    </div>
  );
};
