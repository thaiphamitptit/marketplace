import ProductRepository from '@/repositories/product.repository'
import CategoryRepository from '@/repositories/category.repository'
import ProductTypeRepository from '@/repositories/product-type.repository'
import {
  CreateNewProductDto,
  GetDraftProductsDto,
  GetProductsDto,
  GetPublishProductsDto,
  SearchProductsDto,
  UpdateProductDto
} from '@/shared/dtos/product.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { isMatchArrays, unGetInfoData } from '@/shared/utils'
import {
  ICreateNewProductDto,
  IGetDraftProductsDto,
  IGetProductsDto,
  IGetPublishProductsDto,
  ISearchProductsDto,
  IUpdateProductDto
} from '@/shared/types/product'
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

  static deleteProduct = async (productId: string, seller: string) => {
    /** Delete product */
    const deletedProduct = await ProductRepository.deleteByIdAndSeller(productId, seller)
    if (!deletedProduct) {
      throw new NotFound({
        message: ErrorMessages.PRODUCT_NOT_FOUND
      })
    }

    return {
      product: productId
    }
  }

  static publishProduct = async (productId: string, seller: string) => {
    /** Publish product */
    const updatedProduct = await ProductRepository.updateByModifyingStatus(productId, seller, 'draft', 'publish')
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

  static unPublishProduct = async (productId: string, seller: string) => {
    /** Un publish product */
    const updatedProduct = await ProductRepository.updateByModifyingStatus(productId, seller, 'publish', 'draft')
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

  static getProduct = async (productId: string) => {
    /** Get product */
    const foundProduct = await ProductRepository.findByIdAndStatus(productId, 'publish')
    if (!foundProduct) {
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
    const populatedProduct = await foundProduct.populate(paths)

    return {
      product: unGetInfoData(populatedProduct.toObject(), ['status', '__v'])
    }
  }

  static getProducts = async (dto: IGetProductsDto) => {
    /** Get products combined filter and pagination */
    const getProductsDto = new GetProductsDto({
      ...dto
    })
    const { page, limit } = getProductsDto
    const foundProducts = await ProductRepository.findByFilterAndPagination(getProductsDto)

    return {
      pagination: {
        page,
        limit
      },
      products: foundProducts
    }
  }

  static searchProducts = async (dto: ISearchProductsDto) => {
    /** Search products combined filter and pagination */
    const searchProductsDto = new SearchProductsDto({
      ...dto
    })
    const { page, limit } = searchProductsDto
    const foundProducts = await ProductRepository.findByKeywordFilterAndPagination(searchProductsDto)

    return {
      pagination: {
        page,
        limit
      },
      products: foundProducts
    }
  }

  static getDraftProducts = async (seller: string, dto: IGetDraftProductsDto) => {
    /** Get draft products combined filter and pagination */
    const { filter } = dto
    const getDraftProductsDto = new GetDraftProductsDto({
      ...dto,
      filter: {
        ...filter,
        seller,
        status: 'draft'
      }
    })
    const { page, limit } = getDraftProductsDto
    const draftProducts = await ProductRepository.findByFilterAndPagination(getDraftProductsDto)

    return {
      pagination: {
        page,
        limit
      },
      products: draftProducts
    }
  }

  static getPublishProducts = async (seller: string, dto: IGetPublishProductsDto) => {
    /** Get publish products combined filter and pagination */
    const { filter } = dto
    const getPublishProductsDto = new GetPublishProductsDto({
      ...dto,
      filter: {
        ...filter,
        seller,
        status: 'publish'
      }
    })
    const { page, limit } = getPublishProductsDto
    const publishProducts = await ProductRepository.findByFilterAndPagination(getPublishProductsDto)

    return {
      pagination: {
        page,
        limit
      },
      products: publishProducts
    }
  }
}
