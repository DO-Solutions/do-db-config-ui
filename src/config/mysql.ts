export interface ConfigField {
  type: 'number' | 'text' | 'select' | 'checkbox';
  min?: number;
  max?: number;
  maxLength?: number;
  pattern?: string;
  description: string;
  example?: any;
  options?: string[];
}

export interface MySQLConfig {
  [key: string]: string | number | boolean;
}

export const mysqlConfigFields: Record<string, ConfigField> = {
  backup_hour: { 
    type: 'number', 
    min: 0, 
    max: 23,
    description: 'The hour of day (in UTC) when backup for the service starts. New backup only starts if previous backup has already completed.',
    example: 3
  },
  backup_minute: { 
    type: 'number', 
    min: 0, 
    max: 59,
    description: 'The minute of the backup hour when backup for the service starts. New backup only starts if previous backup has already completed.',
    example: 30
  },
  sql_mode: { 
    type: 'text', 
    pattern: '^[A-Z_]*(,[A-Z_]+)*$', 
    maxLength: 1024,
    description: 'Global SQL mode. If empty, uses MySQL server defaults. Must only include uppercase alphabetic characters, underscores, and commas.',
    example: 'ANSI,TRADITIONAL'
  },
  // ... rest of the MySQL config fields from the original file
}; 