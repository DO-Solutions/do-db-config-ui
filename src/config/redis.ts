import { ConfigField } from './mysql';

export interface RedisConfig {
  [key: string]: string | number | boolean;
}

export const redisConfigFields: Record<string, ConfigField> = {
  redis_maxmemory_policy: {
    type: 'select',
    options: ['noeviction', 'allkeys-lru', 'allkeys-random', 'volatile-lru', 'volatile-random', 'volatile-ttl'],
    description: `A string specifying the desired eviction policy for the Redis cluster.

noeviction: Don't evict any data, returns error when memory limit is reached.
allkeys-lru: Evict any key, least recently used (LRU) first.
allkeys-random: Evict keys in a random order.
volatile-lru: Evict keys with expiration only, least recently used (LRU) first.
volatile-random: Evict keys with expiration only in a random order.
volatile-ttl: Evict keys with expiration only, shortest time-to-live (TTL) first.`,
    example: 'volatile_lru'
  },
  redis_pubsub_client_output_buffer_limit: {
    type: 'integer',
    min: 32,
    max: 512,
    description: 'Set output buffer limit for pub/sub clients in MB. The value is the hard limit, the soft limit is 1/4 of the hard limit. When setting the limit, be mindful of the available memory in the selected service plan.',
    example: 128
  },
  redis_number_of_databases: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'Set number of redis databases. Changing this will cause a restart of redis service.',
    example: 4
  },
  redis_io_threads: {
    type: 'integer',
    min: 1,
    max: 32,
    description: 'Redis IO thread count',
    example: 4
  },
  redis_lfu_log_factor: {
    type: 'integer',
    min: 0,
    max: 100,
    description: 'Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies',
    example: 12
  },
  redis_lfu_decay_time: {
    type: 'integer',
    min: 1,
    max: 120,
    description: 'LFU maxmemory-policy counter decay time in minutes',
    example: 5
  },
  redis_ssl: {
    type: 'checkbox',
    description: 'Require SSL to access Redis. When enabled, Redis accepts only SSL connections on port `25061`. When disabled, port `25060` is opened for non-SSL connections, while port `25061` remains available for SSL connections.',
  },
  redis_timeout: {
    type: 'integer',
    min: 0,
    max: 31536000,
    description: 'Redis idle connection timeout in seconds',
    example: 120
  },
  redis_notify_keyspace_events: {
    type: 'text',
    pattern: '^[KEg\\$lshzxeA]*$',
    maxLength: 32,
    description: 'Set notify-keyspace-events option. Requires at least `K` or `E` and accepts any combination of the following options: K (Keyspace events), E (Keyevent events), g (Generic commands), $ (String commands), l (List commands), s (Set commands), h (Hash commands), z (Sorted set commands), t (Stream commands), d (Module key type events), x (Expired events), e (Evicted events), m (Key miss events), n (New key events), A (Alias for "g$lshztxed")',
    example: 'Ex'
  },
  redis_persistence: {
    type: 'select',
    options: ['off', 'rdb'],
    description: 'Creates an RDB dump of the database every 10 minutes that can be used to recover data after a node crash. The database does not create the dump if no keys have changed since the last dump. When set to `off`, the database cannot fork services, and data can be lost if a service is restarted or powered off.',
    example: 'rdb'
  },
  redis_acl_channels_default: {
    type: 'select',
    options: ['allchannels', 'resetchannels'],
    description: 'Determines default pub/sub channels\' ACL for new users if ACL is not supplied. When this option is not defined, all_channels is assumed to keep backward compatibility.',
    example: 'resetchannels'
  }
}; 