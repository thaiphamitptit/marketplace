import { IAddItemsToCartDto, ICartItem, ICreateNewCartDto } from '@/shared/types/cart'

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
