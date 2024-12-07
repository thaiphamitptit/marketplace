import { NextFunction, Request, Response } from 'express'
import CartService from '@/services/cart.service'
import { Ok } from '@/shared/responses/success.response'
import { AddItemsToCartDto, DeleteItemFromCartDto, UpdateItemInCartDto } from '@/shared/dtos/cart.dto'
import { IAddItemsToCartReqBody, IDeleteItemFromCartReqBody, IUpdateItemInCartReqBody } from '@/shared/types/cart'
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

  updateItemInCart = async (
    req: Request<any, any, IUpdateItemInCartReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const updateItemInCartDto = new UpdateItemInCartDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_ITEM_IN_CART_SUCCESSFULLY,
      metadata: await CartService.updateItemInCart(userId, updateItemInCartDto)
    }).send(res)
  }

  deleteItemFromCart = async (
    req: Request<any, any, IDeleteItemFromCartReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const deleteItemFromCartDto = new DeleteItemFromCartDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.DELETE_ITEM_FROM_CART_SUCCESSFULLY,
      metadata: await CartService.deleteItemFromCart(userId, deleteItemFromCartDto)
    }).send(res)
  }
}

const cartController = new CartController()
export default cartController
