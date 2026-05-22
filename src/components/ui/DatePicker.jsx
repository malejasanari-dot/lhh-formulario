import React, { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Selecciona una fecha",
  error 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date());

  const dateValue = value ? new Date(value) : undefined;

  const handleSelect = (date) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
    } else {
      onChange('');
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  useEffect(() => {
    if (dateValue && isValid(dateValue)) {
      setMonth(dateValue);
    }
  }, [dateValue]);

  return (
    <div className="relative w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-between bg-transparent border-b-2 py-6 text-2xl md:text-4xl transition-colors duration-500 font-light text-left group",
              !value ? "text-content-secondary/60" : "text-content-primary",
              error ? "border-red-500" : "border-border-subtle hover:border-border-strong focus-visible:ring-2 focus-visible:ring-focus-ring",
              isOpen && !error && "border-state-active-border"
            )}
          >
            <span>
              {dateValue && isValid(dateValue) 
                ? format(dateValue, "d 'de' MMMM, yyyy", { locale: es }) 
                : placeholder}
            </span>
            <div className="flex items-center gap-2">
              {value && (
                <div 
                  onClick={handleClear}
                  className="p-2 rounded-full hover:bg-surface-hover transition-colors"
                >
                  <X className="w-6 h-6 opacity-50 hover:opacity-100" />
                </div>
              )}
              <CalendarIcon className={cn(
                "w-8 h-8 transition-colors", 
                isOpen ? "text-action-primary" : "text-content-secondary group-hover:text-content-primary"
              )} />
            </div>
          </button>
        </PopoverTrigger>

        {/* Línea animada de focus */}
        <div className={cn(
          "absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-in-out pointer-events-none",
          error ? "bg-red-500 w-full" : isOpen ? "bg-action-primary w-full" : "bg-action-primary w-0 group-hover:w-full"
        )} />

        <PopoverContent 
          className="w-auto p-0 border-2 border-border-subtle rounded-2xl shadow-[var(--shadow-premium)] bg-surface-dropdown overflow-hidden" 
          align="start"
          sideOffset={8}
        >
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            locale={es}
            fromYear={1930}
            toYear={new Date().getFullYear()}
            captionLayout="dropdown-buttons"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
