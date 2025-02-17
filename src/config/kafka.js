export const kafkaConfigFields = {
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
    // ... Add more Kafka config fields as needed
};
