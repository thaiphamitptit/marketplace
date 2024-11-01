import { NextFunction, Request, Response } from 'express'
import PricingService from '@/services/pricing.service'
import { CreateNewPricingDto, GetPricingsDto } from '@/shared/dtos/pricing.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewPricingReqBody,
  ICreateNewPricingReqParams,
  IGetPricingReqParams,
  IGetPricingsReqParams,
  IGetPricingsReqQuery
} from '@/shared/types/pricing'
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

  getPricing = async (req: Request<IGetPricingReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId, pricingId } = req.params
    new Ok({
      message: SuccessMessages.GET_PRICING_SUCCESSFULLY,
      metadata: await PricingService.getPricing(userId, productId, pricingId)
    }).send(res)
  }

  getPricings = async (
    req: Request<IGetPricingsReqParams, any, any, IGetPricingsReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    const getPricingsDto = new GetPricingsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_PRICINGS_SUCCESSFULLY,
      metadata: await PricingService.getPricings(userId, productId, getPricingsDto)
    }).send(res)
  }
}

const pricingController = new PricingController()
export default pricingController
