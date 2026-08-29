import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormLayout from '../../components/layout/FormLayout';
import { useFormStep } from '../../hooks/useFormStep';
import { useCatalogs } from '../../hooks/useCatalogs';
import QuestionView from './components/QuestionView';
import WorkExperienceSection from './components/WorkExperienceSection';
import { FORM_PHASES, QUESTIONS } from './constants';

const FormContainer = () => {
  const [formQuestions, setFormQuestions] = useState(QUESTIONS);
  const totalSteps = formQuestions.length;

  const { currentStep, nextStep, prevStep, progress } = useFormStep(totalSteps);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState(0);

  // Hook para gestionar catálogos dinámicos
  const {
    catalogs,
    loading,
    errors,
    fetchEducationLevels,
    fetchCities,
    fetchMaritalStatuses,
    fetchProfessions,
    fetchLanguages,
    fetchTecnologias,
    fetchLevels,
    fetchInterestingAreas,
    fetchReasons,
    fetchPackageItems,
    fetchCompanies,
    fetchEconomicSectors,
    fetchOffices,
    fetchIdTypes,
    fetchGenders,
    fetchLanguageLevels,
    fetchSalarialRanges
  } = useCatalogs();
  // Cargar los datos del usuario al iniciar el formulario
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch('/user', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        setFormData(prev => ({
          ...prev,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email
        }));
      } catch (error) {
        console.error('Error cargando los datos del usuario:', error);
      }
    };

    loadUserData();
  }, []);

  // Cargar catálogos dinámicos
  useEffect(() => {
    fetchCities();
    fetchEducationLevels();
    fetchMaritalStatuses();
    fetchProfessions();
    fetchLanguages();
    fetchTecnologias();
    fetchLevels();
    fetchInterestingAreas();
    fetchReasons();
    fetchPackageItems();
    fetchCompanies();
    fetchEconomicSectors();
    fetchOffices();
    fetchIdTypes();
    fetchGenders();
    fetchLanguageLevels();
    fetchSalarialRanges();
  }, []);

  // Sincronizar opciones dinámicas con preguntas
  useEffect(() => {
    setFormQuestions(prev =>
      prev.map(q => {
        if (!q.isDynamic) {
          return q;
        }
        const catalogKeys = {
          'idioma_nativo': 'idiomas',
          'empresa': 'companies',
          'ciudad_programa': 'offices',
          'tipo_documento': 'idTypes',
          'genero': 'genders'
        };
        const catalogKey = catalogKeys[q.id] || q.id;
        if (!catalogs[catalogKey]) {
          return q;
        }
        return {
          ...q,
          options: catalogs[catalogKey]
        };
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

  // Recursively appends a value to FormData using PHP-style bracket notation (e.g. jobs[0][cargo]).
  const appendToFormData = (formDataInstance, key, value) => {
    if (value === undefined || value === null) {
      return;
    }
    if (value instanceof File) {
      formDataInstance.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => appendToFormData(formDataInstance, `${key}[${index}]`, item));
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([childKey, childValue]) => appendToFormData(formDataInstance, `${key}[${childKey}]`, childValue));
    } else {
      formDataInstance.append(key, value);
    }
  };

  const handleNext = async (stepData) => {
    setDirection(1);

    let updatedData = formData;
    if (currentQuestion && stepData !== undefined) {
      updatedData = {
        ...formData,
        [currentQuestion.id || 'experiencia']: stepData
      };
      setFormData(updatedData);
    }

    if (currentStep !== totalSteps - 1) {
      nextStep();
      return;
    }

    console.log('========== FORM DATA ==========');
    console.log(updatedData);
    console.log('===============================');

    try {
      const candidateFormData = new FormData();

      Object.entries(updatedData).forEach(([key, value]) => {
        appendToFormData(candidateFormData, key, value);
      });

      const response = await fetch('/candidate/form', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: candidateFormData,
      });

      if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Formulario de candidato enviado con éxito:', data);
      // Redirect to /candidate after successful form submission
      window.location.href = '/candidate';
    } catch (error) {
      console.error('Error al enviar el formulario al backend:', error);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const currentQuestionIndex = currentStep;
  const currentQuestion = formQuestions[currentQuestionIndex];

  const currentPhase = currentQuestion
    ? FORM_PHASES.find(p => p.id === currentQuestion.phaseId)
    : null;

  return (
    <FormLayout
      progress={progress}
      currentPhase={currentPhase}
      totalSteps={formQuestions.length}
      currentStepIndex={currentQuestionIndex}
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
          {currentQuestion?.type === 'work_experience' ? (
            <WorkExperienceSection
              question={currentQuestion}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              catalogs={catalogs}
            />
          ) : (
            <QuestionView
              question={currentQuestion}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              isLoading={loading[currentQuestion?.id]}
              isError={errors[currentQuestion?.id]}
              catalogs={catalogs}
              initialValue={
                currentQuestion?.id === 'nombre'
                  ? formData.firstName
                  : currentQuestion?.id === 'apellido'
                    ? formData.lastName
                    : formData[currentQuestion?.id]
              }
              onRetry={() => {
                if (currentQuestion?.id === 'nivel_educativo') {
                  fetchEducationLevels();
                }

              if (currentQuestion?.id === 'ciudad') {
                fetchCities();
              }

              if (currentQuestion?.id === 'profesiones') {
                fetchProfessions();
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
