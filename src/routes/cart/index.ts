import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import cartController from '@/controllers/cart.controller'
import { addItemsToCartReqBody, updateItemInCartReqBody } from '@/shared/validators/cart.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const cartRoutes = Router()

/** Check authentication */
cartRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
cartRoutes.use(checkAuthorization(['admin', 'seller', 'user']))

cartRoutes.post('', validateSchema(addItemsToCartReqBody, 'body'), asyncHandler(cartController.addItemsToCart))
cartRoutes.patch('', validateSchema(updateItemInCartReqBody, 'body'), asyncHandler(cartController.updateItemInCart))

export default cartRoutes
