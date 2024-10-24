import Joi from 'joi'

export const createNewProductReqBody = Joi.object({
  categories: Joi.array().items(Joi.string().uuid().required()).unique().required(),
  type: Joi.string().uuid().required(),
  name: Joi.string().required(),
  thumb: Joi.string().required(),
  images: Joi.array().items(Joi.string().optional()).unique().optional(),
  description: Joi.string().optional(),
  specifications: Joi.array()
    .items(
      Joi.object({
        attribute: Joi.string().uuid().required(),
        value: Joi.any().required()
      }).required()
    )
    .unique((a, b) => a.attribute === b.attribute)
    .required(),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              images: Joi.array().items(Joi.string().optional()).unique().optional()
            })
          )
          .unique((a, b) => a.name === b.name)
          .required()
      }).optional()
    )
    .unique((a, b) => a.name === b.name)
    .optional()
})
