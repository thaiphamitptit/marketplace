import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import inventoryController from '@/controllers/inventory.controller'
import { createNewInventoryReqBody } from '@/shared/validators/inventory.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const inventoryRoutes = Router()

inventoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
inventoryRoutes.use(checkAuthorization(['admin', 'seller']))

inventoryRoutes.post(
  '',
  validateSchema(createNewInventoryReqBody, 'body'),
  asyncHandler(inventoryController.createNewInventory)
)

export default inventoryRoutes
