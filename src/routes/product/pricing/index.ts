import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import pricingController from '@/controllers/pricing.controller'
import { createNewPricingReqBody } from '@/shared/validators/pricing.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const pricingRoutes = Router({ mergeParams: true })

pricingRoutes.post(
  '',
  validateSchema(createNewPricingReqBody, 'body'),
  asyncHandler(pricingController.createNewPricing)
)

export default pricingRoutes
