export const FORM_PHASES = [
  { id: 'personal', name: 'Datos Personales', color: 'blue' },
  { id: 'academic', name: 'Datos Académicos', color: 'purple' },
  { id: 'work', name: 'Historia Laboral', color: 'emerald' },
];

export const QUESTIONS = [
  {
    id: 'nombre',
    phaseId: 'personal',
    question: '¿Cuál es tu nombre?',
    description: 'Empecemos por lo básico.',
    type: 'text',
    placeholder: 'Escribe tu nombre aquí...',
    required: false,
  },
  {
    id: 'apellido',
    phaseId: 'personal',
    question: '¿Y tu apellido?',
    type: 'text',
    placeholder: 'Escribe tu apellido aquí...',
    required: false,
  },
  {
    id: 'tipo_documento',
    phaseId: 'personal',
    question: 'Selecciona tu tipo de documento',
    type: 'select',
    required: true,
    options: [
      { label: 'Cédula de ciudadanía', value: 'CC' },
      { label: 'Cédula de extranjería', value: 'CE' },
      { label: 'Pasaporte', value: 'PA' },
    ],
  },
  {
    id: 'numero_documento',
    phaseId: 'personal',
    question: '¿Cuál es tu número de documento?',
    type: 'text',
    placeholder: 'Ingresa el número sin puntos ni comas',
    required: true,
  },
  {
    id: 'movil',
    phaseId: 'personal',
    question: 'Déjanos tu número de móvil',
    description: 'Para mantenerte al tanto de las novedades.',
    type: 'tel',
    placeholder: 'Ej: 300 123 4567',
    required: true,
  },
  {
    id: 'ciudad',
    phaseId: 'personal',
    question: '¿En qué ciudad resides?',
    type: 'text',
    placeholder: 'Ej: Bogotá, Madrid...',
    required: true,
  },
];
