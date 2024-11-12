import { Document } from 'mongoose'

export interface IDiscount extends Document {
  _id: string
  seller: string
  name: string
  thumb: string
  description: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number
  usageLimit: number
  usageCount: number
  appliesTo: 'all' | 'specific'
  products: string[]
  redemptions: IDiscountRedemption[]
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IDiscountRedemption {
  user: string
  cart: string
  amount: number
}

export interface ICreateNewDiscountReqBody {
  name: string
  thumb?: string
  description?: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number | null
  usageLimit: number
  appliesTo: 'all' | 'specific'
  products?: string[]
}

export interface ICreateNewDiscountDto {
  seller: string
  name: string
  thumb?: string
  description?: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number | null
  usageLimit: number
  appliesTo: 'all' | 'specific'
  products?: string[]
}
