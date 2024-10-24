import { ICreateNewProductDto, IProductSpecification, IProductVariant } from '@/shared/types/product'

export class CreateNewProductDto {
  seller: string
  categories: string[]
  type: string
  name: string
  thumb: string
  images?: string[]
  description?: string
  specifications: IProductSpecification[]
  variants?: IProductVariant[]

  constructor({
    seller,
    categories,
    type,
    name,
    thumb,
    images,
    description,
    specifications,
    variants
  }: ICreateNewProductDto) {
    this.seller = seller
    this.categories = categories
    this.type = type
    this.name = name
    this.thumb = thumb
    this.images = images
    this.description = description
    this.specifications = specifications
    this.variants = variants
  }
}
