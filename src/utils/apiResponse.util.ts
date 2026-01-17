import type { Response } from 'express';

import type { ApiSuccessResponse } from '../types/response.types';

export class ApiResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode = 200,
  ): Response {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data,
      ...(message && { message }),
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data: T,
    message = 'Resource created successfully',
  ): Response {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
