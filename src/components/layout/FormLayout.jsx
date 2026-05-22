import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Briefcase, CheckCircle2, Circle } from 'lucide-react';
import ProgressBar from '../atoms/ProgressBar';
import ThemeToggle from '../atoms/ThemeToggle';
import { cn } from '../../utils/cn';
import { FORM_PHASES } from '../../features/form/constants';

const FormLayout = ({ children, progress, currentPhase, totalSteps, currentStepIndex }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-surface-app selection:bg-action-primary/30 text-content-primary transition-colors duration-500">
      {/* Theme Toggle - Esquina Superior Derecha */}
      <div className="fixed top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-action-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-lhh-accent-pink/10 blur-[150px] rounded-full" />
      </div>

      <ProgressBar progress={progress} />
      
      {/* Sidebar - LADO IZQUIERDO */}
      <aside className="relative z-20 w-full md:w-80 lg:w-96 p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-border-subtle bg-surface-panel/70 backdrop-blur-md">
        <div className="flex-1 space-y-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink rounded-xl flex items-center justify-center shadow-[var(--shadow-magenta-glow)]">
              <div className="w-5 h-5 bg-action-primary-text rounded-md" />
            </div>
            <div className="flex flex-col">
              <span className="text-content-primary font-black tracking-tighter text-lg leading-none">LHH</span>
              <span className="text-content-secondary text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Candidatos</span>
            </div>
          </div>

          {/* Vertical Navigation */}
          <nav className="space-y-8">
            <div className="space-y-1">
              <p className="text-content-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-60">Proceso de Registro</p>
              
              <div className="space-y-6">
                {FORM_PHASES.map((phase, idx) => {
                  const isActive = currentPhase?.id === phase.id;
                  const isCompleted = FORM_PHASES.findIndex(p => p.id === currentPhase?.id) > idx;
                  const phaseIcons = {
                    personal: User,
                    academic: GraduationCap,
                    work: Briefcase
                  };
                  const Icon = phaseIcons[phase.id] || Circle;

                  return (
                    <div key={phase.id} className="relative flex items-start gap-4 group">
                      {/* Línea conectora */}
                      {idx !== FORM_PHASES.length - 1 && (
                        <div className="absolute left-[19px] top-10 w-[2px] h-10 bg-border-subtle" />
                      )}
                      
                      <div className={cn(
                        "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2",
                        isActive 
                          ? "bg-gradient-to-br from-lhh-primary-magenta to-lhh-accent-pink border-state-active-border shadow-[var(--shadow-magenta-glow)] scale-110" 
                          : isCompleted 
                            ? "bg-state-active-bg border-state-active-border text-state-active-border" 
                            : "bg-transparent border-border-subtle text-content-secondary group-hover:border-border-strong"
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className={cn("w-5 h-5", isActive ? "text-action-primary-text" : "")} />
                        )}
                      </div>

                      <div className="flex flex-col pt-1">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                          isActive ? "text-content-primary" : "text-content-secondary opacity-70"
                        )}>
                          Fase {idx + 1}
                        </span>
                        <span className={cn(
                          "text-sm font-bold transition-all duration-300",
                          isActive ? "text-content-primary text-lg translate-x-1" : "text-content-secondary opacity-50 group-hover:opacity-80"
                        )}>
                          {phase.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="mt-auto pt-12">
          <div className="bg-surface-card rounded-2xl p-6 border border-border-subtle shadow-[var(--shadow-soft-card)]">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-content-secondary">Progreso Total</span>
              <span className="text-xl font-mono font-bold text-content-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-progress-track rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-progress-fill shadow-[0_0_14px_var(--focus-ring)]"
              />
            </div>
            <p className="text-[10px] text-content-secondary mt-3 opacity-70">
              Pregunta {currentStepIndex + 1} de {totalSteps}
            </p>
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
