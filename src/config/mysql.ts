export interface ConfigField {
  type: 'number' | 'text' | 'select' | 'checkbox' | 'integer';
  min?: number;
  max?: number;
  minLength?: number;
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
    type: 'integer', 
    min: 0, 
    max: 23,
    description: 'The hour of day (in UTC) when backup for the service starts. New backup only starts if previous backup has already completed.',
    example: 3
  },
  backup_minute: { 
    type: 'integer', 
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
  connect_timeout: { 
    type: 'integer', 
    min: 2, 
    max: 3600,
    description: 'The integer of seconds that the mysqld server waits for a connect packet before responding with bad handshake.',
    example: 10
  },
  default_time_zone: { 
    type: 'text', 
    minLength: 2, 
    maxLength: 100,
    description: 'Default server time zone, in the form of an offset from UTC (from -12:00 to +12:00), a time zone name (EST), or SYSTEM to use the MySQL server default.',
    example: '+03:00'
  },
  group_concat_max_len: {
    type: 'integer',
    min: 4,
    max: 18446744073709552000,
    description: 'The maximum permitted result length, in bytes, for the GROUP_CONCAT() function.',
    example: 1024
  },
  information_schema_stats_expiry: {
    type: 'integer',
    min: 900,
    max: 31536000,
    description: 'The time, in seconds, before cached statistics expire.',
    example: 86400
  },
  innodb_ft_min_token_size: {
    type: 'integer',
    min: 0,
    max: 16,
    description: 'The minimum length of words that an InnoDB FULLTEXT index stores.',
    example: 3
  },
  innodb_ft_server_stopword_table: {
    type: 'text',
    pattern: '^.+/.+$',
    maxLength: 1024,
    description: 'The InnoDB FULLTEXT index stopword list for all InnoDB tables.',
    example: 'db_name/table_name'
  },
  innodb_lock_wait_timeout: {
    type: 'integer',
    min: 1,
    max: 3600,
    description: 'The time, in seconds, that an InnoDB transaction waits for a row lock before giving up.',
    example: 50
  },
  innodb_log_buffer_size: {
    type: 'integer',
    min: 1048576,
    max: 4294967295,
    description: 'The size of the buffer, in bytes, that InnoDB uses to write to the log files on disk.',
    example: 16777216
  },
  innodb_online_alter_log_max_size: {
    type: 'integer',
    min: 65536,
    max: 1099511627776,
    description: 'The upper limit, in bytes, of the size of the temporary log files used during online DDL operations for InnoDB tables.',
    example: 134217728
  },
  innodb_print_all_deadlocks: {
    type: 'checkbox',
    description: 'When enabled, records information about all deadlocks in InnoDB user transactions in the error log. Disabled by default.'
  },
  innodb_rollback_on_timeout: {
    type: 'checkbox',
    description: 'When enabled, transaction timeouts cause InnoDB to abort and roll back the entire transaction.'
  },
  interactive_timeout: {
    type: 'integer',
    min: 30,
    max: 604800,
    description: 'The time, in seconds, the server waits for activity on an interactive connection before closing it.',
    example: 3600
  },
  internal_tmp_mem_storage_engine: {
    type: 'select',
    options: ['TempTable', 'MEMORY'],
    description: 'The storage engine for in-memory internal temporary tables.',
    example: 'TempTable'
  },
  net_read_timeout: {
    type: 'integer',
    min: 1,
    max: 3600,
    description: 'The time, in seconds, to wait for more data from an existing connection before aborting the read.',
    example: 30
  },
  net_write_timeout: {
    type: 'integer',
    min: 1,
    max: 3600,
    description: 'The integer of seconds to wait for a block to be written to a connection before aborting the write.',
    example: 30
  },
  sql_require_primary_key: {
    type: 'checkbox',
    description: 'Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.'
  },
  wait_timeout: {
    type: 'integer',
    min: 1,
    max: 2147483,
    description: 'The integer of seconds the server waits for activity on a noninteractive connection before closing it.',
    example: 28800
  },
  max_allowed_packet: {
    type: 'integer',
    min: 102400,
    max: 1073741824,
    description: 'The size of the largest message, in bytes, that can be received by the server. Default is 67108864 (64M).',
    example: 67108864
  },
  max_heap_table_size: {
    type: 'integer',
    min: 1048576,
    max: 1073741824,
    description: 'The maximum size, in bytes, of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M).',
    example: 16777216
  },
  sort_buffer_size: {
    type: 'integer',
    min: 32768,
    max: 1073741824,
    description: 'The sort buffer size, in bytes, for ORDER BY optimization. Default is 262144 (256K).',
    example: 262144
  },
  tmp_table_size: {
    type: 'integer',
    min: 1048576,
    max: 1073741824,
    description: 'The maximum size, in bytes, of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M).',
    example: 16777216
  },
  slow_query_log: {
    type: 'checkbox',
    description: 'When enabled, captures slow queries. When disabled, also truncates the mysql.slow_log table. Default is false.'
  },
  long_query_time: {
    type: 'number',
    min: 0,
    max: 3600,
    description: 'The time, in seconds, for a query to take to execute before being captured by slow_query_logs. Default is 10 seconds.',
    example: 10
  },
  binlog_retention_period: {
    type: 'number',
    min: 600,
    max: 86400,
    description: 'The minimum amount of time, in seconds, to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default, for example if using the MySQL Debezium Kafka connector.',
    example: 600
  },
  innodb_change_buffer_max_size: {
    type: 'integer',
    min: 0,
    max: 50,
    description: 'Specifies the maximum size of the InnoDB change buffer as a percentage of the buffer pool.',
    example: 25
  },
  innodb_flush_neighbors: {
    type: 'integer',
    min: 0,
    max: 2,
    description: 'Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent. 0: disables this functionality, 1: flushes contiguous dirty pages, 2: flushes dirty pages in the same extent.',
    example: 1
  },
  innodb_read_io_threads: {
    type: 'integer',
    min: 1,
    max: 64,
    description: 'The integer of I/O threads for read operations in InnoDB. Changing this parameter will lead to a restart of the MySQL service.',
    example: 16
  },
  innodb_write_io_threads: {
    type: 'integer',
    min: 1,
    max: 64,
    description: 'The integer of I/O threads for write operations in InnoDB. Changing this parameter will lead to a restart of the MySQL service.',
    example: 16
  },
  innodb_thread_concurrency: {
    type: 'integer',
    min: 0,
    max: 1000,
    description: 'Defines the maximum integer of threads permitted inside of InnoDB. A value of 0 (the default) is interpreted as infinite concurrency (no limit). This variable is intended for performance tuning on high concurrency systems.',
  },
  net_buffer_length: {
    type: 'integer',
    min: 1024,
    max: 1048576,
    description: 'Start sizes of connection buffer and result buffer, must be multiple of 1024. Changing this parameter will lead to a restart of the MySQL service.',
    example: 4096
  },
  log_output: {
    type: 'select',
    options: ['INSIGHTS', 'TABLE', 'INSIGHTS,TABLE', 'NONE'],
    description: 'Defines the destination for logs. Can be INSIGHTS, TABLE, or both (INSIGHTS,TABLE), or NONE to disable logs. Default is NONE.',
    example: 'INSIGHTS'
  }
}; 