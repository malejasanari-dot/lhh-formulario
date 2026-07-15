import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const EmailVerification = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      setError('El correo es obligatorio.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/find-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.exists) {
        onVerified({
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } else {
        setError("No encontramos un usuario asociado a ese correo electrónico.");
      }
    } catch (err) {
      console.error('Error verificando email:', err);
      setError('Hubo un error al verificar tu correo. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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
          BIENVENIDO
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-content-secondary text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Para continuar con el formulario, ingresa el correo electrónico con el que fuiste registrado.
        </motion.p>
      </div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="space-y-8 max-w-md mx-auto"
      >
        <div className="relative group">
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="correo@ejemplo.com"
            disabled={loading}
            className={cn(
              "w-full bg-transparent border-b-2 py-6 text-xl md:text-3xl text-center text-text-primary placeholder:text-text-primary/10 focus:outline-none transition-colors duration-500 font-light",
              error ? "border-red-500" : "border-border-subtle focus:border-border-strong",
              loading && "opacity-50 cursor-not-allowed"
            )}
          />
          <div className={cn(
            "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out",
            error ? "bg-red-500 w-full" : "bg-action-primary w-0 group-focus-within:w-full"
          )} />
        </div>

        <div className="min-h-[24px]">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className={cn(
              "group relative px-10 py-5 font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[var(--shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center justify-center gap-2 mx-auto",
              (loading || !email.trim())
                ? "bg-surface-card text-content-secondary cursor-not-allowed border border-border-subtle"
                : "bg-gradient-to-r from-lhh-primary-magenta to-lhh-accent-pink text-action-primary-text"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            {!loading && email.trim() && (
              <div className="absolute inset-0 bg-gradient-to-r from-lhh-primary-purple via-lhh-primary-magenta to-lhh-accent-pink translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default EmailVerification;
