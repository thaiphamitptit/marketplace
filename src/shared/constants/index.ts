export enum RequestHeaders {
  API_KEY = 'x-api-key',
  USER_ID = 'x-user-id',
  ACCESS_TOKEN = 'authorization',
  REFRESH_TOKEN = 'x-refresh-token'
}

export enum ErrorMessages {
  VALIDATION_ERROR = 'Validation error',
  API_KEY_NOT_FOUND = 'Api key not found',
  NOT_ALLOW_ACCESS_RESOURCE = 'Not allow access resource',
  EMAIL_ALREADY_REGISTERED = 'Email already registered',
  EMAIL_NOT_REGISTERED = 'Email not registered',
  INVALID_CREDENTIALS = 'Invalid credentials',
  KEY_STORE_NOT_FOUND = 'Key store not found',
  INVALID_AUTH_TOKEN = 'Invalid auth token',
  AUTH_TOKEN_ALREADY_REUSED = 'Auth token already reused',
  CATEGORY_NOT_FOUND = 'Category not found',
  INVALID_PARENT_CATEGORY = 'Invalid parent category',
  INVALID_ATTRIBUTE_NAME = 'Invalid attribute name',
  ATTRIBUTE_NOT_FOUND = 'Attribute not found',
  INVALID_ATTRIBUTES = 'Invalid attributes',
  PRODUCT_TYPE_NOT_FOUND = 'Product type not found',
  INVALID_CATEGORIES = 'Invalid categories',
  INVALID_PRODUCT_TYPE = 'Invalid product type',
  INVALID_SPECIFICATIONS = 'Invalid specifications'
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
  SEARCH_CATEGORIES_SUCCESSFULLY = 'Search categories successfully',
  GET_ANCESTOR_CATEGORIES_SUCCESSFULLY = 'Get ancestor categories successfully',
  GET_DESCENDANT_CATEGORIES_SUCCESSFULLY = 'Get descendant categories successfully',
  CREATE_NEW_ATTRIBUTE_SUCCESSFULLY = 'Create new attribute successfully',
  UPDATE_ATTRIBUTE_SUCCESSFULLY = 'Update attribute successfully',
  DELETE_ATTRIBUTE_SUCCESSFULLY = 'Delete attribute successfully',
  GET_ATTRIBUTE_SUCCESSFULLY = 'Get attribute successfully',
  GET_ATTRIBUTES_SUCCESSFULLY = 'Get attributes successfully',
  SEARCH_ATTRIBUTES_SUCCESSFULLY = 'Search attributes successfully',
  CREATE_NEW_PRODUCT_TYPE_SUCCESSFULLY = 'Create new product type successfully',
  UPDATE_PRODUCT_TYPE_SUCCESSFULLY = 'Update product type successfully',
  DELETE_PRODUCT_TYPE_SUCCESSFULLY = 'Delete product type successfully',
  GET_PRODUCT_TYPE_SUCCESSFULLY = 'Get product type successfully',
  GET_PRODUCT_TYPES_SUCCESSFULLY = 'Get product types successfully',
  SEARCH_PRODUCT_TYPES_SUCCESSFULLY = 'Search product types successfully',
  CREATE_NEW_PRODUCT_SUCCESSFULLY = 'Create new product successfully'
}
