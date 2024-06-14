import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
  const errors = err.errors
  const stack = err.stack

  res.status(status).json({
    message,
    status,
    errors,
    stack
  })
}

export default errorHandler
