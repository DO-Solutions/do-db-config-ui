import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { mongoConfigFields, MongoConfig } from '../../config/mongo';
import { ConfigField as ConfigFieldType } from '../../config/mysql';

interface MongoConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const MongoConfigForm = ({ databaseId, onDatabaseIdChange }: MongoConfigFormProps) => {
  const [config, setConfig] = useState<MongoConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof MongoConfig];
      setConfig(newConfig);
    } else {
      const field = mongoConfigFields[name as keyof typeof mongoConfigFields];
      const processedValue = field.type === 'number' ? Number(value) : value;
      setConfig((prev: MongoConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'mongodb');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(mongoConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigFieldType}
            value={config[name as keyof MongoConfig]}
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

export default MongoConfigForm; 