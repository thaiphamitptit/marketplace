import ProductTypeRepository from '@/repositories/product-type.repository'
import AttributeRepository from '@/repositories/attribute.repository'
import ProductRepository from '@/repositories/product.repository'
import {
  CreateNewProductTypeDto,
  GetProductTypesDto,
  SearchProductTypesDto,
  UpdateProductTypeDto
} from '@/shared/dtos/product-type.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import {
  ICreateNewProductTypeDto,
  IGetProductTypesDto,
  ISearchProductTypesDto,
  IUpdateProductTypeDto
} from '@/shared/types/product-type'
import { ErrorMessages } from '@/shared/constants'

export default class ProductTypeService {
  static createNewProductType = async (dto: ICreateNewProductTypeDto) => {
    const { attributes: attributeIds } = dto
    /** Check attributes valid or not */
    const attributes = await AttributeRepository.findByIds(attributeIds)
    if (attributeIds.length !== attributes.length) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_ATTRIBUTES
      })
    }
    /** Create new product type */
    const createNewProductTypeDto = new CreateNewProductTypeDto({
      ...dto
    })
    const newProductType = await ProductTypeRepository.createNew(createNewProductTypeDto)
    /** Populate product type */
    const paths = [
      {
        path: 'attributes',
        select: ['name', 'type']
      }
    ]
    const populatedProductType = await newProductType.populate(paths)

    return {
      productType: unGetInfoData(populatedProductType.toObject(), ['__v'])
    }
  }

  static updateProductType = async (productTypeId: string, dto: IUpdateProductTypeDto) => {
    const { attributes: attributeIds } = dto
    /** Check attributes valid or not */
    if (attributeIds) {
      const attributes = await AttributeRepository.findByIds(attributeIds)
      if (attributeIds.length !== attributes.length) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_ATTRIBUTES
        })
      }
    }
    /** Update product type */
    const updateProductTypeDto = new UpdateProductTypeDto({
      ...dto
    })
    const updatedProductType = await ProductTypeRepository.updateById(productTypeId, updateProductTypeDto)
    if (!updatedProductType) {
      throw new NotFound({
        message: ErrorMessages.PRODUCT_TYPE_NOT_FOUND
      })
    }
    /** Populate product type */
    const paths = [
      {
        path: 'attributes',
        select: ['name', 'type']
      }
    ]
    const populatedProductType = await updatedProductType.populate(paths)

    return {
      productType: unGetInfoData(populatedProductType.toObject(), ['__v'])
    }
  }

  static deleteProductType = async (productTypeId: string) => {
    /** Delete product type */
    const deletedProductType = await ProductTypeRepository.deleteById(productTypeId)
    if (!deletedProductType) {
      throw new NotFound({
        message: ErrorMessages.PRODUCT_TYPE_NOT_FOUND
      })
    }
    /** Delete ref products */
    await ProductRepository.deleteByType(productTypeId)

    return {
      productType: productTypeId
    }
  }

  static getProductType = async (productTypeId: string) => {
    /** Get product type */
    const foundProductType = await ProductTypeRepository.findById(productTypeId)
    if (!foundProductType) {
      throw new NotFound({
        message: ErrorMessages.PRODUCT_TYPE_NOT_FOUND
      })
    }
    /** Populate product type */
    const paths = [
      {
        path: 'attributes',
        select: ['name', 'type']
      }
    ]
    const populatedProductType = await foundProductType.populate(paths)

    return {
      productType: unGetInfoData(populatedProductType.toObject(), ['__v'])
    }
  }

  static getProductTypes = async (dto: IGetProductTypesDto) => {
    /** Get product types combined filter and pagination */
    const getProductTypesDto = new GetProductTypesDto({
      ...dto
    })
    const { page, limit } = getProductTypesDto
    const foundProductTypes = await ProductTypeRepository.findByFilterAndPagination(getProductTypesDto)

    return {
      pagination: {
        page,
        limit
      },
      productTypes: foundProductTypes
    }
  }

  static searchProductTypes = async (dto: ISearchProductTypesDto) => {
    /** Search product types combined filter and pagination */
    const searchProductTypeDto = new SearchProductTypesDto({
      ...dto
    })
    const { page, limit } = searchProductTypeDto
    const foundProductTypes = await ProductTypeRepository.findByKeywordFilterAndPagination(searchProductTypeDto)

    return {
      pagination: {
        page,
        limit
      },
      productTypes: foundProductTypes
    }
  }
}
