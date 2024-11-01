import PricingRepository from '@/repositories/pricing.repository'
import ProductRepository from '@/repositories/product.repository'
import { CreateNewPricingDto } from '@/shared/dtos/pricing.dto'
import { UpdateProductDto } from '@/shared/dtos/product.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
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
    /** Disable current pricing */
    await PricingRepository.updateByEndDate(currentDate)
    /** Create new pricing */
    const createNewPricingDto = new CreateNewPricingDto({
      ...dto,
      startDate: currentDate,
      endDate: null
    })
    const newPricing = await PricingRepository.createNew(createNewPricingDto)
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

  static getPricing = async (seller: string, productId: string, pricingId: string) => {
    /** Check product exists or not */
    const product = await ProductRepository.findByIdAndSeller(productId, seller)
    if (!product) {
      throw new BadRequest({
        message: ErrorMessages.PRODUCT_NOT_FOUND
      })
    }
    /** Get pricing */
    const foundPricing = await PricingRepository.findByIdAndProduct(pricingId, productId)
    if (!foundPricing) {
      throw new NotFound({
        message: ErrorMessages.PRICING_NOT_FOUND
      })
    }

    return {
      pricing: unGetInfoData(foundPricing.toObject(), ['product', '__v'])
    }
  }
}
