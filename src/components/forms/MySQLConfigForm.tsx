import React, { useState } from 'react';
import ConfigField from '../ConfigField';
import GeneratedCommands from '../GeneratedCommands';
import { generateCommands } from '../../utils/generateCommands';
import { mysqlConfigFields, MySQLConfig } from '../../config/mysql';

interface MySQLConfigFormProps {
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
}

const MySQLConfigForm = ({ databaseId, onDatabaseIdChange }: MySQLConfigFormProps) => {
  const [config, setConfig] = useState<MySQLConfig>({});

  const handleInputChange = (name: string, value: any) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name as keyof MySQLConfig];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const field = mysqlConfigFields[name as keyof typeof mysqlConfigFields];
      const processedValue = (field.type === 'number' || field.type === 'integer') ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'mysql');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(mysqlConfigFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name as keyof MySQLConfig]}
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

export default MySQLConfigForm; 