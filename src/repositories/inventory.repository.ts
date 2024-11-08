import { inventoryModel } from '@/models/inventory.model'
import { ICreateNewInventoryDto, IUpdateInventoryDto } from '@/shared/types/inventory'

export default class InventoryRepository {
  static createNew = async (dto: ICreateNewInventoryDto) => {
    return await inventoryModel.create(dto)
  }

  static findById = async (inventoryId: string) => {
    return await inventoryModel.findById(inventoryId)
  }

  static findByProduct = async (productId: string) => {
    const filter = {
      product: productId
    }
    return await inventoryModel.findOne(filter)
  }

  static updateById = async (inventoryId: string, dto: IUpdateInventoryDto) => {
    const { offset, ...args } = dto
    const update = {
      $set: args,
      $inc: {
        stock: offset
      }
    }
    const options = {
      new: true
    }
    return await inventoryModel.findByIdAndUpdate(inventoryId, update, options)
  }

  static deleteById = async (inventoryId: string) => {
    return await inventoryModel.findByIdAndDelete(inventoryId)
  }

  static deleteByProduct = async (productId: string) => {
    const filter = {
      product: productId
    }
    return await inventoryModel.deleteMany(filter)
  }
}
