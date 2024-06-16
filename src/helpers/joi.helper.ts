import { CustomHelpers } from 'joi'
import { Types } from 'mongoose'

export const validateObjectId = (value: string, helpers: CustomHelpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
}
