import { productModel } from '@/models/product.model'
import { ICreateNewProductDto } from '@/shared/types/product'

export default class ProductRepository {
  static createNew = async (dto: ICreateNewProductDto) => {
    return await productModel.create(dto)
  }

  static updateByRemovingCategories = async (categoryIds: string[]) => {
    const filter = {
      categories: {
        $in: categoryIds
      }
    }
    const update = {
      $pull: {
        categories: {
          $in: categoryIds
        }
      }
    }
    return await productModel.updateMany(filter, update)
  }

  static updateByRemovingSpecificationAttribute = async (attributeId: string) => {
    const filter = {
      specifications: {
        $elemMatch: {
          attribute: attributeId
        }
      }
    }
    const update = {
      $pull: {
        specifications: {
          attribute: attributeId
        }
      }
    }
    return await productModel.updateMany(filter, update)
  }

  static deleteByType = async (productTypeId: string) => {
    const filter = {
      type: productTypeId
    }
    return await productModel.deleteMany(filter)
  }
}
