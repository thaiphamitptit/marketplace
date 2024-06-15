import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

/** 200 */
export class SuccessResponse {
  message: string
  status: number
  metadata: object

  constructor({
    message,
    reason = ReasonPhrases.OK,
    status = StatusCodes.OK,
    metadata
  }: {
    message: string
    reason?: string
    status?: number
    metadata: object
  }) {
    this.message = message ? message : reason
    this.status = status
    this.metadata = metadata
  }

  send(res: Response, headers = {}) {
    res.status(this.status).json(this)
  }
}

/** 201 */
export class CreatedResponse extends SuccessResponse {
  constructor({
    message,
    reason = ReasonPhrases.CREATED,
    status = StatusCodes.CREATED,
    metadata
  }: {
    message: string
    reason?: string
    status?: number
    metadata: object
  }) {
    super({ message, reason, status, metadata })
  }
}
