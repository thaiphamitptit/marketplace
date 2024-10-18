import AttributeRepository from '@/repositories/attribute.repository'
import { CreateNewAttributeDto, UpdateAttributeDto } from '@/shared/dtos/attribute.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewAttributeDto, IUpdateAttributeDto } from '@/shared/types/attribute'
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
}
