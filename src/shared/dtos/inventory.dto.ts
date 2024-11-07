import { ICreateNewInventoryDto } from '@/shared/types/inventory'

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
