import { NextFunction, Request, Response } from 'express'
import InventoryService from '@/services/inventory.service'
import {
  CreateNewInventoryDto,
  GetInventoriesDto,
  SearchInventoriesDto,
  UpdateInventoryDto
} from '@/shared/dtos/inventory.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewInventoryReqBody,
  IDeleteInventoryReqParams,
  IGetInventoriesReqQuery,
  IGetInventoryReqParams,
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
}

const inventoryController = new InventoryController()
export default inventoryController
