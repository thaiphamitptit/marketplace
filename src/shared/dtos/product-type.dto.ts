import { ICreateNewProductTypeDto } from '@/shared/types/product-type'

export class CreateNewProductTypeDto {
  name: string
  attributes: string[]
  thumb?: string
  description?: string

  constructor({ name, attributes, thumb, description }: ICreateNewProductTypeDto) {
    this.name = name
    this.attributes = attributes
    this.thumb = thumb
    this.description = description
  }
}
