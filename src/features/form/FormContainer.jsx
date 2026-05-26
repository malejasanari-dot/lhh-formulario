import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormLayout from '../../components/layout/FormLayout';
import { useFormStep } from '../../hooks/useFormStep';
import { useCatalogs } from '../../hooks/useCatalogs';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionView from './components/QuestionView';
import WorkExperienceSection from './components/WorkExperienceSection';
import { FORM_PHASES, QUESTIONS } from './constants';

const FormContainer = () => {
  const [formQuestions, setFormQuestions] = useState(QUESTIONS);
  const totalSteps = formQuestions.length + 1;

  const { currentStep, nextStep, prevStep, progress } = useFormStep(totalSteps);

  const [direction, setDirection] = useState(0);

  // Hook para gestionar catálogos dinámicos
  const {
    catalogs,
    loading,
    errors,
    fetchEducationLevels,
    fetchCiudades,
    fetchEstadosCiviles,
    fetchProfesiones,
    fetchIdiomas,
    fetchTecnologias,
    fetchLevels,
    fetchInterestingAreas,
    fetchReasons,
    fetchPackageItems,
    fetchEmpresas
  } = useCatalogs();
  console.log('FormContainer catalogs', catalogs);
  // Cargar catálogos dinámicos
  useEffect(() => {
    fetchCiudades();
    fetchEducationLevels();
    fetchEstadosCiviles();
    fetchProfesiones();
    fetchIdiomas();
    fetchTecnologias();
    fetchLevels();
    fetchInterestingAreas();
    fetchReasons();
    fetchPackageItems();
    fetchEmpresas();
  }, []);

  // Sincronizar opciones dinámicas con preguntas
  useEffect(() => {
    setFormQuestions(prev =>
      prev.map(q => {
        if (q.isDynamic) {
          const catalogKey =
            q.id === 'idioma_nativo'
              ? 'idiomas'
              : q.id;
          if (catalogs[catalogKey]) {
            return {
              ...q,
              options: catalogs[catalogKey]
            };
          }
        }

        return q;
      })
    );
  }, [catalogs]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && currentStep < totalSteps - 1) {
        // Enter manejado por QuestionView
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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

  const currentQuestion = !isWelcome
    ? formQuestions[currentQuestionIndex]
    : null;

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
            ) : currentQuestion?.type === 'work_experience' ? (
              <WorkExperienceSection
                question={currentQuestion}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentStep === 1}
                isLast={currentStep === totalSteps - 1}
                catalogs={catalogs}
              />
            ) : (
              <QuestionView
                question={currentQuestion}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentStep === 1}
                isLast={currentStep === totalSteps - 1}
                isLoading={loading[currentQuestion?.id]}
                isError={errors[currentQuestion?.id]}
                onRetry={() => {
                  if (currentQuestion?.id === 'nivel_educativo') {
                    fetchEducationLevels();
                  }

                  if (currentQuestion?.id === 'ciudad') {
                    fetchCiudades();
                  }

                  if (currentQuestion?.id === 'profesiones') {
                    fetchProfesiones();
                  }
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </FormLayout>
  );
};

export default FormContainer;