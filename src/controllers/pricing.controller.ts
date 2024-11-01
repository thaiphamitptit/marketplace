import { NextFunction, Request, Response } from 'express'
import PricingService from '@/services/pricing.service'
import { CreateNewPricingDto } from '@/shared/dtos/pricing.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewPricingReqBody, ICreateNewPricingReqParams } from '@/shared/types/pricing'
import { IUserInfo } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class PricingController {
  createNewPricing = async (
    req: Request<ICreateNewPricingReqParams, any, ICreateNewPricingReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    const createNewPricingDto = new CreateNewPricingDto({
      ...req.body,
      product: productId
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_PRICING_SUCCESSFULLY,
      metadata: await PricingService.createNewPricing(userId, createNewPricingDto)
    }).send(res)
  }
}

const pricingController = new PricingController()
export default pricingController
