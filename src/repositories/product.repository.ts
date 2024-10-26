import { productModel } from '@/models/product.model'
import { ICreateNewProductDto, IUpdateProductDto } from '@/shared/types/product'

export default class ProductRepository {
  static createNew = async (dto: ICreateNewProductDto) => {
    return await productModel.create(dto)
  }

  static updateByIdAndSeller = async (productId: string, seller: string, dto: IUpdateProductDto) => {
    const filter = {
      _id: productId,
      seller
    }
    const update = {
      $set: dto
    }
    const options = {
      new: true
    }
    return await productModel.findOneAndUpdate(filter, update, options)
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

  static deleteByIdAndSeller = async (productId: string, seller: string) => {
    const filter = {
      _id: productId,
      seller
    }
    return await productModel.findOneAndDelete(filter)
  }

  static deleteByType = async (productTypeId: string) => {
    const filter = {
      type: productTypeId
    }
    return await productModel.deleteMany(filter)
  }
}
