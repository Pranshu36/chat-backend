export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    statusCode: number,
    public message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', details?: any): ApiError {
    return new ApiError(400, message, 'BAD_REQUEST', details);
  }

  static unauthorized(message = 'Unauthorized'): ApiError {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Forbidden'): ApiError {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message = 'Conflict'): ApiError {
    return new ApiError(409, message, 'CONFLICT');
  }

  static internal(message = 'Internal Server Error'): ApiError {
    return new ApiError(500, message, 'INTERNAL_ERROR');
  }
}
