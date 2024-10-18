import { attributeModel } from '@/models/attribute.model'
import { ICreateNewAttributeDto, IUpdateAttributeDto } from '@/shared/types/attribute'

export default class AttributeRepository {
  static createNew = async (dto: ICreateNewAttributeDto) => {
    return await attributeModel.create(dto)
  }

  static findByName = async (name: string) => {
    const filter = {
      name
    }
    return await attributeModel.findOne(filter)
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
}
