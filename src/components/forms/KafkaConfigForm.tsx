import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { kafkaConfigFields, KafkaConfig } from '../../config/kafka';
import { ConfigField as ConfigFieldType } from '../../config/mysql';

interface KafkaConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const KafkaConfigForm = ({ databaseId, onDatabaseIdChange }: KafkaConfigFormProps) => {
  const [config, setConfig] = useState<KafkaConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof KafkaConfig];
      setConfig(newConfig);
    } else {
      const field = kafkaConfigFields[name as keyof typeof kafkaConfigFields];
      const processedValue = field.type === 'number' ? Number(value) : value;
      setConfig((prev: KafkaConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'kafka');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(kafkaConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigFieldType}
            value={config[name as keyof KafkaConfig]}
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

export default KafkaConfigForm; 