import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import inventoryController from '@/controllers/inventory.controller'
import {
  createNewInventoryReqBody,
  deleteInventoryReqParams,
  getHighStockInventoriesReqQuery,
  getInventoriesReqQuery,
  getInventoryReqParams,
  getLowStockInventoriesReqQuery,
  searchInventoriesReqQuery,
  updateInventoryReqBody,
  updateInventoryReqParams
} from '@/shared/validators/inventory.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const inventoryRoutes = Router()

inventoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
inventoryRoutes.use(checkAuthorization(['admin', 'seller']))

inventoryRoutes.get(
  '/search',
  validateSchema(searchInventoriesReqQuery, 'query'),
  asyncHandler(inventoryController.searchInventories)
)
inventoryRoutes.get(
  '',
  validateSchema(getInventoriesReqQuery, 'query'),
  asyncHandler(inventoryController.getInventories)
)
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
inventoryRoutes.get(
  '/high-stocks/all',
  validateSchema(getHighStockInventoriesReqQuery, 'query'),
  asyncHandler(inventoryController.getHighStockInventories)
)
inventoryRoutes.get(
  '/low-stocks/all',
  validateSchema(getLowStockInventoriesReqQuery, 'query'),
  asyncHandler(inventoryController.getLowStockInventories)
)

export default inventoryRoutes
