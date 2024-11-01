import { ICreateNewPricingDto, IGetPricingsDto, IPricingFilter } from '@/shared/types/pricing'

export class CreateNewPricingDto {
  product: string
  origin: number
  sale: number
  currency?: 'vnd' | 'usd'
  startDate?: Date | string
  endDate?: Date | string | null

  constructor({ product, origin, sale, currency, startDate, endDate }: ICreateNewPricingDto) {
    this.product = product
    this.origin = origin
    this.sale = sale
    this.currency = currency
    this.startDate = startDate
    this.endDate = endDate
  }
}

export class GetPricingsDto {
  filter: IPricingFilter
  page: number
  limit: number
  sort: 'origin' | 'sale' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['origin', 'sale', 'currency']
  }: IGetPricingsDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
