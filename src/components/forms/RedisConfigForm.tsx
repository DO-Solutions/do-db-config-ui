import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { redisConfigFields, RedisConfig } from '../../config/redis';

interface RedisConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const RedisConfigForm = ({ databaseId, onDatabaseIdChange }: RedisConfigFormProps) => {
  const [config, setConfig] = useState<RedisConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof RedisConfig];
      setConfig(newConfig);
    } else {
      const field = redisConfigFields[name as keyof typeof redisConfigFields];
      const processedValue = field.type === 'number' ? Number(value) : value;
      setConfig((prev: RedisConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'redis');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(redisConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigField}
            value={config[name as keyof RedisConfig]}
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

export default RedisConfigForm; 