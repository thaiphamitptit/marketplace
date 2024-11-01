import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

export interface IPricing extends Document {
  _id: string
  product: string
  origin: number
  sale: number
  currency: 'vnd' | 'usd'
  startDate: Date | string
  endDate: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewPricingReqBody {
  origin: number
  sale: number
  currency?: 'vnd' | 'usd'
}

export interface ICreateNewPricingReqParams extends ParamsDictionary {
  productId: string
}

export interface ICreateNewPricingDto {
  product: string
  origin: number
  sale: number
  currency?: 'vnd' | 'usd'
  startDate?: Date | string
  endDate?: Date | string | null
}
