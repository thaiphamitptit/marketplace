export enum RequestHeaders {
  API_KEY = 'x-api-key',
  USER_ID = 'x-user-id',
  ACCESS_TOKEN = 'authorization',
  REFRESH_TOKEN = 'x-refresh-token'
}

export enum ErrorMessages {
  VALIDATION_ERROR = 'Validation error',
  API_KEY_NOT_FOUND = 'Api key not found',
  JWT_ERROR = 'Jwt error',
  NOT_ALLOW_ACCESS_RESOURCE = 'Not allow access resource',
  EMAIL_ALREADY_REGISTERED = 'Email already registered',
  EMAIL_NOT_REGISTERED = 'Email not registered',
  INVALID_CREDENTIALS = 'Invalid credentials',
  KEY_STORE_NOT_FOUND = 'Key store not found',
  INVALID_AUTH_TOKEN = 'Invalid auth token',
  AUTH_TOKEN_ALREADY_REUSED = 'Auth token already reused'
}

export enum SuccessMessages {
  REGISTER_SUCCESSFULLY = 'Register successfully',
  LOGIN_SUCCESSFULLY = 'Login successfully',
  LOGOUT_SUCCESSFULLY = 'Logout successfully',
  REFRESH_TOKENS_SUCCESSFULLY = 'Refresh tokens successfully'
}
