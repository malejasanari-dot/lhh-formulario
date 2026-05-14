import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormLayout from '../../components/layout/FormLayout';
import { useFormStep } from '../../hooks/useFormStep';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionView from './components/QuestionView';
import { FORM_PHASES, QUESTIONS } from './constants';

const FormContainer = () => {
  const [formQuestions, setFormQuestions] = useState(QUESTIONS);
  const totalSteps = formQuestions.length + 1;
  const { currentStep, nextStep, prevStep, progress } = useFormStep(totalSteps);
  const [direction, setDirection] = useState(0);

  // Cargar datos dinámicos del backend
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ciudades');
        if (!response.ok) throw new Error('Error al cargar ciudades');
        
        const data = await response.json();
        
        // Mapear los datos del backend al formato esperado por el select (label, value)
        const cityOptions = data.map(city => ({
          label: city.label || city,
          value: city.value || city
        }));

        // Actualizar la lista de preguntas con las ciudades obtenidas
        setFormQuestions(prev => prev.map(q => 
          q.id === 'ciudad' ? { ...q, options: cityOptions } : q
        ));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCiudades();
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && currentStep < totalSteps - 1) {
        // Special case: Welcome screen button already handled, 
        // but we can trigger nextStep if not in an input or if handled by input
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps]);

  const variants = {
    initial: (direction) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? -40 : 40,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const isWelcome = currentStep === 0;
  const currentQuestionIndex = currentStep - 1;
  const currentQuestion = !isWelcome ? formQuestions[currentQuestionIndex] : null;
  const currentPhase = currentQuestion 
    ? FORM_PHASES.find(p => p.id === currentQuestion.phaseId)
    : null;

  return (
    <FormLayout 
      progress={progress} 
      currentPhase={currentPhase}
      totalSteps={formQuestions.length}
      currentStepIndex={isWelcome ? -1 : currentQuestionIndex}
    >
      <div className="w-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {isWelcome ? (
              <WelcomeScreen onStart={handleNext} />
            ) : (
              <QuestionView 
                question={currentQuestion}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentStep === 1}
                isLast={currentStep === totalSteps - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </FormLayout>
  );
};

export default FormContainer;
