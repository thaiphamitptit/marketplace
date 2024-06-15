import Joi from 'joi'
import requestHeaders from '~/constants/headers'

export const apiKeyJoiSchema = Joi.object({
  [requestHeaders.API_KEY]: Joi.string().trim().strict().required()
}).unknown(true)
