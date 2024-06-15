import Joi from 'joi'

export const registerJoiSchema = Joi.object({
  email: Joi.string().trim().strict().email().required()
})
