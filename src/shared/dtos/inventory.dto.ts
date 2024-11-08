import {
  ICreateNewInventoryDto,
  IGetInventoriesDto,
  IInventoryFilter,
  IUpdateInventoryDto
} from '@/shared/types/inventory'

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

export class GetInventoriesDto {
  filter: IInventoryFilter
  page: number
  limit: number
  sort: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['product', 'location', 'stock', 'threshold']
  }: IGetInventoriesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}