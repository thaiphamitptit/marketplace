import { NextFunction, Request, Response } from 'express'
import ProductTypeService from '@/services/product-type.service'
import { CreateNewProductTypeDto, UpdateProductTypeDto } from '@/shared/dtos/product-type.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewProductTypeReqBody,
  IUpdateProductTypeReqBody,
  IUpdateProductTypeReqParams
} from '@/shared/types/product-type'
import { SuccessMessages } from '@/shared/constants'

class ProductTypeController {
  createNewProductType = async (
    req: Request<any, any, ICreateNewProductTypeReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const createNewProductTypeDto = new CreateNewProductTypeDto({
      ...req.body
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_PRODUCT_TYPE_SUCCESSFULLY,
      metadata: await ProductTypeService.createNewProductType(createNewProductTypeDto)
    }).send(res)
  }

  updateProductType = async (
    req: Request<IUpdateProductTypeReqParams, any, IUpdateProductTypeReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { productTypeId } = req.params
    const updateProductTypeDto = new UpdateProductTypeDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_PRODUCT_TYPE_SUCCESSFULLY,
      metadata: await ProductTypeService.updateProductType(productTypeId, updateProductTypeDto)
    }).send(res)
  }
}

const productTypeController = new ProductTypeController()
export default productTypeController