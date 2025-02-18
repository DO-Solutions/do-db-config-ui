import { ConfigField } from './mysql';

export interface MongoConfig {
  [key: string]: string | number | boolean;
}

export const mongoConfigFields: Record<string, ConfigField> = {
  default_read_concern: {
    type: 'select',
    options: ['local', 'available', 'majority'],
    description: 'Specifies the default consistency behavior of reads from the database. Data that is returned from the query with may or may not have been acknowledged by all nodes in the replicaset depending on this value.',
    example: 'majority'
  },
  default_write_concern: {
    type: 'text',
    description: 'Describes the level of acknowledgment requested from MongoDB for write operations clusters. This field can set to either `majority` or a number `0...n` which will describe the number of nodes that must acknowledge the write operation before it is fully accepted. Setting to `0` will request no acknowledgement of the write operation.',
    example: 'majority'
  },
  transaction_lifetime_limit_seconds: {
    type: 'number',
    min: 1,
    description: 'Specifies the lifetime of multi-document transactions. Transactions that exceed this limit are considered expired and will be aborted by a periodic cleanup process. The cleanup process runs every `transactionLifetimeLimitSeconds/2 seconds` or at least once every 60 seconds. Changing this parameter will lead to a restart of the MongoDB service.',
    example: 60
  },
  slow_op_threshold_ms: {
    type: 'number',
    min: 0,
    description: 'Operations that run for longer than this threshold are considered slow which are then recorded to the diagnostic logs. Higher log levels (verbosity) will record all operations regardless of this threshold on the primary node. Changing this parameter will lead to a restart of the MongoDB service.',
    example: 100
  },
  verbosity: {
    type: 'number',
    min: 0,
    max: 5,
    description: 'The log message verbosity level. The verbosity level determines the amount of Informational and Debug messages MongoDB outputs. 0 includes informational messages while 1...5 increases the level to include debug messages. Changing this parameter will lead to a restart of the MongoDB service.',
    example: 0
  }
}; 