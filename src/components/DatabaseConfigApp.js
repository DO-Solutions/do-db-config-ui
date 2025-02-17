import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import MySQLConfigForm from './forms/MySQLConfigForm';
import PostgreSQLConfigForm from './forms/PostgreSQLConfigForm';
import RedisConfigForm from './forms/RedisConfigForm';
import MongoConfigForm from './forms/MongoConfigForm';
import KafkaConfigForm from './forms/KafkaConfigForm';
import OpenSearchConfigForm from './forms/OpenSearchConfigForm';
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
    return (_jsx("div", { className: "min-h-screen bg-gray-50 text-black p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "bg-[rgb(0,128,255)] text-white p-6 rounded-lg shadow-lg", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Configure Advanced Settings for DigitalOcean Managed Databases" }), _jsxs("p", { className: "mt-2 text-blue-100", children: ["Use this tool to customize your DigitalOcean managed database configuration and generate the corresponding API request.", _jsx("a", { href: "https://docs.digitalocean.com/reference/api/digitalocean/#tag/Databases/operation/databases_patch_config", target: "_blank", rel: "noopener noreferrer", className: "ml-2 underline hover:text-white", children: "View API Documentation" })] })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [_jsx("label", { className: "block text-lg font-semibold mb-2", children: "Database ID" }), _jsx("input", { type: "text", value: databaseId, onChange: (e) => setDatabaseId(e.target.value), className: "w-full p-3 border border-gray-300 rounded-md bg-white text-black", placeholder: "Enter your database ID. Get your database ID using: doctl databases list" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200", children: [_jsx("div", { className: "border-b border-gray-200", children: _jsx("nav", { className: "flex", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: `px-6 py-3 text-sm font-medium border-b-2 ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: tab.name }, tab.id))) }) }), _jsxs("div", { className: "p-6", children: [activeTab === 'mysql' && (_jsx(MySQLConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId })), activeTab === 'postgres' && (_jsx(PostgreSQLConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId })), activeTab === 'redis' && (_jsx(RedisConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId })), activeTab === 'mongodb' && (_jsx(MongoConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId })), activeTab === 'kafka' && (_jsx(KafkaConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId })), activeTab === 'opensearch' && (_jsx(OpenSearchConfigForm, { databaseId: databaseId, onDatabaseIdChange: setDatabaseId }))] })] }), _jsxs("div", { className: "text-center text-gray-600 py-8", children: [_jsxs("p", { className: "text-sm", children: ["Thoughtfully crafted by DigitalOcean's Solutions Architects team. We hope you found it useful. ", ' ', _jsx("span", { role: "img", "aria-label": "heart", className: "text-red-500", children: "\u2764\uFE0F" })] }), _jsx("p", { className: "text-sm mt-2", children: _jsx("a", { href: "https://github.com/jkpe/do-db-config-ui", className: "text-blue-600 hover:text-blue-800", target: "_blank", rel: "noopener noreferrer", children: "View on GitHub" }) })] })] }) }));
};
export default DatabaseConfigApp;
