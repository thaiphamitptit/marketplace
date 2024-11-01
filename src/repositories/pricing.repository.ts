import { pricingModel } from '@/models/pricing.model'
import { ICreateNewPricingDto, IGetPricingsDto } from '@/shared/types/pricing'
import { getSelectData } from '@/shared/utils'

export default class PricingRepository {
  static createNew = async (dto: ICreateNewPricingDto) => {
    return await pricingModel.create(dto)
  }

  static findByIdAndProduct = async (pricingId: string, productId: string) => {
    const filter = {
      _id: pricingId,
      productId
    }
    return await pricingModel.findOne(filter)
  }

  static findByFilterAndPagination = async (dto: IGetPricingsDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['origin', 'sale', 'currency']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    return await pricingModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields)
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
