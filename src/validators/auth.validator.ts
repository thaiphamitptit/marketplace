import Joi from 'joi'
import { validateObjectId } from '~/helpers/joi.helper'
import requestHeaders from '~/constants/headers'

export const authJoiSchema = Joi.object({
  [requestHeaders.CLIENT_ID]: Joi.string().trim().strict().required().custom(validateObjectId),
  [requestHeaders.REFRESHTOKEN]: Joi.string().trim().strict().optional(),
  [requestHeaders.AUTHORIZATION]: Joi.string().trim().strict().optional()
})
  .unknown(true)
  .or(requestHeaders.REFRESHTOKEN, requestHeaders.AUTHORIZATION)
