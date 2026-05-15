import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Briefcase, CheckCircle2, Circle } from 'lucide-react';
import ProgressBar from '../atoms/ProgressBar';
import ThemeToggle from '../atoms/ThemeToggle';
import { cn } from '../../utils/cn';
import { FORM_PHASES } from '../../features/form/constants';

const FormLayout = ({ children, progress, currentPhase, totalSteps, currentStepIndex }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-bg-primary selection:bg-accent-primary/30 text-text-primary transition-colors duration-500">
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
      <aside className="relative z-20 w-full md:w-80 lg:w-96 p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-border-primary bg-bg-primary/40 backdrop-blur-md">
        <div className="flex-1 space-y-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-text-primary rounded-xl flex items-center justify-center shadow-lg shadow-text-primary/10">
              <div className="w-5 h-5 bg-bg-primary rounded-md" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary font-black tracking-tighter text-lg leading-none">LHH</span>
              <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Candidatos</span>
            </div>
          </div>

          {/* Vertical Navigation */}
          <nav className="space-y-8">
            <div className="space-y-1">
              <p className="text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-50">Proceso de Registro</p>
              
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
                        <div className="absolute left-[19px] top-10 w-[2px] h-10 bg-border-primary" />
                      )}
                      
                      <div className={cn(
                        "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2",
                        isActive 
                          ? "bg-text-primary border-text-primary shadow-xl shadow-text-primary/20 scale-110" 
                          : isCompleted 
                            ? "bg-accent-primary/10 border-accent-primary text-accent-primary" 
                            : "bg-transparent border-border-primary text-text-secondary group-hover:border-text-secondary"
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className={cn("w-5 h-5", isActive ? "text-bg-primary" : "")} />
                        )}
                      </div>

                      <div className="flex flex-col pt-1">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                          isActive ? "text-text-primary" : "text-text-secondary opacity-60"
                        )}>
                          Fase {idx + 1}
                        </span>
                        <span className={cn(
                          "text-sm font-bold transition-all duration-300",
                          isActive ? "text-text-primary text-lg translate-x-1" : "text-text-secondary opacity-40 group-hover:opacity-70"
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
          <div className="bg-text-primary/5 rounded-2xl p-6 border border-border-primary/50">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Progreso Total</span>
              <span className="text-xl font-mono font-bold text-text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-text-primary/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-accent-primary shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)]"
              />
            </div>
            <p className="text-[10px] text-text-secondary mt-3 opacity-60">
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
