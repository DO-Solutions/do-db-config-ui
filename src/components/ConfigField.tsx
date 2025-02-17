import React from 'react';

interface ConfigFieldProps {
  name: string;
  field: {
    type: string;
    min?: number;
    max?: number;
    maxLength?: number;
    pattern?: string;
    description: string;
    example?: any;
    options?: string[];
  };
  onChange: (name: string, value: any) => void;
  value: any;
}

const ConfigField = ({ name, field, onChange, value }: ConfigFieldProps) => {
  const getLimitsText = () => {
    if (field.type === 'number') {
      return `(${field.min} - ${field.max})`;
    }
    if (field.type === 'text' && field.maxLength) {
      return `(max ${field.maxLength} characters)`;
    }
    return '';
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="space-y-2">
        <label className="block font-medium text-lg text-black">
          {name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        
        {field.type === 'select' ? (
          <select
            value={value !== undefined && value !== null ? value : ''}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'checkbox' ? (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(name, e.target.checked)}
              className="w-5 h-5 border border-gray-300 rounded text-blue-600"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </label>
        ) : (
          <input
            type={field.type}
            value={value !== undefined && value !== null ? value : ''}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
            maxLength={field.maxLength}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            placeholder={field.example ? `Example: ${field.example}` : ''}
          />
        )}

        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600 whitespace-pre-line">{field.description}</p>
          {getLimitsText() && (
            <p className="text-sm text-blue-600 font-medium">
              Valid range: {getLimitsText()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigField; 