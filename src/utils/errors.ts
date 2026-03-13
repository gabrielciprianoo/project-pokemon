export class AppError extends Error {
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export class ApiError extends AppError {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message, 'API_ERROR');
    this.name = 'ApiError';
    this.status = status;
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Error de validación') {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Error de conexión') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}
