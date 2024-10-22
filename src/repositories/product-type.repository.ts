import { productTypeModel } from '@/models/product-type.model'
import { ICreateNewProductTypeDto, IUpdateProductTypeDto } from '@/shared/types/product-type'

export default class ProductTypeRepository {
  static createNew = async (dto: ICreateNewProductTypeDto) => {
    return await productTypeModel.create(dto)
  }

  static findById = async (productTypeId: string) => {
    return await productTypeModel.findById(productTypeId)
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
