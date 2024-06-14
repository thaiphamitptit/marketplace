import { NextFunction, Request, Response } from 'express'
import { ObjectSchema, ValidationError } from 'joi'
import { ValidatorError } from '~/core/error.response'
import { Location } from '~/types'

export const validate = (joiSchema: ObjectSchema, location: Location) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joiSchema.validateAsync(req[location], { abortEarly: false })
      next()
    } catch (err) {
      if (err instanceof ValidationError) {
        next(new ValidatorError({ errors: err.details }))
      }
    }
  }
}
