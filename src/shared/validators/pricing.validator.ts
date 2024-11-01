import Joi from 'joi'

export const createNewPricingReqBody = Joi.object({
  origin: Joi.number().required(),
  sale: Joi.number().required(),
  currency: Joi.string().valid('vnd', 'usd').optional()
})
