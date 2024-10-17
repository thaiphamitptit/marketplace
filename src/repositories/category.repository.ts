import { categoryModel } from '@/models/category.model'
import { ICreateNewCategoryDto } from '@/shared/types/category'

export default class CategoryRepository {
  static createNew = async (dto: ICreateNewCategoryDto) => {
    return await categoryModel.create(dto)
  }

  static findById = async (categoryId: string) => {
    return await categoryModel.findById(categoryId)
  }

  static findByOrderLeft = async (order: 'asc' | 'desc') => {
    const filter = {}
    const arg = {
      left: order
    }
    return await categoryModel.findOne(filter).sort(arg)
  }

  static findByOrderRight = async (order: 'asc' | 'desc') => {
    const filter = {}
    const arg = {
      right: order
    }
    return await categoryModel.findOne(filter).sort(arg)
  }

  static updateByLeftGreaterThan = async (left: number, offset: number, equals: boolean) => {
    const operator = equals ? '$gte' : '$gt'
    const filter = {
      left: {
        [operator]: left
      }
    }
    const update = {
      $inc: {
        left: offset
      }
    }
    return await categoryModel.updateMany(filter, update)
  }

  static updateByRightGreaterThan = async (right: number, offset: number, equals: boolean) => {
    const operator = equals ? '$gte' : '$gt'
    const filter = {
      right: {
        [operator]: right
      }
    }
    const update = {
      $inc: {
        right: offset
      }
    }
    return await categoryModel.updateMany(filter, update)
  }
}
