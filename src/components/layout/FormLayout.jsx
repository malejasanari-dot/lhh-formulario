import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../atoms/ProgressBar';
import ThemeToggle from '../atoms/ThemeToggle';

const FormLayout = ({ children, progress, currentPhase, totalSteps, currentStepIndex }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-bg-primary selection:bg-accent-primary/30 text-text-primary">
      {/* Theme Toggle - Esquina Superior Derecha */}
      <div className="fixed top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-accent-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      <ProgressBar progress={progress} />
      
      {/* Sidebar - LADO IZQUIERDO */}
      <aside className="relative z-20 w-full md:w-80 lg:w-96 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-primary bg-bg-primary/40 backdrop-blur-sm">
        <div className="space-y-12">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-text-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-bg-primary rounded-sm" />
            </div>
            <span className="text-text-primary font-bold tracking-tight">Lee Hecht Harrison</span>
          </div>

          {/* Progress Counter Large */}
          <div className="space-y-2">
            <motion.div 
              key={currentStepIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-7xl md:text-8xl font-black text-text-primary/10"
            >
              {String(currentStepIndex + 1).padStart(2, '0')}
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-text-secondary text-xs font-bold uppercase tracking-[0.2em]">Fase Actual</h3>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentPhase?.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-text-primary text-xl font-medium"
                >
                  {currentPhase?.name || 'Inicio'}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Phase Progress Indicator */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Progreso</p>
              <p className="text-text-primary font-mono text-2xl">{Math.round(progress)}%</p>
            </div>
            <div className="text-text-secondary text-xs font-medium">
              {currentStepIndex + 1} / {totalSteps}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - CENTRO */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 md:px-24">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>

    </div>
  );
};

export default FormLayout;
