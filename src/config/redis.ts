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
    type: 'number',
    min: 32,
    max: 512,
    description: 'Set output buffer limit for pub/sub clients in MB. The value is the hard limit, the soft limit is 1/4 of the hard limit. When setting the limit, be mindful of the available memory in the selected service plan.',
    example: 128
  },
  redis_number_of_databases: {
    type: 'number',
    min: 1,
    max: 128,
    description: 'Set number of redis databases. Changing this will cause a restart of redis service.',
    example: 4
  },
  redis_io_threads: {
    type: 'number',
    min: 1,
    max: 32,
    description: 'Redis IO thread count',
    example: 4
  },
  // ... rest of the Redis config fields
}; 