import { NextFunction, Request, Response } from 'express'
import ProductService from '@/services/product.service'
import {
  CreateNewProductDto,
  GetDraftProductsDto,
  GetProductsDto,
  GetPublishProductsDto,
  SearchProductsDto,
  UpdateProductDto
} from '@/shared/dtos/product.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import {
  ICreateNewProductReqBody,
  IDeleteProductReqParams,
  IGetDraftProductsReqQuery,
  IGetProductReqParams,
  IGetProductsReqQuery,
  IGetPublishProductsReqQuery,
  IPublishProductReqParams,
  IUnPublishProductReqParams,
  ISearchProductsReqQuery,
  IUpdateProductReqBody,
  IUpdateProductReqParams
} from '@/shared/types/product'
import { IUserInfo } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class ProductController {
  createNewProduct = async (
    req: Request<any, any, ICreateNewProductReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const createNewProductDto = new CreateNewProductDto({
      ...req.body,
      seller: userId
    })
    new Created({
      message: SuccessMessages.CREATE_NEW_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.createNewProduct(createNewProductDto)
    }).send(res)
  }

  updateProduct = async (
    req: Request<IUpdateProductReqParams, any, IUpdateProductReqBody, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    const updateProductDto = new UpdateProductDto({
      ...req.body
    })
    new Ok({
      message: SuccessMessages.UPDATE_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.updateProduct(productId, userId, updateProductDto)
    }).send(res)
  }

  deleteProduct = async (req: Request<IDeleteProductReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    new Ok({
      message: SuccessMessages.DELETE_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.deleteProduct(productId, userId)
    }).send(res)
  }

  publishProduct = async (req: Request<IPublishProductReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    new Ok({
      message: SuccessMessages.PUBLISH_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.publishProduct(productId, userId)
    }).send(res)
  }

  unPublishProduct = async (
    req: Request<IUnPublishProductReqParams, any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const { productId } = req.params
    new Ok({
      message: SuccessMessages.UN_PUBLISH_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.unPublishProduct(productId, userId)
    }).send(res)
  }

  getProduct = async (req: Request<IGetProductReqParams, any, any, any>, res: Response, next: NextFunction) => {
    const { productId } = req.params
    new Ok({
      message: SuccessMessages.GET_PRODUCT_SUCCESSFULLY,
      metadata: await ProductService.getProduct(productId)
    }).send(res)
  }

  getProducts = async (req: Request<any, any, any, IGetProductsReqQuery>, res: Response, next: NextFunction) => {
    const getProductsDto = new GetProductsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_PRODUCTS_SUCCESSFULLY,
      metadata: await ProductService.getProducts(getProductsDto)
    }).send(res)
  }

  searchProducts = async (req: Request<any, any, any, ISearchProductsReqQuery>, res: Response, next: NextFunction) => {
    const searchProductsDto = new SearchProductsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.SEARCH_PRODUCTS_SUCCESSFULLY,
      metadata: await ProductService.searchProducts(searchProductsDto)
    }).send(res)
  }

  getDraftProducts = async (
    req: Request<any, any, any, IGetDraftProductsReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const getDraftProductsDto = new GetDraftProductsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_DRAFT_PRODUCTS_SUCCESSFULLY,
      metadata: await ProductService.getDraftProducts(userId, getDraftProductsDto)
    }).send(res)
  }

  getPublishProducts = async (
    req: Request<any, any, any, IGetPublishProductsReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { user: userId } = req.userInfo as IUserInfo
    const getPublishProductsDto = new GetPublishProductsDto({
      ...req.query
    })
    new Ok({
      message: SuccessMessages.GET_PUBLISH_PRODUCTS_SUCCESSFULLY,
      metadata: await ProductService.getPublishProducts(userId, getPublishProductsDto)
    }).send(res)
  }
}

const productController = new ProductController()
export default productController
