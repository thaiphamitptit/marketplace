import Joi from 'joi'

export const createNewCategoryReqBody = Joi.object({
  parent: Joi.string().uuid().optional().allow(null),
  name: Joi.string().required(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
})
