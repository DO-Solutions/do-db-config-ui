import React, { useState } from 'react';
import { Copy } from 'lucide-react';

// Reusable ConfigField component
const ConfigField = ({ name, field, onChange, value }) => {
  const getLimitsText = () => {
    if (field.type === 'number') {
      return `(${field.min} - ${field.max})`;
    }
    if (field.type === 'text' && field.maxLength) {
      return `(max ${field.maxLength} characters)`;
    }
    return '';
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="space-y-2">
        <label className="block font-medium text-lg text-black">
          {name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        
        {field.type === 'select' ? (
          <select
            value={value !== undefined && value !== null ? value : ''}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
          >
            <option value="">Select...</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'checkbox' ? (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(name, e.target.checked)}
              className="w-5 h-5 border border-gray-300 rounded text-blue-600"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </label>
        ) : (
          <input
            type={field.type}
            value={value !== undefined && value !== null ? value : ''}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
            maxLength={field.maxLength}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            placeholder={field.example ? `Example: ${field.example}` : ''}
          />
        )}

        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600 whitespace-pre-line">{field.description}</p>
          {getLimitsText() && (
            <p className="text-sm text-blue-600 font-medium">
              Valid range: {getLimitsText()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const generateCommands = (databaseId: string, config: any, engine: string) => {
  if (!databaseId || Object.keys(config).length === 0) return { curl: '', doctl: '' };
  
  const jsonBody = JSON.stringify({ config }, null, 2);
  const compactJsonBody = JSON.stringify(config);

  return {
    curl: `curl -X PATCH \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '${jsonBody}' \\
  "https://api.digitalocean.com/v2/databases/${databaseId}/config"`,
    
    doctl: `doctl databases configuration update ${databaseId} --engine ${engine} --config-json '${compactJsonBody}'`
  };
};

const GeneratedCommands = ({ commands, onCopy }) => {
  const [curlCopied, setCurlCopied] = useState(false);
  const [doctlCopied, setDoctlCopied] = useState(false);

  const handleCopy = async (command: string, type: 'curl' | 'doctl') => {
    if (command) {
      await navigator.clipboard.writeText(command);
      if (type === 'curl') {
        setCurlCopied(true);
        setTimeout(() => setCurlCopied(false), 2000);
      } else {
        setDoctlCopied(true);
        setTimeout(() => setDoctlCopied(false), 2000);
      }
      if (onCopy) onCopy();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="space-y-6">
        {/* curl Command */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Generated <code>curl</code> command</h2>
            <button
              onClick={() => handleCopy(commands.curl, 'curl')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Copy size={16} />
              {curlCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
            {commands.curl}
          </pre>
        </div>

        {/* doctl Command */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Generated <code>doctl</code> command</h2>
            <button
              onClick={() => handleCopy(commands.doctl, 'doctl')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Copy size={16} />
              {doctlCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
            {commands.doctl}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Configuration Forms
const MySQLConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
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
    connect_timeout: { 
      type: 'number', 
      min: 2, 
      max: 3600,
      description: 'The number of seconds that the mysqld server waits for a connect packet before responding with bad handshake.',
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
      type: 'number',
      min: 4,
      max: 18446744073709552000,
      description: 'The maximum permitted result length, in bytes, for the GROUP_CONCAT() function.',
      example: 1024
    },
    information_schema_stats_expiry: {
      type: 'number',
      min: 900,
      max: 31536000,
      description: 'The time, in seconds, before cached statistics expire.',
      example: 86400
    },
    innodb_ft_min_token_size: {
      type: 'number',
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
      type: 'number',
      min: 1,
      max: 3600,
      description: 'The time, in seconds, that an InnoDB transaction waits for a row lock before giving up.',
      example: 50
    },
    innodb_log_buffer_size: {
      type: 'number',
      min: 1048576,
      max: 4294967295,
      description: 'The size of the buffer, in bytes, that InnoDB uses to write to the log files on disk.',
      example: 16777216
    },
    innodb_online_alter_log_max_size: {
      type: 'number',
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
      type: 'number',
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
      type: 'number',
      min: 1,
      max: 3600,
      description: 'The time, in seconds, to wait for more data from an existing connection before aborting the read.',
      example: 30
    },
    net_write_timeout: {
      type: 'number',
      min: 1,
      max: 3600,
      description: 'The number of seconds to wait for a block to be written to a connection before aborting the write.',
      example: 30
    },
    sql_require_primary_key: {
      type: 'checkbox',
      description: 'Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.'
    },
    wait_timeout: {
      type: 'number',
      min: 1,
      max: 2147483,
      description: 'The number of seconds the server waits for activity on a noninteractive connection before closing it.',
      example: 28800
    },
    max_allowed_packet: {
      type: 'number',
      min: 102400,
      max: 1073741824,
      description: 'The size of the largest message, in bytes, that can be received by the server. Default is 67108864 (64M).',
      example: 67108864
    },
    max_heap_table_size: {
      type: 'number',
      min: 1048576,
      max: 1073741824,
      description: 'The maximum size, in bytes, of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M).',
      example: 16777216
    },
    sort_buffer_size: {
      type: 'number',
      min: 32768,
      max: 1073741824,
      description: 'The sort buffer size, in bytes, for ORDER BY optimization. Default is 262144 (256K).',
      example: 262144
    },
    tmp_table_size: {
      type: 'number',
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
      type: 'number',
      min: 0,
      max: 50,
      description: 'Specifies the maximum size of the InnoDB change buffer as a percentage of the buffer pool.',
      example: 25
    },
    innodb_flush_neighbors: {
      type: 'number',
      min: 0,
      max: 2,
      description: 'Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent. 0: disables this functionality, 1: flushes contiguous dirty pages, 2: flushes dirty pages in the same extent.',
      example: 1
    },
    innodb_read_io_threads: {
      type: 'number',
      min: 1,
      max: 64,
      description: 'The number of I/O threads for read operations in InnoDB. Changing this parameter will lead to a restart of the MySQL service.',
      example: 16
    },
    innodb_write_io_threads: {
      type: 'number',
      min: 1,
      max: 64,
      description: 'The number of I/O threads for write operations in InnoDB. Changing this parameter will lead to a restart of the MySQL service.',
      example: 16
    },
    innodb_thread_concurrency: {
      type: 'number',
      min: 0,
      max: 1000,
      description: 'Defines the maximum number of threads permitted inside of InnoDB. A value of 0 (the default) is interpreted as infinite concurrency (no limit). This variable is intended for performance tuning on high concurrency systems.',
    },
    net_buffer_length: {
      type: 'number',
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


  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const processedValue = configFields[name].type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'mysql');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(configFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

const PostgreSQLConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
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


  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Find the field definition in the nested structure
      let fieldDef;
      for (const section of Object.values(configFields)) {
        if (section.fields && section.fields[name]) {
          fieldDef = section.fields[name];
          break;
        }
      }
      
      // Convert string values to numbers for numeric fields
      const processedValue = fieldDef?.type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'postgres');

  const renderConfigSection = (sectionName, section) => (
    <div key={sectionName} id={sectionName} className="mb-8">
      <div className="flex items-center gap-6 mb-4">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        {sectionName === 'postgres' && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Jump to ↓</span>
            <a href="#timescaledb" className="text-blue-600 hover:text-blue-800">
              TimescaleDB Settings
            </a>
            <span className="text-gray-300">•</span>
            <a href="#pgbouncer" className="text-blue-600 hover:text-blue-800">
              PgBouncer Settings
            </a>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(section.fields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Config Sections */}
      {Object.entries(configFields).map(([sectionName, section]) =>
        renderConfigSection(sectionName, section)
      )}

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

const RedisConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
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
    redis_lfu_log_factor: {
      type: 'number',
      min: 0,
      max: 100,
      description: 'Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies',
      example: 12
    },
    redis_lfu_decay_time: {
      type: 'number',
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
      type: 'number',
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

  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const processedValue = configFields[name].type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'redis');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(configFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

const MongoConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
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


  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const processedValue = configFields[name].type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'mongodb');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(configFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

const OpenSearchConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
    http_max_content_length_bytes: {
      type: 'number',
      min: 1,
      max: 2147483647,
      description: 'Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.',
      example: 104857600
    },
    http_max_header_size_bytes: {
      type: 'number',
      min: 1024,
      max: 262144,
      description: 'Maximum size of allowed headers, in bytes.',
      example: 16384
    },
    http_max_initial_line_length_bytes: {
      type: 'number',
      min: 1024,
      max: 65536,
      description: 'Maximum length of an HTTP URL, in bytes.',
      example: 8192
    },
    indices_query_bool_max_clause_count: {
      type: 'number',
      min: 64,
      max: 4096,
      description: 'Maximum number of clauses Lucene BooleanQuery can have. Only increase it if necessary, as it may cause performance issues.',
      example: 1024
    },
    indices_fielddata_cache_size_percentage: {
      type: 'number',
      min: 3,
      max: 100,
      description: 'Maximum amount of heap memory used for field data cache, expressed as a percentage. Decreasing the value too much will increase overhead of loading field data. Increasing the value too much will decrease amount of heap available for other operations.',
      example: 20
    },
    indices_memory_index_buffer_size_percentage: {
      type: 'number',
      min: 3,
      max: 40,
      description: 'Total amount of heap used for indexing buffer before writing segments to disk, expressed as a percentage. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.',
      example: 15
    },
    indices_memory_min_index_buffer_size_mb: {
      type: 'number',
      min: 3,
      max: 2048,
      description: 'Minimum amount of heap used for indexing buffer before writing segments to disk, in mb. Works in conjunction with indices_memory_index_buffer_size_percentage, each being enforced.',
      example: 96
    },
    indices_memory_max_index_buffer_size_mb: {
      type: 'number',
      min: 3,
      max: 2048,
      description: 'Maximum amount of heap used for indexing buffer before writing segments to disk, in mb. Works in conjunction with indices_memory_index_buffer_size_percentage, each being enforced. The default is unbounded.',
      example: 512
    },
    indices_queries_cache_size_percentage: {
      type: 'number',
      min: 3,
      max: 40,
      description: 'Maximum amount of heap used for query cache. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other functionality.',
      example: 25
    },
    indices_recovery_max_mb_per_sec: {
      type: 'number',
      min: 40,
      max: 400,
      description: 'Limits total inbound and outbound recovery traffic for each node, expressed in mb per second. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot).',
      example: 150
    },
    indices_recovery_max_concurrent_file_chunks: {
      type: 'number',
      min: 2,
      max: 5,
      description: 'Maximum number of file chunks sent in parallel for each recovery.',
      example: 4
    },
    thread_pool_search_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the search operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 32
    },
    thread_pool_search_throttled_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the search throttled operation thread pool. This pool is used for searching frozen indices. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 4
    },
    thread_pool_get_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the get operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 16
    },
    thread_pool_analyze_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the analyze operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 8
    },
    thread_pool_write_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the write operation thread pool. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 24
    },
    thread_pool_force_merge_size: {
      type: 'number',
      min: 1,
      max: 128,
      description: 'Number of workers in the force merge operation thread pool. This pool is used for forcing a merge between shards of one or more indices. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.',
      example: 4
    },
    thread_pool_search_queue_size: {
      type: 'number',
      min: 10,
      max: 2000,
      description: 'Size of queue for operations in the search thread pool.',
      example: 1000
    },
    thread_pool_search_throttled_queue_size: {
      type: 'number',
      min: 10,
      max: 2000,
      description: 'Size of queue for operations in the search throttled thread pool.',
      example: 100
    },
    thread_pool_get_queue_size: {
      type: 'number',
      min: 10,
      max: 2000,
      description: 'Size of queue for operations in the get thread pool.',
      example: 500
    },
    thread_pool_analyze_queue_size: {
      type: 'number',
      min: 10,
      max: 2000,
      description: 'Size of queue for operations in the analyze thread pool.',
      example: 200
    },
    thread_pool_write_queue_size: {
      type: 'number',
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
      type: 'number',
      min: 1,
      max: 2147483647,
      description: 'Maximum age before rolling over the audit history index, in hours.',
      example: 48
    },
    ism_history_max_docs: {
      type: 'number',
      min: 1,
      max: 9223372036854776000,
      description: 'Maximum number of documents before rolling over the audit history index.',
      example: 5000000
    },
    ism_history_rollover_check_period_hours: {
      type: 'number',
      min: 1,
      max: 2147483647,
      description: 'The time between rollover checks for the audit history index, in hours.',
      example: 12
    },
    ism_history_rollover_retention_period_days: {
      type: 'number',
      min: 1,
      max: 2147483647,
      description: 'Length of time long audit history indices are kept, in days.',
      example: 90
    },
    search_max_buckets: {
      type: 'number',
      min: 1,
      max: 1000000,
      description: 'Maximum number of aggregation buckets allowed in a single response.',
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
      type: 'number',
      min: 100,
      max: 10000,
      description: 'Maximum number of shards allowed per data node.',
      example: 1000
    },
    override_main_response_version: {
      type: 'checkbox',
      description: 'Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work.',
      
    },
    script_max_compilations_rate: {
      type: 'text',
      description: 'Limits the number of inline script compilations within a period of time. Default is use-context',
      example: '150/5m'
    },
    cluster_routing_allocation_node_concurrent_recoveries: {
      type: 'number',
      min: 2,
      max: 16,
      description: 'Maximum concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen per node.',
      example: 4
    },
    reindex_remote_whitelist: {
      type: 'text',
      description: 'Allowlist of remote IP addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.',
      example: ''
    },
    plugins_alerting_filter_by_backend_roles_enabled: {
      type: 'checkbox',
      description: 'Enable or disable filtering of alerting by backend roles.',
      example: true
    }
  };


  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const processedValue = configFields[name].type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'opensearch');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(configFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

const KafkaConfigForm = ({ databaseId, onDatabaseIdChange }) => {
  const [config, setConfig] = useState({});
  
  const configFields = {
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


  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      const newConfig = { ...config };
      delete newConfig[name];
      setConfig(newConfig);
    } else {
      // Convert string values to numbers for numeric fields
      const processedValue = configFields[name].type === 'number' ? Number(value) : value;
      setConfig(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const commands = generateCommands(databaseId, config, 'kafka');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(configFields).map(([name, field]) => (
          <ConfigField
            key={name}
            name={name}
            field={field}
            value={config[name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {databaseId && Object.keys(config).length > 0 && (
        <GeneratedCommands commands={commands} />
      )}
    </div>
  );
};

// Main Database Configuration App
const DatabaseConfigApp = () => {
  const [activeTab, setActiveTab] = useState('mysql');
  const [databaseId, setDatabaseId] = useState('');

  const tabs = [
    { id: 'mysql', name: 'MySQL' },
    { id: 'postgres', name: 'PostgreSQL' },
    { id: 'redis', name: 'Caching' },
    { id: 'mongodb', name: 'MongoDB' },
    { id: 'kafka', name: 'Kafka' },
    { id: 'opensearch', name: 'OpenSearch' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[rgb(0,128,255)] text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Configure Advanced Settings for DigitalOcean Managed Databases</h1>
          <p className="mt-2 text-blue-100">
            Use this tool to customize your DigitalOcean managed database configuration and generate the corresponding API request.
            <a 
              href="https://docs.digitalocean.com/reference/api/digitalocean/#tag/Databases/operation/databases_patch_config"
              target="_blank"
              rel="noopener noreferrer" 
              className="ml-2 underline hover:text-white"
            >
              View API Documentation
            </a>
          </p>
        </div>

        {/* Database ID Input */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <label className="block text-lg font-semibold mb-2">Database ID</label>
          <input
            type="text"
            value={databaseId}
            onChange={(e) => setDatabaseId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black"
            placeholder="Enter your database ID. Get your database ID using: doctl databases list"
          />
        </div>

        {/* Database Type Tabs */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'mysql' && (
              <MySQLConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
            {activeTab === 'postgres' && (
              <PostgreSQLConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
            {activeTab === 'redis' && (
              <RedisConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
            {activeTab === 'mongodb' && (
              <MongoConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
            {activeTab === 'kafka' && (
              <KafkaConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
            {activeTab === 'opensearch' && (
              <OpenSearchConfigForm 
                databaseId={databaseId}
                onDatabaseIdChange={setDatabaseId}
              />
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="text-center text-gray-600 py-8">
          <p className="text-sm">
            Thoughtfully crafted by DigitalOcean's Solutions Architects team. We hope you found it useful. {' '}
            <span role="img" aria-label="heart" className="text-red-500">❤️</span>
          </p>
          <p className="text-sm mt-2">
            <a 
              href="https://github.com/jkpe/do-db-config-ui"
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConfigApp;