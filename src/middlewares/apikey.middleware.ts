import { NextFunction, Request, Response } from 'express'
import { BadRequestError, ForbiddenError } from '~/core/error.response'
import ApiKeyService from '~/services/apikey.service'
import systemMessages from '~/constants/messages'
import requestHeaders from '~/constants/headers'

/** Check apikey in proxy server */
export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[requestHeaders.API_KEY]?.toString()
    if (!key) {
      throw new BadRequestError(systemMessages.INVALID_REQUEST)
    }
    const apiKey = await ApiKeyService.findApiKeyByKey({ key })
    if (!apiKey) {
      throw new BadRequestError(systemMessages.INVALID_REQUEST)
    }
    req.apiKey = apiKey
    next()
  } catch (err) {
    next(err)
  }
}

/** Check permissions in apikey */
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.apiKey?.permissions) {
        throw new ForbiddenError(systemMessages.NOT_ALLOWED_ACCESS_RESOURCE)
      }
      if (!req.apiKey?.permissions.includes(permission)) {
        throw new ForbiddenError(systemMessages.NOT_ALLOWED_ACCESS_RESOURCE)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
