import { NextFunction, Request, Response } from 'express'
import CartService from '@/services/cart.service'
import { Ok } from '@/shared/responses/success.response'
import { AddItemsToCartDto } from '@/shared/dtos/cart.dto'
import { IAddItemsToCartReqBody } from '@/shared/types/cart'
import { IUserInfo } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class CartController {
  addItemsToCart = async (req: Request<any, any, IAddItemsToCartReqBody, any>, res: Response, next: NextFunction) => {
    const { user: userId } = req.userInfo as IUserInfo
    const addItemsToCartDto = new AddItemsToCartDto({
      ...req.body,
      user: userId
    })
    new Ok({
      message: SuccessMessages.ADD_ITEMS_TO_CART_SUCCESSFULLY,
      metadata: await CartService.addItemsToCart(addItemsToCartDto)
    }).send(res)
  }
}

const cartController = new CartController()
export default cartController
