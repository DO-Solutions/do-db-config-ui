import { ConfigField } from './mysql';

export interface OpenSearchConfig {
  [key: string]: string | number | boolean | string[];
}

export const openSearchConfigFields: Record<string, ConfigField> = {
  http_max_content_length_bytes: {
    type: 'integer',
    min: 1,
    max: 2147483647,
    description: 'Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.',
    example: 104857600
  },
  http_max_header_size_bytes: {
    type: 'integer',
    min: 1024,
    max: 262144,
    description: 'Maximum size of allowed headers, in bytes.',
    example: 16384
  },
  http_max_initial_line_length_bytes: {
    type: 'integer',
    min: 1024,
    max: 65536,
    description: 'Maximum length of an HTTP URL, in bytes.',
    example: 8192
  },
  indices_query_bool_max_clause_count: {
    type: 'integer',
    min: 64,
    max: 4096,
    description: 'Maximum integer of clauses Lucene BooleanQuery can have. Only increase it if necessary, as it may cause performance issues.',
    example: 1024
  },
  indices_fielddata_cache_size_percentage: {
    type: 'integer',
    min: 3,
    max: 100,
    description: 'Maximum amount of heap memory used for field data cache, expressed as a percentage. Decreasing the value too much will increase overhead of loading field data. Increasing the value too much will decrease amount of heap available for other operations.',
    example: 20
  },
  indices_memory_index_buffer_size_percentage: {
    type: 'integer',
    min: 3,
    max: 40,
    description: 'Total amount of heap used for indexing buffer before writing segments to disk, expressed as a percentage. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.',
    example: 15
  },
  indices_memory_min_index_buffer_size_mb: {
    type: 'integer',
    min: 3,
    max: 2048,
    description: 'Minimum amount of heap used for indexing buffer before writing segments to disk, in mb. Works in conjunction with indices_memory_index_buffer_size_percentage, each being enforced.',
    example: 96
  },
  indices_memory_max_index_buffer_size_mb: {
    type: 'integer',
    min: 3,
    max: 2048,
    description: 'Maximum amount of heap used for indexing buffer before writing segments to disk, in mb. Works in conjunction with indices_memory_index_buffer_size_percentage, each being enforced. The default is unbounded.',
    example: 512
  },
  indices_queries_cache_size_percentage: {
    type: 'integer',
    min: 3,
    max: 40,
    description: 'Maximum amount of heap used for query cache. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other functionality.',
    example: 25
  },
  indices_recovery_max_mb_per_sec: {
    type: 'integer',
    min: 40,
    max: 400,
    description: 'Limits total inbound and outbound recovery traffic for each node, expressed in mb per second. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot).',
    example: 150
  },
  indices_recovery_max_concurrent_file_chunks: {
    type: 'integer',
    min: 2,
    max: 5,
    description: 'Maximum integer of file chunks sent in parallel for each recovery.',
    example: 4
  },
  thread_pool_search_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the search operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 32
  },
  thread_pool_search_throttled_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the search throttled operation thread pool. This pool is used for searching frozen indices. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 4
  },
  thread_pool_get_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the get operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 16
  },
  thread_pool_analyze_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the analyze operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 8
  },
  thread_pool_write_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the write operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 24
  },
  thread_pool_force_merge_size: {
    type: 'integer',
    min: 1,
    max: 128,
    description: 'integer of workers in the force merge operation thread pool. This pool is used for forcing a merge between shards of one or more indices. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
    example: 4
  },
  thread_pool_search_queue_size: {
    type: 'integer',
    min: 10,
    max: 2000,
    description: 'Size of queue for operations in the search thread pool.',
    example: 1000
  },
  thread_pool_search_throttled_queue_size: {
    type: 'integer',
    min: 10,
    max: 2000,
    description: 'Size of queue for operations in the search throttled thread pool.',
    example: 100
  },
  thread_pool_get_queue_size: {
    type: 'integer',
    min: 10,
    max: 2000,
    description: 'Size of queue for operations in the get thread pool.',
    example: 500
  },
  thread_pool_analyze_queue_size: {
    type: 'integer',
    min: 10,
    max: 2000,
    description: 'Size of queue for operations in the analyze thread pool.',
    example: 200
  },
  thread_pool_write_queue_size: {
    type: 'integer',
    min: 10,
    max: 2000,
    description: 'Size of queue for operations in the write thread pool.',
    example: 1000
  },
  ism_enabled: {
    type: 'checkbox',
    description: 'Specifies whether ISM is enabled or not.',
  },
  ism_history_enabled: {
    type: 'checkbox',
    description: 'Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.',
  },
  ism_history_max_age_hours: {
    type: 'integer',
    min: 1,
    max: 2147483647,
    description: 'Maximum age before rolling over the audit history index, in hours.',
    example: 48
  },
  ism_history_max_docs: {
    type: 'integer',
    min: 1,
    max: 9223372036854776000,
    description: 'Maximum integer of documents before rolling over the audit history index.',
    example: 5000000
  },
  ism_history_rollover_check_period_hours: {
    type: 'integer',
    min: 1,
    max: 2147483647,
    description: 'The time between rollover checks for the audit history index, in hours.',
    example: 12
  },
  ism_history_rollover_retention_period_days: {
    type: 'integer',
    min: 1,
    max: 2147483647,
    description: 'Length of time long audit history indices are kept, in days.',
    example: 90
  },
  search_max_buckets: {
    type: 'integer',
    min: 1,
    max: 1000000,
    description: 'Maximum integer of aggregation buckets allowed in a single response.',
    example: 65536
  },
  action_auto_create_index_enabled: {
    type: 'checkbox',
    description: 'Specifices whether to allow automatic creation of indices.',
  },
  enable_security_audit: {
    type: 'checkbox',
    description: 'Specifies whether to allow security audit logging.',
    example: true
  },
  action_destructive_requires_name: {
    type: 'checkbox',
    description: 'Specifies whether to require explicit index names when deleting indices.',
    example: true
  },
  cluster_max_shards_per_node: {
    type: 'integer',
    min: 100,
    max: 10000,
    description: 'Maximum integer of shards allowed per data node.',
    example: 1000
  },
  override_main_response_version: {
    type: 'checkbox',
    description: 'Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work.',
    
  },
  script_max_compilations_rate: {
    type: 'text',
    description: 'Limits the integer of inline script compilations within a period of time. Default is use-context',
    example: '150/5m'
  },
  cluster_routing_allocation_node_concurrent_recoveries: {
    type: 'integer',
    min: 2,
    max: 16,
    description: 'Maximum concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen per node.',
    example: 4
  },
  reindex_remote_whitelist: {
    type: 'array',
    description: 'Allowlist of remote IP addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.',
    example: ['192.168.1.1', '10.0.0.1']
  },
  plugins_alerting_filter_by_backend_roles_enabled: {
    type: 'checkbox',
    description: 'Enable or disable filtering of alerting by backend roles.',
    example: true
  }
}; 