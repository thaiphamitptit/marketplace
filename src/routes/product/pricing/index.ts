import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import pricingController from '@/controllers/pricing.controller'
import { createNewPricingReqBody, getPricingReqParams } from '@/shared/validators/pricing.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const pricingRoutes = Router({ mergeParams: true })

pricingRoutes.post(
  '',
  validateSchema(createNewPricingReqBody, 'body'),
  asyncHandler(pricingController.createNewPricing)
)
pricingRoutes.get(
  '/:pricingId',
  validateSchema(getPricingReqParams, 'params'),
  asyncHandler(pricingController.getPricing)
)

export default pricingRoutes
