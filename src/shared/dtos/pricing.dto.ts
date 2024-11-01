import { ICreateNewPricingDto } from '@/shared/types/pricing'

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
