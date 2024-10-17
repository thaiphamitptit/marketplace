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
  AUTH_TOKEN_ALREADY_REUSED = 'Auth token already reused',
  CATEGORY_NOT_FOUND = 'Category not found',
  INVALID_PARENT_CATEGORY = 'Invalid parent category'
}

export enum SuccessMessages {
  REGISTER_SUCCESSFULLY = 'Register successfully',
  LOGIN_SUCCESSFULLY = 'Login successfully',
  LOGOUT_SUCCESSFULLY = 'Logout successfully',
  REFRESH_TOKENS_SUCCESSFULLY = 'Refresh tokens successfully',
  CREATE_NEW_CATEGORY_SUCCESSFULLY = 'Create new category successfully',
  UPDATE_CATEGORY_SUCCESSFULLY = 'Update category successfully',
  DELETE_CATEGORY_SUCCESSFULLY = 'Delete category successfully',
  GET_CATEGORY_SUCCESSFULLY = 'Get category successfully',
  GET_CATEGORIES_SUCCESSFULLY = 'Get categories successfully',
  SEARCH_CATEGORIES_SUCCESSFULLY = 'Search categories successfully'
}
