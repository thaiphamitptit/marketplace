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
}
