import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { openSearchConfigFields, OpenSearchConfig } from '../../config/opensearch';
import { ConfigField as ConfigFieldType } from '../../config/mysql';

interface OpenSearchConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const OpenSearchConfigForm = ({ databaseId, onDatabaseIdChange }: OpenSearchConfigFormProps) => {
  const [config, setConfig] = useState<OpenSearchConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof OpenSearchConfig];
      setConfig(newConfig);
    } else {
      const field = openSearchConfigFields[name as keyof typeof openSearchConfigFields];
      const processedValue = field.type === 'number' ? Number(value) : value;
      setConfig((prev: OpenSearchConfig) => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'opensearch');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(openSearchConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field as ConfigFieldType}
            value={config[name as keyof OpenSearchConfig]}
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

export default OpenSearchConfigForm; 