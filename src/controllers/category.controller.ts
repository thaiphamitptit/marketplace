import { NextFunction, Request, Response } from 'express'
import CategoryService from '@/services/category.service'
import {
  CreateNewCategoryDto,
  GetAncestorCategoriesDto,
  GetCategoriesDto,
  SearchCategoriesDto,
  UpdateCategoryDto
} from '@/shared/dtos/category.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewCategoryReqBody,
  IDeleteCategoryReqParams,
  IGetAncestorCategoriesReqParams,
  IGetAncestorCategoriesReqQuery,
  IGetCategoriesReqQuery,
  IGetCategoryReqParams,
  ISearchCategoriesReqQuery,
  IUpdateCategoryReqBody,
  IUpdateCategoryReqParams
} from '@/shared/types/category'
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

  deleteCategory = async (req: Request<IDeleteCategoryReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { categoryId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_CATEGORY_SUCCESSFULLY,
      metadata: await CategoryService.deleteCategory(categoryId)
    }).send(res)
  }

  getCategory = async (req: Request<IGetCategoryReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { categoryId } = req.params
    new Ok({
      message: SuccessMessages.GET_CATEGORY_SUCCESSFULLY,
      metadata: await CategoryService.getCategory(categoryId)
    }).send(res)
  }

  getCategories = async (req: Request<any, any, any, IGetCategoriesReqQuery>, res: Response, next: NextFunction) => {
    const getCategoriesDto = new GetCategoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_CATEGORIES_SUCCESSFULLY,
      metadata: await CategoryService.getCategories(getCategoriesDto)
    }).send(res)
  }

  searchCategories = async (
    req: Request<any, any, any, ISearchCategoriesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const searchCategoriesDto = new SearchCategoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.SEARCH_CATEGORIES_SUCCESSFULLY,
      metadata: await CategoryService.searchCategories(searchCategoriesDto)
    }).send(res)
  }

  getAncestorCategories = async (
    req: Request<IGetAncestorCategoriesReqParams, any, any, IGetAncestorCategoriesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params
    const getAncestorCategoriesDto = new GetAncestorCategoriesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_ANCESTOR_CATEGORIES_SUCCESSFULLY,
      metadata: await CategoryService.getAncestorCategories(categoryId, getAncestorCategoriesDto)
    }).send(res)
  }
}

const categoryController = new CategoryController()
export default categoryController
