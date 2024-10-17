import CategoryRepository from '@/repositories/category.repository'
import { CreateNewCategoryDto, UpdateCategoryDto } from '@/shared/dtos/category.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewCategoryDto, IUpdateCategoryDto } from '@/shared/types/category'
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
}
