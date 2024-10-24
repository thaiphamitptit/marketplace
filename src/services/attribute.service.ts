import AttributeRepository from '@/repositories/attribute.repository'
import ProductTypeRepository from '@/repositories/product-type.repository'
import ProductRepository from '@/repositories/product.repository'
import {
  CreateNewAttributeDto,
  GetAttributesDto,
  SearchAttributesDto,
  UpdateAttributeDto
} from '@/shared/dtos/attribute.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import {
  ICreateNewAttributeDto,
  IGetAttributesDto,
  ISearchAttributesDto,
  IUpdateAttributeDto
} from '@/shared/types/attribute'
import { ErrorMessages } from '@/shared/constants'

export default class AttributeService {
  static createNewAttribute = async (dto: ICreateNewAttributeDto) => {
    const { name } = dto
    /** Check attribute name valid or not */
    const attribute = await AttributeRepository.findByName(name)
    if (attribute) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_ATTRIBUTE_NAME
      })
    }
    /** Create new attribute */
    const createNewAttributeDto = new CreateNewAttributeDto({
      ...dto
    })
    const newAttribute = await AttributeRepository.createNew(createNewAttributeDto)

    return {
      attribute: unGetInfoData(newAttribute.toObject(), ['__v'])
    }
  }

  static updateAttribute = async (attributeId: string, dto: IUpdateAttributeDto) => {
    const { name } = dto
    /** Check attribute name valid or not */
    if (name) {
      const attribute = await AttributeRepository.findByName(name)
      if (attribute) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_ATTRIBUTE_NAME
        })
      }
    }
    /** Update attribute */
    const updateAttributeDto = new UpdateAttributeDto({
      ...dto
    })
    const updatedAttribute = await AttributeRepository.updateById(attributeId, updateAttributeDto)
    if (!updatedAttribute) {
      throw new NotFound({
        message: ErrorMessages.ATTRIBUTE_NOT_FOUND
      })
    }

    return {
      attribute: unGetInfoData(updatedAttribute.toObject(), ['__v'])
    }
  }

  static deleteAttribute = async (attributeId: string) => {
    /** Delete attribute */
    const deletedAttribute = await AttributeRepository.deleteById(attributeId)
    if (!deletedAttribute) {
      throw new NotFound({
        message: ErrorMessages.ATTRIBUTE_NOT_FOUND
      })
    }
    /** Update ref product types */
    /** Update ref products */
    await Promise.all([
      ProductTypeRepository.updateByRemovingAttribute(attributeId),
      ProductRepository.updateByRemovingSpecificationAttribute(attributeId)
    ])

    return {
      attribute: attributeId
    }
  }

  static getAttribute = async (attributeId: string) => {
    /** Get attribute */
    const foundAttribute = await AttributeRepository.findById(attributeId)
    if (!foundAttribute) {
      throw new NotFound({
        message: ErrorMessages.ATTRIBUTE_NOT_FOUND
      })
    }

    return {
      attribute: unGetInfoData(foundAttribute.toObject(), ['__v'])
    }
  }

  static getAttributes = async (dto: IGetAttributesDto) => {
    /** Get attributes combined filter and pagination */
    const getAttributesDto = new GetAttributesDto({
      ...dto
    })
    const { page, limit } = getAttributesDto
    const foundAttributes = await AttributeRepository.findByFilterAndPagination(getAttributesDto)

    return {
      pagination: {
        page,
        limit
      },
      attributes: foundAttributes
    }
  }

  static searchAttributes = async (dto: ISearchAttributesDto) => {
    /** Search attributes combined filter and pagination */
    const searchAttributesDto = new SearchAttributesDto({
      ...dto
    })
    const { page, limit } = searchAttributesDto
    const foundAttributes = await AttributeRepository.findByKeywordFilterAndPagination(searchAttributesDto)

    return {
      pagination: {
        page,
        limit
      },
      attributes: foundAttributes
    }
  }
}
