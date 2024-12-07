import { Document } from 'mongoose'
import { IProductPricing } from '@/shared/types/product'

export interface ICart extends Document {
  _id: string
  user: string
  items: ICartItem[]
  status: 'active' | 'completed' | 'failed'
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICartItem {
  product: string
  quantity: number
  pricing?: IProductPricing
}

export interface IAddItemsToCartReqBody {
  items: ICartItem[]
}

export interface IAddItemsToCartDto {
  user: string
  items: ICartItem[]
}

export interface ICreateNewCartDto {
  user: string
  items?: ICartItem[]
}

export interface IUpdateItemInCartReqBody {
  product: string
  quantity: number
}

export interface IUpdateItemInCartDto {
  product: string
  quantity: number
}

export interface IDeleteItemFromCartReqBody {
  product: string
}

export interface IDeleteItemFromCartDto {
  product: string
}
