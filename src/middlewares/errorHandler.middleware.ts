import type { Request, Response } from 'express';
import { ZodError } from 'zod';

import { env } from '../configs/env';
import type { ApiErrorResponse } from '../types/response.types';
import { ApiError } from '../utils/apiError.util';

export const errorHandler = (err: unknown, _req: Request, res: Response) => {
  if (err instanceof ApiError) {
    const response: ApiErrorResponse = {
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(err.details && { details: err.details }),
      },
    };
    return res.status(err.statusCode).json(response);
  }

  if (err instanceof ZodError) {
    const details = err.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    const apiError = ApiError.badRequest('Validation failed', details);
    return res.status(apiError.statusCode).json({
      success: false,
      error: {
        message: apiError.message,
        code: apiError.code,
        details: apiError.details,
      },
    });
  }

  const response: ApiErrorResponse = {
    success: false,
    error: {
      message:
        env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : err instanceof Error
            ? err.message
            : 'Unknown error',
      code: 'INTERNAL_ERROR',
    },
  };

  res.status(500).json(response);
};
