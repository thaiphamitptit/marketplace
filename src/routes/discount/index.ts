import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import discountController from '@/controllers/discount.controller'
import { createNewDiscountReqBody } from '@/shared/validators/discount.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const discountRoutes = Router()

discountRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
discountRoutes.use(checkAuthorization(['admin', 'seller']))

discountRoutes.post(
  '',
  validateSchema(createNewDiscountReqBody, 'body'),
  asyncHandler(discountController.createNewDiscount)
)

export default discountRoutes
