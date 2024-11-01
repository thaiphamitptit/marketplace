import { pricingModel } from '@/models/pricing.model'
import { ICreateNewPricingDto } from '@/shared/types/pricing'

export default class PricingRepository {
  static createNew = async (dto: ICreateNewPricingDto) => {
    return await pricingModel.create(dto)
  }

  static updateByEndDate = async (currentDate: Date | string | null) => {
    const filter = {
      endDate: null
    }
    const update = {
      endDate: currentDate
    }
    const options = {
      new: true
    }
    return await pricingModel.findOneAndUpdate(filter, update, options)
  }

  static deleteByProduct = async (productId: string) => {
    const filter = {
      product: productId
    }
    return await pricingModel.deleteMany(filter)
  }
}
