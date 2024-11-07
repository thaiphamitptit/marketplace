import { inventoryModel } from '@/models/inventory.model'
import { ICreateNewInventoryDto } from '@/shared/types/inventory'

export default class InventoryRepository {
  static createNew = async (dto: ICreateNewInventoryDto) => {
    return await inventoryModel.create(dto)
  }

  static findByProduct = async (productId: string) => {
    const filter = {
      product: productId
    }
    return await inventoryModel.findOne(filter)
  }

  static deleteByProduct = async (productId: string) => {
    const filter = {
      product: productId
    }
    return await inventoryModel.deleteMany(filter)
  }
}
