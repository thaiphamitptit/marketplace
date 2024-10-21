import Joi from 'joi'

export const createNewProductTypeReqBody = Joi.object({
  name: Joi.string().required(),
  attributes: Joi.array().items(Joi.string().uuid().required()).unique().required(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
})
