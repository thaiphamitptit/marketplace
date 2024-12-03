import Joi from 'joi'

export const addItemsToCartReqBody = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().uuid().required(),
        quantity: Joi.number().integer().required()
      }).required()
    )
    .unique((a, b) => a.product === b.product)
    .required()
})

export const updateItemInCartReqBody = Joi.object({
  product: Joi.string().uuid().required(),
  quantity: Joi.number().integer().required()
})
