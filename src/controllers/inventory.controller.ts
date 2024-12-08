import { NextFunction, Request, Response } from 'express'
import InventoryService from '@/services/inventory.service'
import {
  CreateNewInventoryDto,
  GetHighStockInventoriesDto,
  GetInventoriesDto,
  GetLowStockInventoriesDto,
  SearchInventoriesDto,
  UpdateInventoryDto
} from '@/shared/dtos/inventory.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewInventoryReqBody,
  IDeleteInventoryReqParams,
  IGetHighStockInventoriesReqQuery,
  IGetInventoriesReqQuery,
  IGetInventoryReqParams,
  IGetLowStockInventoriesReqQuery,
  ISearchInventoriesReqQuery,
  IUpdateInventoryReqBody,
  IUpdateInventoryReqParams
} from '@/shared/types/inventory'
import { SuccessMessages } from '@/shared/constants'

class InventoryController {
  createNewInventory = async (
    req: Request<any, any, ICreateNewInventoryReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const createNewInventoryDto = new CreateNewInventoryDto({
      ...req.body
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_INVENTORY_SUCCESSFULLY,
      metadata: await InventoryService.createNewInventory(createNewInventoryDto)
    }).send(res)
  }

  updateInventory = async (
    req: Request<IUpdateInventoryReqParams, any, IUpdateInventoryReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { inventoryId } = req.params
    const updateInventoryDto = new UpdateInventoryDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_INVENTORY_SUCCESSFULLY,
      metadata: await InventoryService.updateInventory(inventoryId, updateInventoryDto)
    }).send(res)
  }

  deleteInventory = async (
    req: Request<IDeleteInventoryReqParams, any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { inventoryId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_INVENTORY_SUCCESSFULLY,
      metadata: await InventoryService.deleteInventory(inventoryId)
    }).send(res)
  }

  getInventory = async (req: Request<IGetInventoryReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { inventoryId } = req.params
    new Ok({
      message: SuccessMessages.GET_INVENTORY_SUCCESSFULLY,
      metadata: await InventoryService.getInventory(inventoryId)
    }).send(res)
  }

  getInventories = async (req: Request<any, any, any, IGetInventoriesReqQuery>, res: Response, next: NextFunction) => {
    const getInventoriesDto = new GetInventoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_INVENTORIES_SUCCESSFULLY,
      metadata: await InventoryService.getInventories(getInventoriesDto)
    }).send(res)
  }

  searchInventories = async (
    req: Request<any, any, any, ISearchInventoriesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const searchInventoriesDto = new SearchInventoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_INVENTORIES_SUCCESSFULLY,
      metadata: await InventoryService.searchInventories(searchInventoriesDto)
    }).send(res)
  }

  getHighStockInventories = async (
    req: Request<any, any, any, IGetHighStockInventoriesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const getHighStockInventoriesDto = new GetHighStockInventoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_HIGH_STOCK_INVENTORIES_SUCCESSFULLY,
      metadata: await InventoryService.getHighStockInventories(getHighStockInventoriesDto)
    }).send(res)
  }

  getLowStockInventories = async (
    req: Request<any, any, any, IGetLowStockInventoriesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const getLowStockInventoriesDto = new GetLowStockInventoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_LOW_STOCK_INVENTORIES_SUCCESSFULLY,
      metadata: await InventoryService.getLowStockInventories(getLowStockInventoriesDto)
    }).send(res)
  }
}

const inventoryController = new InventoryController()
export default inventoryController
