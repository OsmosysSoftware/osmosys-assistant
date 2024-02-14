# Development Setup

This document outlines the steps required to set up your Osmosys Assistant for development. By following these steps, you'll be able to run your application locally with the necessary environment variables and database configuration.

## Prerequisites

Before setting up Osmosys Assistant for development, ensure you have the following prerequisites with the specified versions:

- **NVM (Node Version Manager):** Use NVM to manage Node.js versions.
- **Node.js** Node.js v20.x or higher. Can be installed via `nvm` using `nvm install 20` and used with `nvm use 20`.
- **Git:** Git v2.x or higher.

These prerequisites are essential for deploying and running Osmosys Assistant in an environment.

Please make sure to have these versions installed on your development server before proceeding with the setup.

## Getting Started

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/OsmosysSoftware/osmosys-assistant
   cd osmosys-assistant/apps/api
   ```

2. Install project dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and add the required environment variables:

   ```env
   # Server
   SERVER_PORT=3000
   SERVER_API_KEY=osmosys-assistant-test-key

   # Database configuration
   DB_TYPE=mysql
   DB_HOST=localhost # use value as osmosys-assistant-mariadb in docker
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your-password
   DB_NAME=your-database
   MARIADB_DOCKER_PORT=3307 # (required only if using docker)

   # Redis configuration
   REDIS_HOST=127.0.0.1 # use value as osmosys-assistant-redis in docker
   REDIS_PORT=6379
   REDIS_DOCKER_PORT=6397 # (required only if using docker)

   # SMTP
   ENABLE_SMTP=true
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USERNAME=
   SMTP_PASSWORD=

   # Mailgun
   ENABLE_MAILGUN=true
   MAILGUN_API_KEY=
   MAILGUN_HOST=  # api.mailgun.net for US, api.eu.mailgun.net for EU
   MAILGUN_DOMAIN=

   # WhatsApp 360Dialog
   ENABLE_WA360DIALOG=true
   WA_360_DIALOG_URL=https://waba.360dialog.io/v1/messages
   WA_360_DIALOG_API_KEY=

   # WhatsApp Twilio
   ENABLE_WA_TWILIO=
   TWILIO_WA_ACCOUNT_SID=
   TWILIO_WA_AUTH_TOKEN=
   TWILIO_WA_NUMBER=

   # TEMP
   APP_NAME=osmo_notify
   ```

   Alternatively, use the `.env.example` file instead.

   Make sure to replace the above example values with appropriate values as per your setup and configuration. Server Port is `3000`, you can update it if you want to use a different port of your choice.

4. Set up the database:

   Ensure your database server (e.g., MariaDB) is running.

   Run database migrations to create tables:

   ```sh
   npm run typeorm:run-migration
   ```

5. Start the development server:

   ```sh
   npm run start:dev
   ```

   Osmosys Assistant will now be running locally at `http://localhost:3000`.
