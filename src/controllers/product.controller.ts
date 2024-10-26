import { NextFunction, Request, Response } from 'express'
import ProductService from '@/services/product.service'
import { CreateNewProductDto, UpdateProductDto } from '@/shared/dtos/product.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewProductReqBody,
  IDeleteProductReqParams,
  IUpdateProductReqBody,
  IUpdateProductReqParams
} from '@/shared/types/product'
import { IUserInfo } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class ProductController {
  createNewProduct = async (
    req: Request<any, any, ICreateNewProductReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const createNewProductDto = new CreateNewProductDto({
      ...req.body,
      seller: userId
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.createNewProduct(createNewProductDto)
    }).send(res)
  }

  updateProduct = async (
    req: Request<IUpdateProductReqParams, any, IUpdateProductReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    const updateProductDto = new UpdateProductDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.updateProduct(productId, userId, updateProductDto)
    }).send(res)
  }

  deleteProduct = async (req: Request<IDeleteProductReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.deleteProduct(productId, userId)
    }).send(res)
  }
}

const productController = new ProductController()
export default productController
