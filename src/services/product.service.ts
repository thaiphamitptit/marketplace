import ProductRepository from '@/repositories/product.repository'
import CategoryRepository from '@/repositories/category.repository'
import ProductTypeRepository from '@/repositories/product-type.repository'
import { CreateNewProductDto, UpdateProductDto } from '@/shared/dtos/product.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { isMatchArrays, unGetInfoData } from '@/shared/utils'
import { ICreateNewProductDto, IUpdateProductDto } from '@/shared/types/product'
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

  static updateProduct = async (productId: string, seller: string, dto: IUpdateProductDto) => {
    const { categories: categoryIds, type: productTypeId, specifications } = dto
    /** Check categories valid or not */
    if (categoryIds) {
      const categories = await CategoryRepository.findByIds(categoryIds)
      if (categoryIds.length !== categories.length) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_CATEGORIES
        })
      }
    }
    /** Check product type and specifications coexist or not */
    if ((!productTypeId && specifications) || (productTypeId && !specifications)) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_PRODUCT_TYPE_OR_SPECIFICATIONS
      })
    }
    if (productTypeId && specifications) {
      /** Check product type exists or not */
      const productType = await ProductTypeRepository.findById(productTypeId)
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
    }
    /** Update product */
    const updateProductDto = new UpdateProductDto({
      ...dto
    })
    const updatedProduct = await ProductRepository.updateByIdAndSeller(productId, seller, updateProductDto)
    if (!updatedProduct) {
      throw new NotFound({
        message: ErrorMessages.PRODUCT_NOT_FOUND
      })
    }
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
    const populatedProduct = await updatedProduct.populate(paths)

    return {
      product: unGetInfoData(populatedProduct.toObject(), ['__v'])
    }
  }
}
