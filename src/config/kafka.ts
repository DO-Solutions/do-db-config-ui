import { ConfigField } from './mysql';

export interface KafkaConfig {
  [key: string]: string | number | boolean;
}

export const kafkaConfigFields: Record<string, ConfigField> = {
  compression_type: {
    type: 'select',
    options: ['gzip', 'snappy', 'lz4', 'zstd', 'uncompressed', 'producer'],
    description: 'Specify the final compression type for a given topic. This configuration accepts the standard compression codecs. It additionally accepts \'uncompressed\' which is equivalent to no compression; and \'producer\' which means retain the original compression codec set by the producer.',
    example: 'gzip'
  },
  group_initial_rebalance_delay_ms: {
    type: 'number',
    min: 0,
    max: 300000,
    description: 'The amount of time, in milliseconds, the group coordinator will wait for more consumers to join a new group before performing the first rebalance. A longer delay means potentially fewer rebalances, but increases the time until processing begins.',
    example: 3000
  },
  group_min_session_timeout_ms: {
    type: 'number',
    min: 0,
    max: 60000,
    description: 'The minimum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.',
    example: 6000
  },
  group_max_session_timeout_ms: {
    type: 'number',
    min: 0,
    max: 1800000,
    description: 'The maximum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.',
    example: 1800000
  },
  connections_max_idle_ms: {
    type: 'number',
    min: 1000,
    max: 3600000,
    description: 'Idle connections timeout: the server socket processor threads close the connections that idle for longer than this.',
    example: 540000
  },
  max_incremental_fetch_session_cache_slots: {
    type: 'number',
    min: 1000,
    max: 10000,
    description: 'The maximum number of incremental fetch sessions that the broker will maintain.',
    example: 1000
  },
  message_max_bytes: {
    type: 'number',
    min: 0,
    max: 100001200,
    description: 'The maximum size of message that the server can receive.',
    example: 1048588
  },
  offsets_retention_minutes: {
    type: 'number',
    min: 1,
    max: 2147483647,
    description: 'Log retention window in minutes for offsets topic',
    example: 10080
  },
  log_cleaner_delete_retention_ms: {
    type: 'number',
    min: 0,
    max: 315569260000,
    description: 'How long are delete records retained?',
    example: 86400000
  },
  log_cleaner_min_cleanable_ratio: {
    type: 'number',
    min: 0.2,
    max: 0.9,
    description: 'Controls log compactor frequency. Larger value means more frequent compactions but also more space wasted for logs. Consider setting log_cleaner_max_compaction_lag_ms to enforce compactions sooner, instead of setting a very high value for this option.',
    example: 0.5
  },
  log_cleaner_max_compaction_lag_ms: {
    type: 'number',
    min: 30000,
    max: 9223372036854776000,
    description: 'The maximum amount of time message will remain uncompacted. Only applicable for logs that are being compacted',
    example: 60000
  },
  log_cleaner_min_compaction_lag_ms: {
    type: 'number',
    min: 0,
    max: 9223372036854776000,
    description: 'The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.',
    example: 100000
  },
  log_cleanup_policy: {
    type: 'select',
    options: ['delete', 'compact', 'compact,delete'],
    description: 'The default cleanup policy for segments beyond the retention window',
    example: 'delete'
  },
  log_flush_interval_messages: {
    type: 'number',
    min: 1,
    max: 9223372036854776000,
    description: 'The number of messages accumulated on a log partition before messages are flushed to disk',
    example: 9223372036854776000
  },
  log_flush_interval_ms: {
    type: 'number',
    min: 0,
    max: 9223372036854776000,
    description: 'The maximum time in ms that a message in any topic is kept in memory before flushed to disk. If not set, the value in log.flush.scheduler.interval.ms is used',
    example: 1000000
  },
  log_index_interval_bytes: {
    type: 'number',
    min: 0,
    max: 104857600,
    description: 'The interval with which Kafka adds an entry to the offset index',
    example: 4096
  },
  log_index_size_max_bytes: {
    type: 'number',
    min: 1048576,
    max: 104857600,
    description: 'The maximum size in bytes of the offset index',
    example: 10485760
  },
  log_message_downconversion_enable: {
    type: 'checkbox',
    description: 'This configuration controls whether down-conversion of message formats is enabled to satisfy consume requests.'
  },
  log_message_timestamp_type: {
    type: 'select',
    options: ['CreateTime', 'LogAppendTime'],
    description: 'Define whether the timestamp in the message is message create time or log append time.',
    example: 'CreateTime'
  },
  log_message_timestamp_difference_max_ms: {
    type: 'number',
    min: 0,
    max: 9223372036854776000,
    description: 'The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message',
    example: 1000000
  },
  log_preallocate: {
    type: 'checkbox',
    description: 'Controls whether to preallocate a file when creating a new segment',
    
  },
  log_retention_bytes: {
    type: 'number',
    min: -1,
    max: 9223372036854776000,
    description: 'The maximum size of the log before deleting messages',
    example: 1000000
  },
  log_retention_hours: {
    type: 'number',
    min: -1,
    max: 2147483647,
    description: 'The number of hours to keep a log file before deleting it',
    example: 1000000
  },
  log_retention_ms: {
    type: 'number',
    min: -1,
    max: 9223372036854776000,
    description: 'The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied.',
    example: 100000000
  },
  log_roll_jitter_ms: {
    type: 'number',
    min: 0,
    max: 9223372036854776000,
    description: 'The maximum jitter to subtract from logRollTimeMillis (in milliseconds). If not set, the value in log.roll.jitter.hours is used',
    example: 10000000
  },
  log_roll_ms: {
    type: 'number',
    min: 1,
    max: 9223372036854776000,
    description: 'The maximum time before a new log segment is rolled out (in milliseconds).',
    example: 1000000
  },
  log_segment_bytes: {
    type: 'number',
    min: 10485760,
    max: 1073741824,
    description: 'The maximum size of a single log file',
    example: 100000000
  },
  log_segment_delete_delay_ms: {
    type: 'number',
    min: 0,
    max: 3600000,
    description: 'The amount of time to wait before deleting a file from the filesystem',
    example: 60000
  },
  auto_create_topics_enable: {
    type: 'checkbox',
    description: 'Enable auto creation of topics'
  },
  min_insync_replicas: {
    type: 'number',
    min: 1,
    max: 7,
    description: 'When a producer sets acks to \'all\' (or \'-1\'), min_insync_replicas specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful.',
    example: 1
  },
  num_partitions: {
    type: 'number',
    min: 1,
    max: 1000,
    description: 'Number of partitions for autocreated topics',
    example: 10
  },
  default_replication_factor: {
    type: 'number',
    min: 1,
    max: 10,
    description: 'Replication factor for autocreated topics',
    example: 2
  },
  replica_fetch_max_bytes: {
    type: 'number',
    min: 1048576,
    max: 104857600,
    description: 'The number of bytes of messages to attempt to fetch for each partition. This is not an absolute maximum, if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made.',
    example: 2097152
  },
  replica_fetch_response_max_bytes: {
    type: 'number',
    min: 10485760,
    max: 1048576000,
    description: 'Maximum bytes expected for the entire fetch response. Records are fetched in batches, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made.',
    example: 20971520
  },
  max_connections_per_ip: {
    type: 'number',
    min: 256,
    max: 2147483647,
    description: 'The maximum number of connections allowed from each ip address.',
    example: 512
  },
  producer_purgatory_purge_interval_requests: {
    type: 'number',
    min: 10,
    max: 10000,
    description: 'The purge interval (in number of requests) of the producer request purgatory.',
    example: 100
  },
  socket_request_max_bytes: {
    type: 'number',
    min: 10485760,
    max: 209715200,
    description: 'The maximum number of bytes in a socket request.',
    example: 20971520
  },
  transaction_state_log_segment_bytes: {
    type: 'number',
    min: 1048576,
    max: 2147483647,
    description: 'The transaction topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads.',
    example: 104857600
  },
  transaction_remove_expired_transaction_cleanup_interval_ms: {
    type: 'number',
    min: 600000,
    max: 3600000,
    description: 'The interval at which to remove transactions that have expired due to transactional.id.expiration.ms passing.',
    example: 3600000
  }
}; 