import { categoryModel } from '@/models/category.model'
import {
  ICreateNewCategoryDto,
  IGetCategoriesDto,
  ISearchCategoriesDto,
  IUpdateCategoryDto
} from '@/shared/types/category'
import { getSelectData } from '@/shared/utils'

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

  static findByIds = async (categoryIds: string[]) => {
    const filter = {
      _id: {
        $in: categoryIds
      }
    }
    return await categoryModel.find(filter)
  }

  static findByLeftGreaterThanAndRightLessThan = async (left: number, right: number, equals: boolean) => {
    const operators = equals ? ['$gte', '$lte'] : ['$gt', '$lt']
    const filter = {
      left: {
        [operators[0]]: left
      },
      right: {
        [operators[1]]: right
      }
    }
    return await categoryModel.find(filter)
  }

  static findByFilterAndPagination = async (dto: IGetCategoriesDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'parent', 'name', 'thumb', 'description']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    return await categoryModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static findByKeywordFilterAndPagination = async (dto: ISearchCategoriesDto) => {
    const {
      keyword,
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'parent', 'name', 'thumb', 'description']
    } = dto
    const engine = {
      ...filter,
      $text: {
        $search: keyword
      }
    }
    const offset = (page - 1) * limit
    const arg = {
      score: {
        $meta: 'textScore'
      },
      [sort]: order
    }
    const fields = getSelectData(select)
    return await categoryModel.find(engine).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static updateById = async (categoryId: string, dto: IUpdateCategoryDto) => {
    const update = {
      $set: dto
    }
    const options = {
      new: true
    }
    return await categoryModel.findByIdAndUpdate(categoryId, update, options)
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

  static updateByLeftGreaterThanAndRightLessThan = async (
    left: number,
    right: number,
    offset: number,
    equals: boolean
  ) => {
    const operators = equals ? ['$gte', '$lte'] : ['$gt', '$lt']
    const filter = {
      left: {
        [operators[0]]: left
      },
      right: {
        [operators[1]]: right
      }
    }
    const update = {
      $inc: {
        left: offset,
        right: offset
      }
    }
    return await categoryModel.updateMany(filter, update)
  }

  static deleteById = async (categoryId: string) => {
    return await categoryModel.findByIdAndDelete(categoryId)
  }

  static deleteByLeftGreaterThanAndRightLessThan = async (left: number, right: number, equals: boolean) => {
    const operators = equals ? ['$gte', '$lte'] : ['$gt', '$lt']
    const filter = {
      left: {
        [operators[0]]: left
      },
      right: {
        [operators[1]]: right
      }
    }
    return await categoryModel.deleteMany(filter)
  }
}
