import { NextFunction, Request, Response } from 'express'
import InventoryService from '@/services/inventory.service'
import { CreateNewInventoryDto } from '@/shared/dtos/inventory.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewInventoryReqBody } from '@/shared/types/inventory'
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
}

const inventoryController = new InventoryController()
export default inventoryController
