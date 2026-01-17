import type { Application } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './middlewares/errorHandler.middleware';
import { ApiError } from './utils/apiError.util';

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use((_req, _res, next) => {
    next(ApiError.notFound('Route not found'));
  });

  app.use(errorHandler);

  return app;
};
