import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="text-center space-y-8 md:space-y-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-block p-3 rounded-2xl bg-badge-bg border border-badge-border mb-4 shadow-[var(--shadow-magenta-glow)]"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink rounded-xl flex items-center justify-center shadow-[var(--shadow-magenta-glow)]">
          <ArrowRight className="text-action-primary-text w-6 h-6" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-8xl font-black text-content-primary tracking-tighter"
        >
          COMPLETA TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink">PERFIL</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-content-secondary text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Mejora tus posibilidades y permite que encontremos mejores oportunidades para ti.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="pt-8"
      >
        <button
          onClick={onStart}
          className="group relative px-10 py-5 bg-gradient-to-r from-lhh-primary-magenta to-lhh-accent-pink text-action-primary-text font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[var(--shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <span className="relative z-10 flex items-center gap-2">
            Empezar ahora <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </button>
        
        <div className="mt-6 flex items-center justify-center gap-4 text-content-secondary text-xs font-semibold uppercase tracking-widest">
          <span>Toma 2 min</span>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
