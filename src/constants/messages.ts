const systemMessages = {
  INVALID_REQUEST: 'Invalid request',
  NOT_ALLOWED_ACCESS_RESOURCE: 'Not allowed access resource',
  USER_ALREADY_REGISTERED: 'User already registered',
  USER_NOT_REGISTERED: 'User not registered',
  INVALID_USER: 'Invalid user',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  PLEASE_RELOGIN_BECAUSE_SOMETHING_WRONG_HAPPENED: 'Please relogin because something wrong happened',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  REGISTER_SUCCESSFULLY: 'Register successfully',
  LOGIN_SUCCESSFULLY: 'Login successfully',
  LOGOUT_SUCCESSFULLY: 'Logout successfully',
  REFRESH_TOKEN_PAIR_SUCCESSFULLY: 'Refresh token pair successfully'
} as const

export default systemMessages
