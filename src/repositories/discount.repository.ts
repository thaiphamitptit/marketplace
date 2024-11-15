import { discountModel } from '@/models/discount.model'
import { ICreateNewDiscountDto, IGetDiscountsDto, IUpdateDiscountDto } from '@/shared/types/discount'
import { getSelectData } from '@/shared/utils'

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

  static findByFilterAndPagination = async (dto: IGetDiscountsDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['code', 'name', 'thumb', 'effectiveDate', 'expirationDate', 'value', 'maxValue']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    const paths = [
      {
        path: 'seller',
        select: ['email', 'name']
      }
    ]
    return await discountModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields).populate(paths)
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
