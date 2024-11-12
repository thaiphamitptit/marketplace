import { ICreateNewDiscountDto, IUpdateDiscountDto } from '@/shared/types/discount'

export class CreateNewDiscountDto {
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

  constructor({
    seller,
    name,
    thumb,
    description,
    code,
    effectiveDate,
    expirationDate,
    type,
    value,
    maxValue,
    usageLimit,
    appliesTo,
    products
  }: ICreateNewDiscountDto) {
    this.seller = seller
    this.name = name
    this.thumb = thumb
    this.description = description
    this.code = code
    this.effectiveDate = effectiveDate
    this.expirationDate = expirationDate
    this.type = type
    this.value = value
    this.maxValue = maxValue
    this.usageLimit = usageLimit
    this.appliesTo = appliesTo
    this.products = products
  }
}

export class UpdateDiscountDto {
  seller: string
  name?: string
  thumb?: string
  description?: string
  code?: string
  effectiveDate?: Date | string
  expirationDate?: Date | string
  type?: 'fixed amount' | 'percentage'
  value?: number
  maxValue?: number | null
  usageLimit?: number
  appliesTo?: 'all' | 'specific'
  products?: string[]

  constructor({
    seller,
    name,
    thumb,
    description,
    code,
    effectiveDate,
    expirationDate,
    type,
    value,
    maxValue,
    usageLimit,
    appliesTo,
    products
  }: IUpdateDiscountDto) {
    this.seller = seller
    this.name = name
    this.thumb = thumb
    this.description = description
    this.code = code
    this.effectiveDate = effectiveDate
    this.expirationDate = expirationDate
    this.type = type
    this.value = value
    this.maxValue = maxValue
    this.usageLimit = usageLimit
    this.appliesTo = appliesTo
    this.products = products
  }
}
