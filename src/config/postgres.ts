import { ConfigField } from './mysql';

export interface PostgresConfig {
  [key: string]: string | number | boolean;
}

export const postgresConfigFields: Record<string, ConfigField> = {
  autovacuum_freeze_max_age: {
    type: 'number',
    min: 200000000,
    max: 1500000000,
    description: 'Specifies the maximum age (in transactions) that a table\'s pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table.',
    example: 1000000000
  },
  // ... rest of the PostgreSQL config fields
}; 