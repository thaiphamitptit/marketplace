import { discountModel } from '@/models/discount.model'
import { ICreateNewDiscountDto } from '@/shared/types/discount'

export default class DiscountRepository {
  static createNew = async (dto: ICreateNewDiscountDto) => {
    return await discountModel.create(dto)
  }

  static findByCode = async (code: string) => {
    const filter = {
      code
    }
    return await discountModel.findOne(filter)
  }
}
