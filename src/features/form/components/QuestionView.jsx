import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const QuestionView = ({ question, onNext, onPrev, isFirst, isLast }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Reset value when question changes
  useEffect(() => {
    setValue('');
    setError(null);
  }, [question.id]);

  const handleNext = () => {
    if (question.required && !value.trim()) {
      setError('Este campo es obligatorio');
      return;
    }
    onNext(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const isValueValid = !question.required || value.trim().length > 0;

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
        {question.type === 'select' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={option.value}
                onClick={() => {
                  setValue(option.value);
                  setError(null);
                  setTimeout(onNext, 300); // Small delay for visual feedback
                }}
                className={cn(
                  "flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                  value === option.value 
                    ? "bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]" 
                    : "bg-text-primary/5 border-border-primary text-text-secondary hover:bg-text-primary/10 hover:border-text-primary/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-text-primary/10 text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-lg font-medium">{option.label}</span>
                </div>
                {value === option.value && <Check className="w-5 h-5" />}
              </button>
            ))}
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
              placeholder={question.placeholder}
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
          disabled={question.required && !value.trim()}
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
            onClick={() => onNext('')}
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
