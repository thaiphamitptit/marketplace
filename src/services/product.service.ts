import ProductRepository from '@/repositories/product.repository'
import CategoryRepository from '@/repositories/category.repository'
import ProductTypeRepository from '@/repositories/product-type.repository'
import { CreateNewProductDto } from '@/shared/dtos/product.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { isMatchArrays, unGetInfoData } from '@/shared/utils'
import { ICreateNewProductDto } from '@/shared/types/product'
import { ErrorMessages } from '@/shared/constants'

export default class ProductService {
  static createNewProduct = async (dto: ICreateNewProductDto) => {
    const { categories: categoryIds, type: productTypeId, specifications } = dto
    const [categories, productType] = await Promise.all([
      CategoryRepository.findByIds(categoryIds),
      ProductTypeRepository.findById(productTypeId)
    ])
    /** Check categories valid or not */
    if (categoryIds.length !== categories.length) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_CATEGORIES
      })
    }
    /** Check product type exists or not */
    if (!productType) {
      throw new BadRequest({
        message: ErrorMessages.PRODUCT_TYPE_NOT_FOUND
      })
    }
    /** Check specifications valid or not */
    const { attributes } = productType
    const attributeIds = specifications.map((specification) => specification.attribute)
    if (!isMatchArrays(attributeIds, attributes)) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_SPECIFICATIONS
      })
    }
    /** Create new product */
    const createNewProductDto = new CreateNewProductDto({
      ...dto
    })
    const newProduct = await ProductRepository.createNew(createNewProductDto)
    /** Populate product */
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
      },
      {
        path: 'specifications.attribute',
        select: ['name', 'type']
      }
    ]
    const populatedProduct = await newProduct.populate(paths)

    return {
      product: unGetInfoData(populatedProduct.toObject(), ['__v'])
    }
  }
}
