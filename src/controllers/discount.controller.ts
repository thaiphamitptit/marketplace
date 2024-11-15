import { NextFunction, Request, Response } from 'express'
import DiscountService from '@/services/discount.service'
import {
  CreateNewDiscountDto,
  GetDiscountsDto,
  SearchDiscountsDto,
  UpdateDiscountDto
} from '@/shared/dtos/discount.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewDiscountReqBody,
  IDeleteDiscountReqParams,
  IGetDiscountReqParams,
  IGetDiscountsReqQuery,
  ISearchDiscountsReqQuery,
  IUpdateDiscountReqBody,
  IUpdateDiscountReqParams
} from '@/shared/types/discount'
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

  deleteDiscount = async (req: Request<IDeleteDiscountReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { discountId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_DISCOUNT_SUCCESSFULLY,
      metadata: await DiscountService.deleteDiscount(discountId)
    }).send(res)
  }

  getDiscount = async (req: Request<IGetDiscountReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { discountId } = req.params
    new Ok({
      message: SuccessMessages.GET_DISCOUNT_SUCCESSFULLY,
      metadata: await DiscountService.getDiscount(discountId)
    }).send(res)
  }

  getDiscounts = async (req: Request<any, any, any, IGetDiscountsReqQuery>, res: Response, next: NextFunction) => {
    const getDiscountsDto = new GetDiscountsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_DISCOUNTS_SUCCESSFULLY,
      metadata: await DiscountService.getDiscounts(getDiscountsDto)
    }).send(res)
  }

  searchDiscounts = async (
    req: Request<any, any, any, ISearchDiscountsReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const searchDiscountsDto = new SearchDiscountsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_DISCOUNTS_SUCCESSFULLY,
      metadata: await DiscountService.searchDiscounts(searchDiscountsDto)
    }).send(res)
  }
}

const discountController = new DiscountController()
export default discountController
