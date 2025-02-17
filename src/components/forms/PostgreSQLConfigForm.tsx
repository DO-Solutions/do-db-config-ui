import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { postgresConfigFields, PostgresConfig } from '../../config/postgres';

interface PostgreSQLConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const PostgreSQLConfigForm = ({ databaseId, onDatabaseIdChange }: PostgreSQLConfigFormProps) => {
  const [config, setConfig] = useState<PostgresConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof PostgresConfig];
      setConfig(newConfig);
    } else {
      const field = postgresConfigFields[name as keyof typeof postgresConfigFields];
      const processedValue = field.type === 'number' ? Number(value) : value;
      setConfig((prev: PostgresConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'postgres');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(postgresConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigField}
            value={config[name as keyof PostgresConfig]}
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

export default PostgreSQLConfigForm; 