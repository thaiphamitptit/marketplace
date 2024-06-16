import { ReasonPhrases, StatusCodes } from 'http-status-codes'

/** 500 */
export class ErrorResponse extends Error {
  status: number

  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR as string,
    status = StatusCodes.INTERNAL_SERVER_ERROR as number
  ) {
    super(message)
    this.status = status
  }
}

/** 400 */
export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST as string, status = StatusCodes.BAD_REQUEST as number) {
    super(message, status)
  }
}

/** 401 */
export class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED as string, status = StatusCodes.UNAUTHORIZED as number) {
    super(message, status)
  }
}

/** 403 */
export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN as string, status = StatusCodes.FORBIDDEN as number) {
    super(message, status)
  }
}

/** 422 */
export class ValidatorError extends ErrorResponse {
  errors: object

  constructor({
    errors,
    message = ReasonPhrases.UNPROCESSABLE_ENTITY,
    status = StatusCodes.UNPROCESSABLE_ENTITY
  }: {
    errors: object
    message?: string
    status?: number
  }) {
    super(message, status)
    this.errors = errors
  }
}
