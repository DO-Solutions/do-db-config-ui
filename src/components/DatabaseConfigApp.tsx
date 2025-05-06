import React, { useState } from 'react';
import MySQLConfigForm from './forms/MySQLConfigForm';
import PostgreSQLConfigForm from './forms/PostgreSQLConfigForm';
import ValkeyConfigForm from './forms/ValkeyConfigForm';
import MongoConfigForm from './forms/MongoConfigForm';
import KafkaConfigForm from './forms/KafkaConfigForm';
import OpenSearchConfigForm from './forms/OpenSearchConfigForm';
import { 
  mysqlConfigFields, 
  postgresConfigFields, 
  valkeyConfigFields, 
  mongoConfigFields, 
  kafkaConfigFields, 
  openSearchConfigFields 
} from '../config';
import { VERSION } from '../version';

// Calculate configuration option counts for each database type
const configCounts = {
  mysql: Object.keys(mysqlConfigFields).length,
  postgres: Object.values(postgresConfigFields).reduce((count, section) => 
    count + Object.keys(section.fields).length, 0),
  valkey: Object.keys(valkeyConfigFields).length,
  mongodb: Object.keys(mongoConfigFields).length,
  kafka: Object.keys(kafkaConfigFields).length,
  opensearch: Object.keys(openSearchConfigFields).length
};

// Add this near the top of your file, after the imports
const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
`;

const DatabaseConfigApp = () => {
  const [activeTab, setActiveTab] = useState('mysql');
  const [databaseId, setDatabaseId] = useState('');

  const tabs = [
    { id: 'mysql', name: 'MySQL' },
    { id: 'postgres', name: 'PostgreSQL' },
    { id: 'valkey', name: 'Valkey' },
    { id: 'mongodb', name: 'MongoDB' },
    { id: 'kafka', name: 'Kafka' },
    { id: 'opensearch', name: 'OpenSearch' }
  ];

  const getFormattedDatabaseName = () => {
    const tab = tabs.find(tab => tab.id === activeTab);
    return tab ? tab.name : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      {/* Add the style tag */}
      <style>{styles}</style>
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 ${
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
            {/* Configuration options heading with count */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {getFormattedDatabaseName()} Configuration Options
                </h2>
                <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {configCounts[activeTab as keyof typeof configCounts]} options
                </div>
              </div>
            </div>

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
            {activeTab === 'valkey' && (
              <ValkeyConfigForm 
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
            <span className="mx-2">•</span>
            <span className="text-gray-500">v{VERSION}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConfigApp; 