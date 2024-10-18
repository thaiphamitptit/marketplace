import AttributeRepository from '@/repositories/attribute.repository'
import { CreateNewAttributeDto } from '@/shared/dtos/attribute.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewAttributeDto } from '@/shared/types/attribute'
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
}
