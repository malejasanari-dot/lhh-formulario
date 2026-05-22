import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const InternationalPhoneField = ({
  value = '',
  onChange,
  onKeyDown,
  placeholder = 'Escribe tu número...',
  hasError = false,
  autoFocus = false,
  defaultCountry = 'co'
}) => {
  const normalizedValue = value ? value.replace(/\D/g, '') : '';

  return (
    <div className="lhh-phone-field w-full">
      <PhoneInput
        country={defaultCountry}
        value={normalizedValue}
        onChange={(phone) => onChange(phone ? `+${phone}` : '')}
        enableSearch
        searchPlaceholder="Buscar país..."
        countryCodeEditable={false}
        disableSearchIcon
        placeholder={placeholder}
        inputProps={{
          onKeyDown,
          autoFocus
        }}
        containerClass={`lhh-phone-container ${hasError ? 'has-error' : ''}`}
        buttonClass="lhh-phone-button"
        dropdownClass="lhh-phone-dropdown"
        searchClass="lhh-phone-search"
        inputClass="lhh-phone-input"
      />
    </div>
  );
};

