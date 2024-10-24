import { NextFunction, Request, Response } from 'express'
import ProductService from '@/services/product.service'
import { CreateNewProductDto } from '@/shared/dtos/product.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewProductReqBody } from '@/shared/types/product'
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
}

const productController = new ProductController()
export default productController
