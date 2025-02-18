import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { postgresConfigFields, PostgresConfig } from '../../config/postgres';
import { ConfigField as ConfigFieldType } from '../../config/mysql';

interface PostgreSQLConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const PostgreSQLConfigForm = ({ databaseId, onDatabaseIdChange }: PostgreSQLConfigFormProps) => {
  const [config, setConfig] = useState<PostgresConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      const section = Object.entries(postgresConfigFields).find(([_, section]) => 
        name in (section.fields || {})
      )?.[1];
      
      const field = section?.fields?.[name];
      const processedValue = field?.type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'postgres');

  return (
    <div className="space-y-8">
      {Object.entries(postgresConfigFields).map(([sectionKey, section]) => (
        <div key={sectionKey} className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(section.fields).map(([name, field]) => (
              <ConfigField
                key={name}
                name={name}
                field={field as ConfigFieldType}
                value={config[name]}
                onChange={handleInputChange}
              />
            ))}
          </div>
        </div>
      ))}

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

export default PostgreSQLConfigForm;