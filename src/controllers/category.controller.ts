import { NextFunction, Request, Response } from 'express'
import CategoryService from '@/services/category.service'
import { CreateNewCategoryDto, UpdateCategoryDto } from '@/shared/dtos/category.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import { ICreateNewCategoryReqBody, IUpdateCategoryReqBody, IUpdateCategoryReqParams } from '@/shared/types/category'
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

  updateCategory = async (
    req: Request<IUpdateCategoryReqParams, any, IUpdateCategoryReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params
    const updateCategoryDto = new UpdateCategoryDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_CATEGORY_SUCCESSFULLY,
      metadata: await CategoryService.updateCategory(categoryId, updateCategoryDto)
    }).send(res)
  }
}

const categoryController = new CategoryController()
export default categoryController
