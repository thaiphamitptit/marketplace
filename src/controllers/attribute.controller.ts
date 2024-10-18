import { NextFunction, Request, Response } from 'express'
import AttributeService from '@/services/attribute.service'
import {
  CreateNewAttributeDto,
  GetAttributesDto,
  SearchAttributesDto,
  UpdateAttributeDto
} from '@/shared/dtos/attribute.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewAttributeReqBody,
  IDeleteAttributeReqParams,
  IGetAttributeReqParams,
  IGetAttributesReqQuery,
  ISearchAttributesReqQuery,
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

  deleteAttribute = async (
    req: Request<IDeleteAttributeReqParams, any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { attributeId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_ATTRIBUTE_SUCCESSFULLY,
      metadata: await AttributeService.deleteAttribute(attributeId)
    }).send(res)
  }

  getAttribute = async (req: Request<IGetAttributeReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { attributeId } = req.params
    new Ok({
      message: SuccessMessages.GET_ATTRIBUTE_SUCCESSFULLY,
      metadata: await AttributeService.getAttribute(attributeId)
    }).send(res)
  }

  getAttributes = async (req: Request<any, any, any, IGetAttributesReqQuery>, res: Response, next: NextFunction) => {
    const getAttributesDto = new GetAttributesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_ATTRIBUTES_SUCCESSFULLY,
      metadata: await AttributeService.getAttributes(getAttributesDto)
    }).send(res)
  }

  searchAttributes = async (
    req: Request<any, any, any, ISearchAttributesReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const searchAttributesDto = new SearchAttributesDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.SEARCH_ATTRIBUTES_SUCCESSFULLY,
      metadata: await AttributeService.searchAttributes(searchAttributesDto)
    }).send(res)
  }
}

const attributeController = new AttributeController()
export default attributeController
