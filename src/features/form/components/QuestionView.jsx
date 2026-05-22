import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, AlertCircle, Plus, X, RefreshCw, Loader2, Upload, Camera, Search } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { DatePicker } from '../../../components/ui/DatePicker';
import { InternationalPhoneField } from '../../../components/ui/InternationalPhoneField';

const QuestionView = ({ question, onNext, onPrev, isFirst, isLast, isLoading, isError, onRetry }) => {
  const [value, setValue] = useState(question.type === 'multiselect' ? [] : '');
  const [levels, setLevels] = useState({});
  const [error, setError] = useState(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSearchTerm, setDropdownSearchTerm] = useState('');
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const isCompact = question.variant === 'compact';
  const maxVisible = isCompact ? 9 : 6;
  const isDropdown = question.variant === 'dropdown' || (question.options?.length > 6);
  const shouldShowDropdownSearch = (question.options?.length || 0) > 6;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset value when question changes
  useEffect(() => {
    setValue(question.type === 'multiselect' ? [] : '');
    setLevels({});
    setError(null);
    setShowAllOptions(false);
    setDropdownOpen(false);
    setDropdownSearchTerm('');
  }, [question.id, question.type]);

  useEffect(() => {
    if (!dropdownOpen) {
      setDropdownSearchTerm('');
    }
  }, [dropdownOpen]);

  const handleNext = () => {
    if (question.required) {
      if (question.type === 'multiselect' && (!value || value.length === 0)) {
        setError('Por favor selecciona al menos una opción');
        return;
      }
      if (question.type !== 'multiselect' && (!value || !value.toString().trim())) {
        setError('Este campo es obligatorio');
        return;
      }
    }
    
    let finalValue = value;
    if (question.requiresLevel && Array.isArray(value) && value.length > 0) {
      finalValue = value.map(v => ({
        language: v,
        level: levels[v] || 'Básico'
      }));
    }
    onNext(finalValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (question.type === 'select' || question.type === 'multiselect') {
        if (isValueValid) handleNext();
      } else {
        handleNext();
      }
    }
  };

  const toggleOption = (optionValue) => {
    setValue((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      if (current.includes(optionValue)) {
        return current.filter((v) => v !== optionValue);
      } else {
        return [...current, optionValue];
      }
    });
    setError(null);
  };

  const isValueValid = question.type === 'multiselect'
    ? (!question.required || (Array.isArray(value) && value.length > 0))
    : (!question.required || (value && value.toString().trim().length > 0));

  const visibleOptions = showAllOptions ? question.options : question.options?.slice(0, maxVisible);
  const hasMoreOptions = question.options?.length > maxVisible;
  const filteredDropdownOptions = shouldShowDropdownSearch
    ? question.options?.filter((option) => {
      const optionLabel = option.label || option;
      return String(optionLabel).toLowerCase().includes(dropdownSearchTerm.toLowerCase());
    })
    : question.options;

  return (
    <div className="space-y-12 w-full">
      <div className="space-y-4">
        <motion.span
          key={`label-${question.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-badge-text font-bold text-xs uppercase tracking-[0.2em]"
        >
          {question.required ? <span className="text-red-500">*</span> : null}
          {question.id.replace('_', ' ').toUpperCase()}
        </motion.span>

        <motion.h2
          key={`title-${question.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-content-primary leading-[1.1] tracking-tight"
        >
          {question.question}
        </motion.h2>

        {question.description && (
          <motion.p
            key={`desc-${question.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary text-lg md:text-xl font-light"
          >
            {question.description}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        {(question.type === 'select' || question.type === 'multiselect') ? (
          <div className="space-y-4">
            {question.type === 'multiselect' && Array.isArray(value) && value.length > 0 && (
              <div className={cn("flex flex-wrap mb-6", question.requiresLevel ? "gap-4" : "gap-2")}>
                <AnimatePresence>
                  {value.map((v) => {
                    const opt = question.options?.find(o => (o.value || o) === v);
                    
                    if (question.requiresLevel) {
                      return (
                        <motion.div
                          key={v}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex flex-col gap-3 p-4 bg-surface-card rounded-2xl border-2 border-border-subtle shadow-[var(--shadow-soft-card)] min-w-[200px]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-base font-bold text-text-primary">{opt?.label || opt}</span>
                            <button onClick={() => {
                              toggleOption(v);
                              setLevels(prev => {
                                const newLevels = {...prev};
                                delete newLevels[v];
                                return newLevels;
                              });
                            }} className="text-text-secondary hover:text-red-500 transition-colors bg-bg-primary p-1 rounded-full shadow-sm">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 bg-surface-card rounded-xl p-2 border border-border-subtle shadow-inner shadow-[var(--shadow-soft-card)]">
                             <span className="text-[10px] font-bold text-content-secondary uppercase tracking-widest pl-2">Nivel:</span>
                             <div className="relative flex-1">
                               <select
                                 value={levels[v] || 'Básico'}
                                 onChange={(e) => setLevels(prev => ({ ...prev, [v]: e.target.value }))}
                                 className="theme-select w-full rounded-lg bg-surface-dropdown px-2 py-1 text-sm font-medium text-content-primary border border-transparent hover:border-border-strong focus:outline-none focus:border-state-active-border focus:ring-2 focus:ring-focus-ring cursor-pointer appearance-none pr-7 transition-all duration-300"
                               >
                                  <option className="theme-select-option" value="Básico">Básico</option>
                                  <option className="theme-select-option" value="Intermedio">Intermedio</option>
                                  <option className="theme-select-option" value="Alto">Alto</option>
                                  <option className="theme-select-option" value="Avanzado">Avanzado</option>
                               </select>
                               <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-content-secondary">
                                 <ChevronRight className="w-4 h-4 rotate-90" />
                               </div>
                             </div>
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.span
                        key={v}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-badge-bg text-badge-text border border-badge-border rounded-full text-sm font-medium"
                      >
                        {opt?.label || opt}
                        <button onClick={() => toggleOption(v)}>
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {isDropdown ? (
              <div className="relative w-full md:w-2/3 group" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    "w-full bg-transparent border-b-2 py-6 flex items-center justify-between text-2xl md:text-4xl text-left focus:outline-none transition-colors duration-500 font-light cursor-pointer",
                    error ? "border-red-500" : "border-border-primary",
                    (!value || value.length === 0) ? "text-text-primary/40" : "text-text-primary"
                  )}
                >
                  <span className="truncate pr-4">
                    {isLoading ? 'Cargando opciones...' : isError ? 'Error al cargar opciones' :
                     question.type === 'multiselect' 
                       ? (value.length > 0 ? 'Seleccionar más opciones...' : 'Selecciona una opción...')
                       : (value ? (question.options?.find(o => (o.value || o) === value)?.label || value) : 'Selecciona una opción...')}
                  </span>
                  <div className="pointer-events-none text-content-secondary transition-transform duration-300 group-focus-within:text-action-primary flex-shrink-0">
                    <ChevronRight className={cn("w-8 h-8 transition-transform duration-300", dropdownOpen ? "-rotate-90" : "rotate-90")} />
                  </div>
                </button>
                <div className={cn(
                  "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out",
                  error ? "bg-red-500 w-full" : "bg-action-primary w-0 group-focus-within:w-full"
                )} />

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-surface-dropdown border-2 border-border-subtle rounded-3xl shadow-[var(--shadow-premium)] max-h-[300px] overflow-hidden flex flex-col"
                    >
                      {isLoading ? (
                        <div className="p-6 text-text-secondary animate-pulse font-medium">Cargando opciones...</div>
                      ) : isError ? (
                        <div className="p-6 text-red-500 flex items-center gap-3 font-medium">
                           <AlertCircle className="w-5 h-5"/> Error al cargar opciones
                        </div>
                      ) : !question.options || question.options.length === 0 ? (
                        <div className="p-6 text-text-secondary font-medium">No hay opciones disponibles</div>
                      ) : (
                        <>
                          {shouldShowDropdownSearch && (
                            <div className="p-4 border-b border-border-subtle bg-surface-card flex items-center gap-3">
                              <Search className="w-5 h-5 text-content-secondary flex-shrink-0" />
                              <input
                                autoFocus
                                type="text"
                                value={dropdownSearchTerm}
                                onChange={(e) => setDropdownSearchTerm(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full bg-transparent border-0 text-lg text-content-primary placeholder:text-content-secondary/40 focus:outline-none"
                              />
                            </div>
                          )}

                          <div className="overflow-y-auto overflow-x-hidden flex-1">
                            {filteredDropdownOptions.length === 0 ? (
                              <div className="p-6 text-text-secondary font-medium">No hay opciones disponibles</div>
                            ) : (
                              filteredDropdownOptions.map((option) => {
                                const optValue = option.value || option;
                                const optLabel = option.label || option;
                                const isSelected = question.type === 'multiselect' 
                                   ? (Array.isArray(value) && value.includes(optValue))
                                   : value === optValue;

                                return (
                                  <button
                                    key={optValue}
                                    type="button"
                                    onClick={() => {
                                      if (question.type === 'multiselect') {
                                        toggleOption(optValue);
                                      } else {
                                        setValue(optValue);
                                        setError(null);
                                        setDropdownOpen(false);
                                        setTimeout(() => onNext(optValue), 300);
                                      }
                                    }}
                                    className={cn(
                                      "w-full text-left px-6 py-4 transition-colors flex items-center justify-between border-b border-border-primary/30 last:border-0",
                                      isSelected ? "bg-state-active-bg text-state-active-text font-bold" : "text-content-primary hover:bg-surface-hover font-medium"
                                    )}
                                  >
                                    <span className="text-lg truncate pr-4">{optLabel}</span>
                                    {isSelected ? (
                                      <Check className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                      question.type === 'multiselect' && <Plus className="w-5 h-5 opacity-0 hover:opacity-100 text-text-secondary flex-shrink-0 transition-opacity" />
                                    )}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <div className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                  isCompact && "lg:grid-cols-3 gap-3"
                )}>
                  {isLoading ? (
                    // Skeleton loading state
                    [...Array(6)].map((_, i) => (
                      <div
                        key={`skeleton-${i}`}
                        className={cn(
                          "animate-pulse bg-text-primary/5 border-2 border-border-primary/50 rounded-2xl",
                          isCompact ? "h-16" : "h-20"
                        )}
                      />
                    ))
                  ) : isError ? (
                    // Error state
                    <div className="col-span-full py-12 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-red-500/20 rounded-3xl bg-red-500/5">
                      <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-text-primary">Error al cargar opciones</h4>
                        <p className="text-text-secondary">No pudimos obtener los datos en este momento.</p>
                      </div>
                      <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-lhh-primary-magenta to-lhh-accent-pink text-action-primary-text rounded-xl hover:shadow-[var(--shadow-magenta-glow)] transition-all font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reintentar
                      </button>
                    </div>
                  ) : !question.options || question.options.length === 0 ? (
                    // Empty state
                    <div className="col-span-full py-12 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-border-primary rounded-3xl bg-text-primary/5">
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-text-secondary">No hay opciones disponibles</h4>
                        <p className="text-text-secondary/60">Vuelve a intentarlo más tarde.</p>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {visibleOptions?.map((option, idx) => {
                        const optionValue = option.value || option;
                        const optionLabel = option.label || option;
                        const isSelected = question.type === 'multiselect'
                          ? (Array.isArray(value) && value.includes(optionValue))
                          : value === optionValue;

                        return (
                          <motion.button
                            layout
                            key={optionValue}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => {
                              if (question.type === 'multiselect') {
                                toggleOption(optionValue);
                              } else {
                                setValue(optionValue);
                                setError(null);
                                setTimeout(onNext, 300);
                              }
                            }}
                            className={cn(
                              "flex items-center justify-between border-2 transition-all duration-300 text-left group/btn",
                              isCompact ? "p-4 rounded-xl" : "p-6 rounded-2xl",
                              isSelected
                                ? "bg-state-active-bg border-state-active-border text-state-active-text shadow-[var(--shadow-magenta-glow)] scale-[1.02]"
                                : "bg-surface-card border-border-subtle text-content-secondary hover:bg-surface-hover hover:border-border-strong hover:shadow-[var(--shadow-soft-card)]"
                            )}
                          >
                            <div className={cn("flex items-center", isCompact ? "gap-3" : "gap-4")}>
                              <span className={cn("font-medium", isCompact ? "text-base" : "text-lg")}>{optionLabel}</span>
                            </div>
                            {isSelected ? (
                              <Check className={cn("transition-transform", isCompact ? "w-4 h-4" : "w-5 h-5")} />
                            ) : (
                              question.type === 'multiselect' && (
                                <Plus className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                              )
                            )}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  )}
                </div>

                {hasMoreOptions && !showAllOptions && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllOptions(true)}
                    className="w-full py-4 text-text-secondary hover:text-text-primary font-bold text-sm uppercase tracking-widest border-2 border-dashed border-border-primary rounded-2xl transition-all hover:bg-text-primary/5"
                  >
                    Ver más opciones
                  </motion.button>
                )}
              </>
            )}
          </div>
        ) : question.type === 'upload' ? (
          <div className="space-y-4">
            <div
              className={cn(
                "w-full h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center space-y-4 transition-all duration-500 cursor-pointer group/upload",
                value ? "border-state-active-border bg-state-active-bg" : "border-border-subtle hover:border-border-strong hover:bg-surface-hover"
              )}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setValue(e.target.files[0].name);
                    setError(null);
                  }
                }}
              />
              <div className={cn(
                "p-5 rounded-2xl transition-all duration-500",
                value ? "bg-action-primary text-action-primary-text scale-110" : "bg-surface-card text-content-secondary group-hover/upload:scale-110"
              )}>
                {value ? <Camera className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary">
                  {value ? 'Foto seleccionada' : 'Selecciona una foto'}
                </p>
                <p className="text-sm text-text-secondary">
                  {value ? value : 'o arrastra el archivo aquí'}
                </p>
              </div>
              {value && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue('');
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ) : question.type === 'date' ? (
          <>
            <input
              type="date"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              className={cn(
                "w-full bg-transparent border-b-2 py-6 text-2xl md:text-4xl text-text-primary focus:outline-none transition-colors duration-500 font-light",
                error ? "border-red-500" : "border-border-subtle focus:border-border-strong"
              )}
            />
            <div className={cn(
              "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out",
              error ? "bg-red-500 w-full" : "bg-action-primary w-0 group-focus-within:w-full"
            )} />
          </>
        ) : question.type === 'tel' ? (
          <div className="w-full md:w-2/3">
            <InternationalPhoneField
              value={value}
              onChange={(phoneValue) => {
                setValue(phoneValue);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder || 'Escribe tu respuesta aqu�...'}
              hasError={Boolean(error)}
              autoFocus
              defaultCountry="co"
            />
          </div>
        ) : (
          <>
            <input
              autoFocus
              ref={inputRef}
              type={question.type}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder={question.placeholder || 'Escribe tu respuesta aquí...'}
              className={cn(
                "w-full bg-transparent border-b-2 py-6 text-2xl md:text-4xl text-text-primary placeholder:text-text-primary/10 focus:outline-none transition-colors duration-500 font-light",
                error ? "border-red-500" : "border-border-subtle focus:border-border-strong"
              )}
              onKeyDown={handleKeyDown}
            />
            <div className={cn(
              "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out",
              error ? "bg-red-500 w-full" : "bg-action-primary w-0 group-focus-within:w-full"
            )} />
          </>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 flex items-center gap-2 text-red-500 text-sm font-medium"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-6 pt-4"
      >
        <button
          onClick={handleNext}
          disabled={!isValueValid}
          className={cn(
            "flex items-center gap-2 px-10 py-5 font-bold rounded-2xl transition-all duration-300 group shadow-xl active:scale-95",
            !isValueValid
              ? "bg-surface-card text-content-secondary cursor-not-allowed border border-border-subtle"
              : "bg-gradient-to-r from-lhh-primary-magenta to-lhh-accent-pink text-action-primary-text hover:shadow-[var(--shadow-magenta-glow)] shadow-action-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          )}
        >
          {isLast ? 'Finalizar' : 'Continuar'}
          <ChevronRight className={cn("w-5 h-5 transition-transform", isValueValid && "group-hover:translate-x-1")} />
        </button>

        {!question.required && !isLast && (
          <button
            onClick={() => onNext(question.type === 'multiselect' ? [] : '')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            Omitir
          </button>
        )}

        {!isFirst && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-5 bg-surface-card text-content-secondary font-bold rounded-2xl hover:bg-surface-hover hover:text-content-primary hover:border-border-strong transition-all duration-300 active:scale-95 border border-border-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionView;

