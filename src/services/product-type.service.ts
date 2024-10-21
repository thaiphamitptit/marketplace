import ProductTypeRepository from '@/repositories/product-type.repository'
import AttributeRepository from '@/repositories/attribute.repository'
import { CreateNewProductTypeDto, UpdateProductTypeDto } from '@/shared/dtos/product-type.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewProductTypeDto, IUpdateProductTypeDto } from '@/shared/types/product-type'
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
}
