import PricingRepository from '@/repositories/pricing.repository'
import ProductRepository from '@/repositories/product.repository'
import { CreateNewPricingDto } from '@/shared/dtos/pricing.dto'
import { UpdateProductDto } from '@/shared/dtos/product.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewPricingDto } from '@/shared/types/pricing'
import { ErrorMessages } from '@/shared/constants'

export default class PricingService {
  static createNewPricing = async (seller: string, dto: ICreateNewPricingDto) => {
    const { product: productId, origin, sale, currency } = dto
    /** Check product exists or not */
    const product = await ProductRepository.findByIdAndSeller(productId, seller)
    if (!product) {
      throw new BadRequest({
        message: ErrorMessages.PRODUCT_NOT_FOUND
      })
    }
    const currentDate = new Date()
    /** Create new pricing and disable current pricing */
    const createNewPricingDto = new CreateNewPricingDto({
      ...dto,
      startDate: currentDate,
      endDate: null
    })
    const [newPricing] = await Promise.all([
      PricingRepository.createNew(createNewPricingDto),
      PricingRepository.updateByEndDate(currentDate)
    ])
    /** Update ref product */
    const updateProductDto = new UpdateProductDto({
      pricing: {
        origin,
        sale,
        currency
      }
    })
    await ProductRepository.updateByIdAndSeller(productId, seller, updateProductDto)

    return {
      pricing: unGetInfoData(newPricing.toObject(), ['product', '__v'])
    }
  }
}
