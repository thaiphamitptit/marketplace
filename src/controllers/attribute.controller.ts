import { NextFunction, Request, Response } from 'express'
import AttributeService from '@/services/attribute.service'
import { CreateNewAttributeDto, UpdateAttributeDto } from '@/shared/dtos/attribute.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewAttributeReqBody,
  IUpdateAttributeReqBody,
  IUpdateAttributeReqParams
} from '@/shared/types/attribute'
import { SuccessMessages } from '@/shared/constants'

class AttributeController {
  createNewAttribute = async (
    req: Request<any, any, ICreateNewAttributeReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const createNewAttributeDto = new CreateNewAttributeDto({
      ...req.body
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_ATTRIBUTE_SUCCESSFULLY,
      metadata: await AttributeService.createNewAttribute(createNewAttributeDto)
    }).send(res)
  }

  updateAttribute = async (
    req: Request<IUpdateAttributeReqParams, any, IUpdateAttributeReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { attributeId } = req.params
    const updateAttributeDto = new UpdateAttributeDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_ATTRIBUTE_SUCCESSFULLY,
      metadata: await AttributeService.updateAttribute(attributeId, updateAttributeDto)
    }).send(res)
  }
}

const attributeController = new AttributeController()
export default attributeController
