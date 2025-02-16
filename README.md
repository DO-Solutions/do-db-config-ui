# Configure Advanced Settings for DigitalOcean Managed Databases

[![Changelog](https://img.shields.io/github/v/release/jkpe/do-db-config-ui?include_prereleases&label=changelog)](https://github.com/jkpe/do-db-config-ui/releases)

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

## GitHub Workflows

This project uses several GitHub Actions workflows to automate deployment and monitoring:

### Deployment Workflows

- **App Platform - Deployment (`deploy-app.yml`):**  
  Automatically deploys the application to DigitalOcean App Platform when changes are pushed to the main branch.

- **App Platform - Preview (`deploy-pull-preview.yml`):**  
  Creates preview deployments for pull requests, allowing you to test changes before merging. The workflow posts the preview URL as a comment on the PR.

- **App Platform - Delete Preview (`delete-pull-preview.yml`):**  
  Automatically cleans up preview deployments when pull requests are closed.

### Monitoring Workflow

- **Monitor DO OpenAPI Database Changes (`do-openapi.yml`):**  
  - Runs every 6 hours to check for updates to DigitalOcean's OpenAPI specification
  - Monitors changes specifically in the database configuration models
  - Creates a pull request when changes are detected
  - Includes commit details and links to the original OpenAPI changes
  - Helps maintain compatibility with DigitalOcean's latest API updates

---

## Local Development

To run this application locally:

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

---

## Contributing

We welcome contributions to improve the DO Database Config UI! Here's how you can help:

### Project Structure

The main application code is located in `src/artifacts/index.tsx`. The project follows a component-based architecture using React and TypeScript.

### How to Contribute

1. Fork the repository
2. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes
4. Commit your changes:

   ```bash
   git commit -m "Add your commit message"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

---
