import CategoryRepository from '@/repositories/category.repository'
import ProductRepository from '@/repositories/product.repository'
import {
  CreateNewCategoryDto,
  GetAncestorCategoriesDto,
  GetCategoriesDto,
  GetDescendantCategoriesDto,
  SearchCategoriesDto,
  UpdateCategoryDto
} from '@/shared/dtos/category.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import {
  ICreateNewCategoryDto,
  IGetAncestorCategoriesDto,
  IGetCategoriesDto,
  IGetDescendantCategoriesDto,
  ISearchCategoriesDto,
  IUpdateCategoryDto
} from '@/shared/types/category'
import { ErrorMessages } from '@/shared/constants'

export default class CategoryService {
  static createNewCategory = async (dto: ICreateNewCategoryDto) => {
    const { parent: parentId } = dto
    let left = 1
    if (parentId) {
      /** Check parent category exists or not */
      const parentCategory = await CategoryRepository.findById(parentId)
      if (!parentCategory) {
        throw new BadRequest({
          message: ErrorMessages.CATEGORY_NOT_FOUND
        })
      }
      const { right: parentRight } = parentCategory
      left = parentRight
      /** Update ref categories */
      await Promise.all([
        CategoryRepository.updateByLeftGreaterThan(left, 2, false),
        CategoryRepository.updateByRightGreaterThan(left, 2, true)
      ])
    } else {
      /** Check sibling category exist or not */
      const siblingCategory = await CategoryRepository.findByOrderRight('desc')
      if (siblingCategory) {
        const { right: siblingRight } = siblingCategory
        left = siblingRight + 1
      }
    }
    /** Create new category */
    const createNewCategoryDto = new CreateNewCategoryDto({
      ...dto,
      left,
      right: left + 1
    })
    const newCategory = await CategoryRepository.createNew(createNewCategoryDto)

    return {
      category: unGetInfoData(newCategory.toObject(), ['__v'])
    }
  }

  static updateCategory = async (categoryId: string, dto: IUpdateCategoryDto) => {
    const { parent: parentId } = dto
    if (parentId) {
      const [category, parentCategory] = await Promise.all([
        CategoryRepository.findById(categoryId),
        CategoryRepository.findById(parentId)
      ])
      /** Check category exists or not */
      if (!category) {
        throw new NotFound({
          message: ErrorMessages.CATEGORY_NOT_FOUND
        })
      }
      /** Check parent category exists or not */
      if (!parentCategory) {
        throw new BadRequest({
          message: ErrorMessages.CATEGORY_NOT_FOUND
        })
      }
      const { left, right } = category
      const { left: parentLeft, right: parentRight } = parentCategory
      /** Check parent category valid or not */
      if ((parentLeft >= left && parentRight <= right) || (parentLeft < left && parentRight > right)) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_PARENT_CATEGORY
        })
      }
      /** Update ref categories */
      const direction = left > parentRight
      const offset = parentRight - left
      const width = right - left + 1
      /** Update ref categories before moving */
      await Promise.all([
        CategoryRepository.updateByLeftGreaterThan(parentRight, width, false),
        CategoryRepository.updateByRightGreaterThan(parentRight, width, true)
      ])
      /** Update ref categories being moved */
      const newLeft = direction ? left + width : left
      const newRight = direction ? right + width : right
      const newOffset = direction ? offset - width : offset
      await CategoryRepository.updateByLeftGreaterThanAndRightLessThan(newLeft, newRight, newOffset, true)
      /** Update ref categories after moving */
      await Promise.all([
        CategoryRepository.updateByLeftGreaterThan(right, -width, false),
        CategoryRepository.updateByRightGreaterThan(right, -width, false)
      ])
    }
    /** Update category */
    const updateCategoryDto = new UpdateCategoryDto({
      ...dto
    })
    const updatedCategory = await CategoryRepository.updateById(categoryId, updateCategoryDto)
    if (!updatedCategory) {
      throw new NotFound({
        message: ErrorMessages.CATEGORY_NOT_FOUND
      })
    }

    return {
      category: unGetInfoData(updatedCategory.toObject(), ['__v'])
    }
  }

  static deleteCategory = async (categoryId: string) => {
    /** Delete category */
    const deletedCategory = await CategoryRepository.deleteById(categoryId)
    if (!deletedCategory) {
      throw new NotFound({
        message: ErrorMessages.CATEGORY_NOT_FOUND
      })
    }
    const { left, right } = deletedCategory
    const width = right - left + 1
    /** Update ref products */
    const categories = await CategoryRepository.findByLeftGreaterThanAndRightLessThan(left, right, false)
    const categoryIds = [...categories.map((category) => category._id), categoryId]
    await ProductRepository.updateByRemovingCategories(categoryIds)
    /** Update ref categories */
    await Promise.all([
      CategoryRepository.deleteByLeftGreaterThanAndRightLessThan(left, right, false),
      CategoryRepository.updateByLeftGreaterThan(right, -width, false),
      CategoryRepository.updateByRightGreaterThan(right, -width, false)
    ])

    return {
      category: categoryId
    }
  }

  static getCategory = async (categoryId: string) => {
    /** Get category */
    const foundCategory = await CategoryRepository.findById(categoryId)
    if (!foundCategory) {
      throw new NotFound({
        message: ErrorMessages.CATEGORY_NOT_FOUND
      })
    }

    return {
      category: unGetInfoData(foundCategory.toObject(), ['__v'])
    }
  }

  static getCategories = async (dto: IGetCategoriesDto) => {
    /** Get categories combined filter and pagination */
    const getCategoriesDto = new GetCategoriesDto({
      ...dto
    })
    const { page, limit } = getCategoriesDto
    const foundCategories = await CategoryRepository.findByFilterAndPagination(getCategoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      categories: foundCategories
    }
  }

  static searchCategories = async (dto: ISearchCategoriesDto) => {
    /** Search categories combined filter and pagination */
    const searchCategoriesDto = new SearchCategoriesDto({
      ...dto
    })
    const { page, limit } = searchCategoriesDto
    const foundCategories = await CategoryRepository.findByKeywordFilterAndPagination(searchCategoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      categories: foundCategories
    }
  }

  static getAncestorCategories = async (categoryId: string, dto: IGetAncestorCategoriesDto) => {
    /** Check category exists or not */
    const category = await CategoryRepository.findById(categoryId)
    if (!category) {
      throw new NotFound({
        message: ErrorMessages.CATEGORY_NOT_FOUND
      })
    }
    const { left, right } = category
    const { filter } = dto
    /** Get ancestor categories combined filter and pagination */
    const getAncestorCategoriesDto = new GetAncestorCategoriesDto({
      ...dto,
      filter: {
        ...filter,
        left: {
          $lt: left
        },
        right: {
          $gt: right
        }
      }
    })
    const { page, limit } = getAncestorCategoriesDto
    const ancestorCategories = await CategoryRepository.findByFilterAndPagination(getAncestorCategoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      categories: ancestorCategories
    }
  }

  static getDescendantCategories = async (categoryId: string, dto: IGetDescendantCategoriesDto) => {
    /** Check category exists or not */
    const category = await CategoryRepository.findById(categoryId)
    if (!category) {
      throw new NotFound({
        message: ErrorMessages.CATEGORY_NOT_FOUND
      })
    }
    const { left, right } = category
    const { filter } = dto
    /** Get descendant categories combined filter and pagination */
    const getDescendantCategoriesDto = new GetDescendantCategoriesDto({
      ...dto,
      filter: {
        ...filter,
        left: {
          $gt: left
        },
        right: {
          $lt: right
        }
      }
    })
    const { page, limit } = getDescendantCategoriesDto
    const ancestorCategories = await CategoryRepository.findByFilterAndPagination(getDescendantCategoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      categories: ancestorCategories
    }
  }
}
