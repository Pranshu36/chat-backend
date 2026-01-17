import http from 'http';

import { createApp } from './app';
import { env } from './configs/env';
import { assertDatabaseConnection } from './db/db';

const startServer = async () => {
  try {
    await assertDatabaseConnection();
    const app = createApp();
    const server = http.createServer(app);
    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
