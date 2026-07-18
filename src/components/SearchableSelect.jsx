import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';

export default function SearchableSelect({ options = [], value, onChange, placeholder, disabled, icon, showSearch = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => {
    const label = typeof opt === 'string' ? opt : opt.label;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getLabel = (val) => {
    if (!val) return null;
    const found = options.find(opt => (typeof opt === 'string' ? opt : opt.value) === val);
    return found ? (typeof found === 'string' ? found : found.label) : val;
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        className={`w-full bg-cream-light/50 border border-gold/20 rounded-xl py-3 ${icon ? 'pl-11' : 'pl-4'} pr-10 text-sm flex items-center justify-between transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gold/40'} ${isOpen ? 'ring-2 ring-saffron border-transparent' : ''}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) setSearchTerm(''); // Reset search on open
          }
        }}
      >
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold pointer-events-none">
          {icon}
        </div>
        <span className={`block truncate ${value ? 'text-dark' : 'text-dark-light/40'}`}>
          {getLabel(value) || placeholder}
        </span>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-dark-light">
          <HiChevronDown className={`text-lg transition-transform ${isOpen ? 'rotate-180 text-saffron' : 'text-gold'}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gold/20 rounded-xl shadow-lg max-h-60 flex flex-col">
          {showSearch && (
            <div className="p-2 border-b border-gold/10">
              <input
                type="text"
                autoFocus
                className="w-full bg-cream-light/30 border border-gold/20 rounded-lg py-2 px-3 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-saffron"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
              />
            </div>
          )}
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const optValue = typeof opt === 'string' ? opt : opt.value;
                return (
                  <div
                    key={idx}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === optValue ? 'bg-saffron text-white font-semibold' : 'text-dark hover:bg-saffron/10 hover:text-saffron'}`}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    {optLabel}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-dark-light text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
