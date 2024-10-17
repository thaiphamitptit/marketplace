import { NextFunction, Request, Response } from 'express'
import CategoryService from '@/services/category.service'
import { CreateNewCategoryDto } from '@/shared/dtos/category.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewCategoryReqBody } from '@/shared/types/category'
import { SuccessMessages } from '@/shared/constants'

class CategoryController {
  createNewCategory = async (
    req: Request<any, any, ICreateNewCategoryReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const createNewCategoryDto = new CreateNewCategoryDto({
      ...req.body
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_CATEGORY_SUCCESSFULLY,
      metadata: await CategoryService.createNewCategory(createNewCategoryDto)
    }).send(res)
  }
}

const categoryController = new CategoryController()
export default categoryController
