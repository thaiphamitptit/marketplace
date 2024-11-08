import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import inventoryController from '@/controllers/inventory.controller'
import {
  createNewInventoryReqBody,
  deleteInventoryReqParams,
  getInventoryReqParams,
  updateInventoryReqBody,
  updateInventoryReqParams
} from '@/shared/validators/inventory.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const inventoryRoutes = Router()

inventoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
inventoryRoutes.use(checkAuthorization(['admin', 'seller']))

inventoryRoutes.get(
  '/:inventoryId',
  validateSchema(getInventoryReqParams, 'params'),
  asyncHandler(inventoryController.getInventory)
)
inventoryRoutes.post(
  '',
  validateSchema(createNewInventoryReqBody, 'body'),
  asyncHandler(inventoryController.createNewInventory)
)
inventoryRoutes.patch(
  '/:inventoryId',
  validateSchema(updateInventoryReqParams, 'params'),
  validateSchema(updateInventoryReqBody, 'body'),
  asyncHandler(inventoryController.updateInventory)
)
inventoryRoutes.delete(
  '/:inventoryId',
  validateSchema(deleteInventoryReqParams, 'params'),
  asyncHandler(inventoryController.deleteInventory)
)

export default inventoryRoutes
