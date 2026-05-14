import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, AlertCircle, Plus, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

const QuestionView = ({ question, onNext, onPrev, isFirst, isLast }) => {
  const [value, setValue] = useState(question.type === 'multiselect' ? [] : '');
  const [error, setError] = useState(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const inputRef = useRef(null);
  const isCompact = question.variant === 'compact';
  const maxVisible = isCompact ? 9 : 6;

  // Reset value when question changes
  useEffect(() => {
    setValue(question.type === 'multiselect' ? [] : '');
    setError(null);
    setShowAllOptions(false);
  }, [question.id, question.type]);

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
    onNext(value);
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

  return (
    <div className="space-y-12 w-full">
      <div className="space-y-4">
        <motion.span 
          key={`label-${question.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-accent-primary font-bold text-xs uppercase tracking-[0.2em]"
        >
          {question.required ? <span className="text-red-500">*</span> : null}
          {question.id.replace('_', ' ').toUpperCase()}
        </motion.span>
        
        <motion.h2 
          key={`title-${question.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight"
        >
          {question.question}
        </motion.h2>
        
        {question.description && (
          <motion.p 
            key={`desc-${question.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl font-light"
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
        {question.type === 'select' || question.type === 'multiselect' ? (
          <div className="space-y-4">
            {question.type === 'multiselect' && Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence>
                  {value.map((v) => {
                    const opt = question.options.find(o => (o.value || o) === v);
                    return (
                      <motion.span
                        key={v}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent-primary text-white rounded-full text-sm font-medium"
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

            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-4",
              isCompact && "lg:grid-cols-3 gap-3"
            )}>
              <AnimatePresence mode="popLayout">
                {visibleOptions.map((option, idx) => {
                  const optionValue = option.value || option;
                  const optionLabel = option.label || option;
                  const isSelected = question.type === 'multiselect' 
                    ? (Array.isArray(value) && value.includes(optionValue))
                    : value === optionValue;
                  
                  return (
                    <motion.button
                      layout
                      key={option.value}
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
                          ? "bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]" 
                          : "bg-text-primary/5 border-border-primary text-text-secondary hover:bg-text-primary/10 hover:border-text-primary/20"
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
                error ? "border-red-500" : "border-border-primary focus:border-accent-primary"
              )}
              onKeyDown={handleKeyDown}
            />
            <div className={cn(
              "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out",
              error ? "bg-red-500 w-full" : "bg-accent-primary w-0 group-focus-within:w-full"
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
              ? "bg-text-primary/5 text-text-secondary cursor-not-allowed border border-border-primary" 
              : "bg-text-primary text-bg-primary hover:bg-accent-primary hover:text-white shadow-text-primary/5"
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
            className="flex items-center gap-2 px-6 py-5 bg-text-primary/5 text-text-secondary font-bold rounded-2xl hover:bg-text-primary/10 hover:text-text-primary transition-all duration-300 active:scale-95 border border-border-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionView;
