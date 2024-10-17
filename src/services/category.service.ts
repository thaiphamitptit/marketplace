import CategoryRepository from '@/repositories/category.repository'
import { CreateNewCategoryDto } from '@/shared/dtos/category.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewCategoryDto } from '@/shared/types/category'
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
}
