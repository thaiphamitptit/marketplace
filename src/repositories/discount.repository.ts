import { discountModel } from '@/models/discount.model'
import { ICreateNewDiscountDto, IUpdateDiscountDto } from '@/shared/types/discount'

export default class DiscountRepository {
  static createNew = async (dto: ICreateNewDiscountDto) => {
    return await discountModel.create(dto)
  }

  static findById = async (discountId: string) => {
    return await discountModel.findById(discountId)
  }

  static findByCode = async (code: string) => {
    const filter = {
      code
    }
    return await discountModel.findOne(filter)
  }

  static updateById = async (discountId: string, dto: IUpdateDiscountDto) => {
    const update = {
      $set: dto
    }
    const options = {
      new: true
    }
    return await discountModel.findByIdAndUpdate(discountId, update, options)
  }

  static deleteById = async (discountId: string) => {
    return await discountModel.findByIdAndDelete(discountId)
  }
}
