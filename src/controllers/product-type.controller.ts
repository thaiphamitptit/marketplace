import { NextFunction, Request, Response } from 'express'
import ProductTypeService from '@/services/product-type.service'
import { CreateNewProductTypeDto } from '@/shared/dtos/product-type.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewProductTypeReqBody } from '@/shared/types/product-type'
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
}

const productTypeController = new ProductTypeController()
export default productTypeController
