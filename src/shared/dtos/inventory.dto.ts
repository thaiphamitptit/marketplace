import { ICreateNewInventoryDto, IUpdateInventoryDto } from '@/shared/types/inventory'

export class CreateNewInventoryDto {
  product: string
  location?: string
  stock: number
  threshold?: number

  constructor({ product, location, stock, threshold }: ICreateNewInventoryDto) {
    this.product = product
    this.location = location
    this.stock = stock
    this.threshold = threshold
  }
}

export class UpdateInventoryDto {
  location?: string
  offset?: number
  threshold?: number

  constructor({ location, offset, threshold }: IUpdateInventoryDto) {
    this.location = location
    this.offset = offset
    this.threshold = threshold
  }
}
