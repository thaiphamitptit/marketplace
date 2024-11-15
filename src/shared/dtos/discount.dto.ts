import { ICreateNewDiscountDto, IDiscountFilter, IGetDiscountsDto, IUpdateDiscountDto } from '@/shared/types/discount'

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

export class GetDiscountsDto {
  filter: IDiscountFilter
  page: number
  limit: number
  sort: 'name' | 'value' | 'effectiveDate' | 'expirationDate' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['code', 'name', 'thumb', 'effectiveDate', 'expirationDate', 'value', 'maxValue']
  }: IGetDiscountsDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
