import { NextFunction, Request, Response } from 'express'
import DiscountService from '@/services/discount.service'
import { CreateNewDiscountDto } from '@/shared/dtos/discount.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewDiscountReqBody } from '@/shared/types/discount'
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
}

const discountController = new DiscountController()
export default discountController
