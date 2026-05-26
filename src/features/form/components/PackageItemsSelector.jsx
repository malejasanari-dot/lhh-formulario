import React from 'react';
import { FormDropdown } from './FormDropdown';
import { Trash2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const PackageItemsSelector = ({
  value = [],
  onChange,
  options = [],
  error
}) => {
  // Ensure value is an array
  const items = Array.isArray(value) ? value : [];

  // Filter out options that are already selected (numeric comparison)
  const availableOptions = options.filter(
    (opt) => !items.some((item) => item.id === Number(opt.value))
  );

  const handleSelect = (selectedId) => {
    if (!selectedId) return;

    const option = options.find(
      (opt) => Number(opt.value) === Number(selectedId)
    );

    console.log('OPTION SELECTED', option);

    if (option) {
      onChange([
        ...items,
        {
          id: Number(option.value),
          label: option.label,
          unitType: option.unitType,
          quantity: ''
        }
      ]);
    }
  };

  const handleRemove = (idToRemove) => {
    onChange(items.filter((item) => item.id !== idToRemove));
  };

  const handleQuantityChange = (id, newQuantity) => {
    // Solo permitir números
    const numericValue = newQuantity.replace(/[^0-9]/g, '');
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, quantity: numericValue } : item
      )
    );
  };

  return (
    <div className="space-y-3">
      <FormDropdown
        label="Paquete de desvinculación"
        value=""
        onChange={handleSelect}
        options={availableOptions}
        placeholder="Selecciona un item para agregar"
        showSearch={true}
        error={error}
      />

      {items.length > 0 && (
        <div className="space-y-2 mt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-surface-card border border-border-subtle rounded-xl p-3 shadow-sm hover:border-border-strong transition-colors"
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-content-primary">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  placeholder="0"
                  className="w-16 bg-surface-background border border-border-subtle rounded-lg px-2 py-1.5 text-sm text-center text-content-primary focus:outline-none focus:border-border-strong focus:ring-1 focus:ring-focus-ring"
                />
                <span className="text-[11px] font-bold text-content-secondary uppercase w-16">
                  {item.quantity ? `${item.quantity} ${item.unitType === 'UNIDADES' ? 'unidades' : 'meses'}` : item.unitType === 'UNIDADES' ? 'unidades' : 'meses'}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="text-text-secondary/50 hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-md transition-colors"
                  title="Eliminar item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
