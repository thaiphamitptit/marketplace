import { attributeModel } from '@/models/attribute.model'
import {
  ICreateNewAttributeDto,
  IGetAttributesDto,
  ISearchAttributesDto,
  IUpdateAttributeDto
} from '@/shared/types/attribute'
import { getSelectData } from '@/shared/utils'

export default class AttributeRepository {
  static createNew = async (dto: ICreateNewAttributeDto) => {
    return await attributeModel.create(dto)
  }

  static findById = async (attributeId: string) => {
    return await attributeModel.findById(attributeId)
  }

  static findByName = async (name: string) => {
    const filter = {
      name
    }
    return await attributeModel.findOne(filter)
  }

  static findByFilterAndPagination = async (dto: IGetAttributesDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'name', 'type', 'description']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    return await attributeModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static findByKeywordFilterAndPagination = async (dto: ISearchAttributesDto) => {
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
    return await attributeModel.find(engine).skip(offset).limit(limit).sort(arg).select(fields)
  }

  static updateById = async (attributeId: string, dto: IUpdateAttributeDto) => {
    const update = {
      $set: dto
    }
    const options = {
      new: true
    }
    return await attributeModel.findByIdAndUpdate(attributeId, update, options)
  }

  static deleteById = async (attributeId: string) => {
    return await attributeModel.findByIdAndDelete(attributeId)
  }
}
