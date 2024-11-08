import { NextFunction, Request, Response } from 'express'
import InventoryService from '@/services/inventory.service'
import { CreateNewInventoryDto, UpdateInventoryDto } from '@/shared/dtos/inventory.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewInventoryReqBody,
  IDeleteInventoryReqParams,
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
}

const inventoryController = new InventoryController()
export default inventoryController
