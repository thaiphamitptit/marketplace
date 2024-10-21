import { productTypeModel } from '@/models/product-type.model'
import { ICreateNewProductTypeDto } from '@/shared/types/product-type'

export default class ProductTypeRepository {
  static createNew = async (dto: ICreateNewProductTypeDto) => {
    return await productTypeModel.create(dto)
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
}
