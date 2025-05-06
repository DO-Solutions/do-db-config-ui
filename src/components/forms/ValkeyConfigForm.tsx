import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { valkeyConfigFields, ValkeyConfig } from '../../config/valkey';

interface ValkeyConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const ValkeyConfigForm = ({ databaseId, onDatabaseIdChange }: ValkeyConfigFormProps) => {
  const [config, setConfig] = useState<ValkeyConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof ValkeyConfig];
      setConfig(newConfig);
    } else {
      const field = valkeyConfigFields[name as keyof typeof valkeyConfigFields];
      const processedValue = (field.type === 'number' || field.type === 'integer') ? Number(value) : value;
      setConfig((prev: ValkeyConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'valkey');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(valkeyConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigField}
            value={config[name as keyof ValkeyConfig]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

export default ValkeyConfigForm; 