# Configure Advanced Settings for DigitalOcean Managed Databases

[![Changelog](https://img.shields.io/github/v/release/jkpe/managed-database-advanced-settings?include_prereleases&label=changelog)](https://github.com/jkpe/managed-database-advanced-settings/releases)

This project is a web application built with React and React Router that provides a user interface for configuring advanced settings on DigitalOcean Managed Databases. The tool allows you to customize configuration options for various database engines (MySQL, PostgreSQL, Redis, MongoDB, Kafka, OpenSearch) and then generates API requests (including preformatted `curl` and `doctl` commands) so you can update your databases via DigitalOcean's API.

---

## Usage

When you open the application in your browser, you will see a multi-section interface:

- **Database ID Input:**  
  An input field where you provide your database's unique ID. (You can get your database ID by using the `doctl databases list` command.)

- **Configuration Forms:**  
  A tabbed interface lets you choose which database engine's settings you'd like to adjust (MySQL, PostgreSQL, Redis, MongoDB, Kafka, or OpenSearch). Each tab displays relevant fields along with details (range, expected input format, examples).

- **Command Generation:**  
  Once you fill out the settings, the tool generates preformatted `curl` and `doctl` commands based on your inputs. Click the "Copy" button to copy the command to your clipboard.

- **API Request:**  
  When you submit your configuration changes, the app generates the correct API request so you can update your managed database settings.

---

## API Monitoring

This project automatically monitors the DigitalOcean OpenAPI specification for any changes to database configuration options. When changes are detected, a GitHub workflow creates a pull request to track these updates, ensuring the application stays in sync with DigitalOcean's API capabilities.

---