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
