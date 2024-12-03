import { IAddItemsToCartDto, ICartItem, ICreateNewCartDto, IUpdateItemInCartDto } from '@/shared/types/cart'

export class AddItemsToCartDto {
  user: string
  items: ICartItem[]

  constructor({ user, items }: IAddItemsToCartDto) {
    this.user = user
    this.items = items
  }
}

export class CreateNewCartDto {
  user: string
  items: ICartItem[]

  constructor({ user, items = [] }: ICreateNewCartDto) {
    this.user = user
    this.items = items
  }
}

export class UpdateItemInCartDto {
  product: string
  quantity: number

  constructor({ product, quantity }: IUpdateItemInCartDto) {
    this.product = product
    this.quantity = quantity
  }
}
