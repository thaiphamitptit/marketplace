import { NextFunction, Request, Response } from 'express'
import AttributeService from '@/services/attribute.service'
import { CreateNewAttributeDto } from '@/shared/dtos/attribute.dto'
import { Created } from '@/shared/responses/success.response'
import { ICreateNewAttributeReqBody } from '@/shared/types/attribute'
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
}

const attributeController = new AttributeController()
export default attributeController
