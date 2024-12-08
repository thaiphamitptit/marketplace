import { productModel } from '@/models/product.model'
import { ICreateNewProductDto, IGetProductsDto, ISearchProductsDto, IUpdateProductDto } from '@/shared/types/product'
import { getSelectData } from '@/shared/utils'

export default class ProductRepository {
  static createNew = async (dto: ICreateNewProductDto) => {
    return await productModel.create(dto)
  }

  static findByIdAndStatus = async (productId: string, status: 'draft' | 'publish') => {
    const filter = {
      _id: productId,
      status
    }
    return await productModel.findOne(filter)
  }

  static findByIdAndSeller = async (productId: string, seller: string) => {
    const filter = {
      _id: productId,
      seller
    }
    return await productModel.findOne(filter)
  }

  static findByIdsAndStatus = async (productIds: string[], status: 'draft' | 'publish') => {
    const filter = {
      _id: {
        $in: productIds
      },
      status
    }
    return await productModel.find(filter)
  }

  static findByIdsAndSellerAndStatus = async (productIds: string[], seller: string, status: 'draft' | 'publish') => {
    const filter = {
      _id: {
        $in: productIds
      },
      seller,
      status
    }
    return await productModel.find(filter)
  }

  static findByFilterAndPagination = async (dto: IGetProductsDto) => {
    const {
      filter = {
        status: 'publish'
      },
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    const paths = [
      {
        path: 'seller',
        select: ['email']
      },
      {
        path: 'categories',
        select: ['parent', 'name']
      },
      {
        path: 'type',
        select: ['name']
      }
    ]
    return await productModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields).populate(paths)
  }

  static findByKeywordFilterAndPagination = async (dto: ISearchProductsDto) => {
    const {
      keyword,
      filter = {
        status: 'publish'
      },
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
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
    const paths = [
      {
        path: 'seller',
        select: ['email']
      },
      {
        path: 'categories',
        select: ['parent', 'name']
      },
      {
        path: 'type',
        select: ['name']
      }
    ]
    return await productModel.find(engine).skip(offset).limit(limit).sort(arg).select(fields).populate(paths)
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

  static updateByModifyingStock = async (productId: string, offset: number) => {
    const filter = {
      _id: productId
    }
    const update = {
      $inc: {
        stock: offset
      }
    }
    const options = {
      new: true
    }
    return await productModel.findOneAndUpdate(filter, update, options)
  }

  static updateByModifyingStatus = async (
    productId: string,
    seller: string,
    status: 'draft' | 'publish',
    newStatus: 'draft' | 'publish'
  ) => {
    const filter = {
      _id: productId,
      seller,
      status
    }
    const update = {
      $set: {
        status: newStatus
      }
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
