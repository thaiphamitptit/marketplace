import DiscountRepository from '@/repositories/discount.repository'
import ProductRepository from '@/repositories/product.repository'
import { CreateNewDiscountDto } from '@/shared/dtos/discount.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewDiscountDto } from '@/shared/types/discount'
import { ErrorMessages } from '@/shared/constants'

export default class DiscountService {
  static createNewDiscount = async (dto: ICreateNewDiscountDto) => {
    const { seller, code, type, value, appliesTo, products: productIds } = dto
    /** Check discount code exists or not */
    const discount = await DiscountRepository.findByCode(code)
    if (discount) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_DISCOUNT_CODE
      })
    }
    /** Check discount type and discount value valid or not */
    if (type == 'percentage') {
      if (value <= 0 || value >= 100) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_DISCOUNT_VALUE
        })
      }
    }
    /** Check products valid or not */
    if (appliesTo !== 'specific') {
      if (productIds?.length) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_PRODUCTS
        })
      }
    } else {
      if (!productIds?.length) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_PRODUCTS
        })
      }
      const products = await ProductRepository.findByIdsAndSellerAndStatus(productIds, seller, 'publish')
      if (productIds.length !== products.length) {
        throw new BadRequest({
          message: ErrorMessages.INVALID_PRODUCTS
        })
      }
    }
    /** Create new discount */
    const createNewDiscountDto = new CreateNewDiscountDto({
      ...dto
    })
    const newDiscount = await DiscountRepository.createNew(createNewDiscountDto)
    /** Populate discount */
    const paths = [
      {
        path: 'products',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    const populatedDiscount = await newDiscount.populate(paths)

    return {
      discount: unGetInfoData(populatedDiscount.toObject(), ['redemptions', '__v'])
    }
  }
}
