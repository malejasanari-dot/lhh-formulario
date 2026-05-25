import { renderToString } from 'react-dom/server';
import React from 'react';
import { InternationalPhoneField } from './src/components/ui/InternationalPhoneField.jsx';

try {
  const html = renderToString(React.createElement(InternationalPhoneField, { value: '+573000000000', onChange: () => {} }));
  console.log('RENDERED_HTML:', html);
} catch (err) {
  console.error('ERROR_RENDERING:', err);
}
