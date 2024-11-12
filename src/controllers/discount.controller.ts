import { NextFunction, Request, Response } from 'express'
import DiscountService from '@/services/discount.service'
import { CreateNewDiscountDto, UpdateDiscountDto } from '@/shared/dtos/discount.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import { ICreateNewDiscountReqBody, IUpdateDiscountReqBody, IUpdateDiscountReqParams } from '@/shared/types/discount'
import { IUserInfo } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class DiscountController {
  createNewDiscount = async (
    req: Request<any, any, ICreateNewDiscountReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const createNewDiscountDto = new CreateNewDiscountDto({
      ...req.body,
      seller: userId
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_DISCOUNT_SUCCESSFULLY,
      metadata: await DiscountService.createNewDiscount(createNewDiscountDto)
    }).send(res)
  }

  updateDiscount = async (
    req: Request<IUpdateDiscountReqParams, any, IUpdateDiscountReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { discountId } = req.params
    const updateDiscountDto = new UpdateDiscountDto({
      ...req.body,
      seller: userId
    })
    new Ok({
      message: SuccessMessages.UPDATE_DISCOUNT_SUCCESSFULLY,
      metadata: await DiscountService.updateDiscount(discountId, updateDiscountDto)
    }).send(res)
  }
}

const discountController = new DiscountController()
export default discountController
