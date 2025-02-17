import { ConfigField } from './mysql';

export interface PostgresConfig {
  [key: string]: string | number | boolean;
}

export const postgresConfigFields: Record<string, ConfigField> = {
  postgres: {
    title: 'PostgreSQL Core Settings',
    fields: {
      autovacuum_freeze_max_age: {
        type: 'number',
        min: 200000000,
        max: 1500000000,
        description: 'Specifies the maximum age (in transactions) that a table\'s pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table.',
        example: 1000000000
      },
      autovacuum_max_workers: {
        type: 'number',
        min: 1,
        max: 20,
        description: 'Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time.',
        example: 10
      },
      autovacuum_naptime: {
        type: 'number',
        min: 0,
        max: 86400,
        description: 'Specifies the minimum delay, in seconds, between autovacuum runs on any given database.',
        example: 15
      },
      autovacuum_vacuum_threshold: {
        type: 'number',
        min: 0,
        max: 2147483647,
        description: 'Specifies the minimum number of updated or deleted tuples needed to trigger a VACUUM in any one table.',
        example: 25
      },
      autovacuum_analyze_threshold: {
        type: 'number',
        min: 0,
        max: 2147483647,
        description: 'Specifies the minimum number of inserted, updated, or deleted tuples needed to trigger an ANALYZE in any one table.',
        example: 25
      },
      autovacuum_vacuum_scale_factor: {
        type: 'number',
        min: 0,
        max: 1,
        description: 'Specifies a fraction of the table size to add to autovacuum_vacuum_threshold when deciding whether to trigger a VACUUM.',
        example: 0.1
      },
      autovacuum_analyze_scale_factor: {
        type: 'number',
        min: 0,
        max: 1,
        description: 'Specifies a fraction of the table size to add to autovacuum_analyze_threshold when deciding whether to trigger an ANALYZE.',
        example: 0.05
      },
      autovacuum_vacuum_cost_delay: {
        type: 'number',
        min: -1,
        max: 100,
        description: 'Specifies the cost delay value, in milliseconds, that will be used in automatic VACUUM operations.',
        example: 2
      },
      autovacuum_vacuum_cost_limit: {
        type: 'number',
        min: -1,
        max: 10000,
        description: 'Specifies the cost limit value that will be used in automatic VACUUM operations.',
        example: 2000
      },
      backup_hour: {
        type: 'number',
        min: 0,
        max: 23,
        description: 'The hour of day (in UTC) when backup for the service starts.',
        example: 2
      },
      backup_minute: {
        type: 'number',
        min: 0,
        max: 59,
        description: 'The minute of the backup hour when backup for the service starts.',
        example: 0
      },
      bgwriter_delay: {
        type: 'number',
        min: 10,
        max: 10000,
        description: 'Specifies the delay, in milliseconds, between activity rounds for the background writer.',
        example: 50
      },
      bgwriter_flush_after: {
        type: 'number',
        min: 0,
        max: 2048,
        description: 'The amount of kilobytes that need to be written by the background writer before attempting to force the OS to issue these writes to underlying storage.',
        example: 64
      },
      bgwriter_lru_maxpages: {
        type: 'number',
        min: 0,
        max: 1073741823,
        description: 'The maximum number of buffers that the background writer can write.',
        example: 1000
      },
      bgwriter_lru_multiplier: {
        type: 'number',
        min: 0,
        max: 10,
        description: 'The average recent need for new buffers is multiplied by bgwriter_lru_multiplier to arrive at an estimate of the number that will be needed during the next round.',
        example: 4
      },
      deadlock_timeout: {
        type: 'number',
        min: 500,
        max: 1800000,
        description: 'The amount of time, in milliseconds, to wait on a lock before checking to see if there is a deadlock condition.',
        example: 5000
      },
      default_toast_compression: {
        type: 'select',
        options: ['lz4', 'pglz'],
        description: 'Specifies the default TOAST compression method for values of compressible columns.',
        example: 'lz4'
      },
      idle_in_transaction_session_timeout: {
        type: 'number',
        min: 0,
        max: 604800000,
        description: 'Time out sessions with open transactions after this number of milliseconds',
        example: 300000
      },
      jit: {
        type: 'checkbox',
        description: 'Activates the system-wide use of Just-in-Time Compilation (JIT).',
        example: true
      },
      log_autovacuum_min_duration: {
        type: 'number',
        min: -1,
        max: 2147483647,
        description: 'Causes each action executed by autovacuum to be logged if it ran for at least the specified number of milliseconds.',
        example: 1000
      },
      log_error_verbosity: {
        type: 'select',
        options: ['TERSE', 'DEFAULT', 'VERBOSE'],
        description: 'Controls the amount of detail written in the server log for each message that is logged.',
        example: 'DEFAULT'
      },
      log_line_prefix: {
        type: 'select',
        options: [
          'pid=%p,user=%u,db=%d,app=%a,client=%h',
          '%m [%p] %q[user=%u,db=%d,app=%a]',
          '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h'
        ],
        description: 'Selects one of the available log-formats.',
        example: '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h'
      },
      log_min_duration_statement: {
        type: 'number',
        min: -1,
        max: 86400000,
        description: 'Log statements that take more than this number of milliseconds to run.',
        example: 1000
      },
      max_files_per_process: {
        type: 'number',
        min: 1000,
        max: 4096,
        description: 'PostgreSQL maximum number of files that can be open per process.',
        example: 4096
      },
      max_prepared_transactions: {
        type: 'number',
        min: 0,
        max: 10000,
        description: 'PostgreSQL maximum prepared transactions.',
        example: 100
      },
      max_pred_locks_per_transaction: {
        type: 'number',
        min: 64,
        max: 640,
        description: 'PostgreSQL maximum predicate locks per transaction.',
        example: 256
      },
      max_locks_per_transaction: {
        type: 'number',
        min: 64,
        max: 6400,
        description: 'PostgreSQL maximum locks per transaction.',
        example: 256
      },
      max_stack_depth: {
        type: 'number',
        min: 2097152,
        max: 6291456,
        description: 'Maximum depth of the stack in bytes.',
        example: 4194304
      },
      max_standby_archive_delay: {
        type: 'number',
        min: 1,
        max: 43200000,
        description: 'Max standby archive delay in milliseconds.',
        example: 300000
      },
      max_standby_streaming_delay: {
        type: 'number',
        min: 1,
        max: 43200000,
        description: 'Max standby streaming delay in milliseconds.',
        example: 300000
      },
      max_replication_slots: {
        type: 'number',
        min: 8,
        max: 64,
        description: 'PostgreSQL maximum replication slots.',
        example: 32
      },
      max_logical_replication_workers: {
        type: 'number',
        min: 4,
        max: 64,
        description: 'PostgreSQL maximum logical replication workers.',
        example: 32
      },
      max_parallel_workers: {
        type: 'number',
        min: 0,
        max: 96,
        description: 'Sets the maximum number of workers that the system can support for parallel queries.',
        example: 32
      },
      max_parallel_workers_per_gather: {
        type: 'number',
        min: 0,
        max: 96,
        description: 'Sets the maximum number of workers that can be started by a single Gather or Gather Merge node.',
        example: 16
      },
      max_worker_processes: {
        type: 'number',
        min: 8,
        max: 96,
        description: 'Sets the maximum number of background processes that the system can support.',
        example: 32
      },
      pg_partman_bgw_role: {
        type: 'text',
        pattern: '^[_A-Za-z0-9][-._A-Za-z0-9]{0,63}$',
        maxLength: 64,
        description: 'Controls which role to use for pg_partman\'s scheduled background tasks.',
        example: 'postgres'
      },
      pg_partman_bgw_interval: {
        type: 'number',
        min: 3600,
        max: 604800,
        description: 'Sets the time interval to run pg_partman\'s scheduled tasks.',
        example: 7200
      },
      pg_stat_statements_track: {
        type: 'select',
        options: ['all', 'top', 'none'],
        description: 'Controls which statements are counted.',
        example: 'top'
      },
      temp_file_limit: {
        type: 'number',
        min: -1,
        max: 2147483647,
        description: 'PostgreSQL temporary file limit in KiB. If -1, sets to unlimited.',
        example: 10485760
      },
      timezone: {
        type: 'text',
        maxLength: 64,
        description: 'PostgreSQL service timezone',
        example: 'UTC'
      },
      track_activity_query_size: {
        type: 'number',
        min: 1024,
        max: 10240,
        description: 'Specifies the number of bytes reserved to track the currently executing command for each active session.',
        example: 4096
      },
      track_commit_timestamp: {
        type: 'select',
        options: ['off', 'on'],
        description: 'Record commit time of transactions.',
        example: 'on'
      },
      track_functions: {
        type: 'select',
        options: ['all', 'pl', 'none'],
        description: 'Enables tracking of function call counts and time used.',
        example: 'pl'
      },
      track_io_timing: {
        type: 'select',
        options: ['off', 'on'],
        description: 'Enables timing of database I/O calls.',
        example: 'on'
      },
      max_wal_senders: {
        type: 'number',
        min: 20,
        max: 64,
        description: 'PostgreSQL maximum WAL senders.',
        example: 40
      },
      wal_sender_timeout: {
        type: 'number',
        min: 0,
        max: 10800000,
        description: 'Terminate replication connections that are inactive for longer than this amount of time, in milliseconds.',
        example: 120000
      },
      wal_writer_delay: {
        type: 'number',
        min: 10,
        max: 200,
        description: 'WAL flush interval in milliseconds.',
        example: 20
      },
      shared_buffers_percentage: {
        type: 'number',
        min: 20,
        max: 60,
        description: 'Percentage of total RAM that the database server uses for shared memory buffers.',
        example: 45
      },
      work_mem: {
        type: 'number',
        min: 1,
        max: 1024,
        description: 'The maximum amount of memory, in MB, used by a query operation before writing to temporary disk files.',
        example: 64
      },
      synchronous_replication: {
        type: 'select',
        options: ['off', 'quorum'],
        description: 'Synchronous replication type.',
        example: 'quorum'
      },
      stat_monitor_enable: {
        type: 'checkbox',
        description: 'Enable the pg_stat_monitor extension.',
        example: true
      },
      max_failover_replication_time_lag: {
        type: 'number',
        min: 10,
        max: 9223372036854776000,
        description: 'Number of seconds of master unavailability before triggering database failover to standby.',
        example: 30
      }
    }
  },
  pgbouncer: {
    title: 'PGBouncer Connection Pooling',
    fields: {
      server_reset_query_always: {
        type: 'checkbox',
        description: 'Run server_reset_query (DISCARD ALL) in all pooling modes.',
        example: true
      },
      min_pool_size: {
        type: 'number',
        min: 0,
        max: 10000,
        description: 'If current server connections are below this number, adds more.',
        example: 10
      },
      server_lifetime: {
        type: 'number',
        min: 60,
        max: 86400,
        description: 'The pooler closes any unused server connection that has been connected longer than this amount of seconds.',
        example: 7200
      },
      server_idle_timeout: {
        type: 'number',
        min: 0,
        max: 86400,
        description: 'Drops server connections if they have been idle more than this many seconds.',
        example: 1800
      },
      autodb_pool_size: {
        type: 'number',
        min: 0,
        max: 10000,
        description: 'If non-zero, automatically creates a pool of that size per user when a pool doesn\'t exist.',
        example: 20
      },
      autodb_pool_mode: {
        type: 'select',
        options: ['session', 'transaction', 'statement'],
        description: 'PGBouncer pool mode',
        example: 'transaction'
      },
      autodb_max_db_connections: {
        type: 'number',
        min: 0,
        max: 2147483647,
        description: 'Only allows a maximum this many server connections per database (regardless of user). If 0, allows unlimited connections.',
        example: 100
      },
      autodb_idle_timeout: {
        type: 'number',
        min: 0,
        max: 86400,
        description: 'If the automatically-created database pools have been unused this many seconds, they are freed. If 0, timeout is disabled.',
        example: 1800
      },
      ignore_startup_parameters: {
        type: 'select',
        options: ['extra_float_digits', 'search_path'],
        description: 'List of parameters to ignore when given in startup packet.',
        example: ['extra_float_digits', 'search_path'],
        multiple: true
      }
    }
  },
  timescaledb: {
    title: 'TimescaleDB Settings',
    fields: {
      max_background_workers: {
        type: 'number',
        min: 1,
        max: 4096,
        description: 'The number of background workers for timescaledb operations. Set to the sum of your number of databases and the total number of concurrent background workers you want running at any given point in time.',
        example: 16
      }
    }
  }
}; 