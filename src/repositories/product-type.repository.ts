import { productTypeModel } from '@/models/product-type.model'
import {
  ICreateNewProductTypeDto,
  IGetProductTypesDto,
  ISearchProductTypesDto,
  IUpdateProductTypeDto
} from '@/shared/types/product-type'
import { getSelectData } from '@/shared/utils'

export default class ProductTypeRepository {
  static createNew = async (dto: ICreateNewProductTypeDto) => {
    return await productTypeModel.create(dto)
  }

  static findById = async (productTypeId: string) => {
    return await productTypeModel.findById(productTypeId)
  }

  static findByFilterAndPagination = async (dto: IGetProductTypesDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'name', 'thumb', 'description']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    return await productTypeModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static findByKeywordFilterAndPagination = async (dto: ISearchProductTypesDto) => {
    const {
      keyword,
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'name', 'type', 'description']
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
    return await productTypeModel.find(engine).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static updateById = async (productTypeId: string, dto: IUpdateProductTypeDto) => {
    const update = {
      $set: dto
    }
    const options = {
      new: true
    }
    return await productTypeModel.findByIdAndUpdate(productTypeId, update, options)
  }

  static updateByRemovingAttribute = async (attributeId: string) => {
    const filter = {
      attributes: attributeId
    }
    const update = {
      $pull: {
        attributes: attributeId
      }
    }
    return await productTypeModel.updateMany(filter, update)
  }

  static deleteById = async (productTypeId: string) => {
    return await productTypeModel.findByIdAndDelete(productTypeId)
  }
}
