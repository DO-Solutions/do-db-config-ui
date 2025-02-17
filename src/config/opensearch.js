export const openSearchConfigFields = {
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
    ism_enabled: {
        type: 'checkbox',
        description: 'Specifies whether ISM is enabled or not.',
    },
    ism_history_enabled: {
        type: 'checkbox',
        description: 'Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.',
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
    override_main_response_version: {
        type: 'checkbox',
        description: 'Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work.',
    },
    // ... Add more OpenSearch config fields as needed
};
