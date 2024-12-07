import { inventoryModel } from '@/models/inventory.model'
import {
  ICreateNewInventoryDto,
  IGetInventoriesDto,
  IInventoryReservation,
  ISearchInventoriesDto,
  IUpdateInventoryDto
} from '@/shared/types/inventory'
import { getSelectData } from '@/shared/utils'

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

  static findByProductAndReservation = async (productId: string, reservation: IInventoryReservation) => {
    const { cart: cartId } = reservation
    const filter = {
      product: productId,
      reservations: {
        $elemMatch: {
          cart: cartId
        }
      }
    }
    return await inventoryModel.findOne(filter)
  }

  static findByFilterAndPagination = async (dto: IGetInventoriesDto) => {
    const {
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['product', 'location', 'stock', 'threshold']
    } = dto
    const offset = (page - 1) * limit
    const arg = {
      [sort]: order
    }
    const fields = getSelectData(select)
    const paths = [
      {
        path: 'product',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    return await inventoryModel.find(filter).skip(offset).limit(limit).sort(arg).select(fields).populate(paths)
  }

  static findByKeywordFilterAndPagination = async (dto: ISearchInventoriesDto) => {
    const {
      keyword,
      filter = {},
      page = 1,
      limit = 50,
      sort = 'updatedAt',
      order = 'desc',
      select = ['product', 'location', 'stock', 'threshold']
    } = dto
    const engine = {
      ...filter,
      $text: {
        $search: keyword
      }
    }
    const offset = (page - 1) * limit
    const arg = {
      score: {
        $meta: 'textScore'
      },
      [sort]: order
    }
    const fields = getSelectData(select)
    const paths = [
      {
        path: 'product',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    return await inventoryModel.find(engine).skip(offset).limit(limit).sort(arg).select(fields).populate(paths)
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

  static updateByModifyingStock = async (productId: string, offset: number) => {
    const filter = {
      product: productId
    }
    const update = {
      $inc: {
        stock: offset
      }
    }
    const options = {
      new: true
    }
    return await inventoryModel.findOneAndUpdate(filter, update, options)
  }

  static updateByAddingReservation = async (productId: string, reservation: IInventoryReservation) => {
    const filter = {
      product: productId
    }
    const update = {
      $addToSet: {
        reservations: reservation
      }
    }
    const options = {
      new: true
    }
    return await inventoryModel.findOneAndUpdate(filter, update, options)
  }

  static updateByModifyingReservation = async (productId: string, reservation: IInventoryReservation) => {
    const { cart: cartId, quantity } = reservation
    const filter = {
      product: productId,
      reservations: {
        $elemMatch: {
          cart: cartId
        }
      }
    }
    const update = {
      $inc: {
        'reservations.$.quantity': quantity
      }
    }
    const options = {
      new: true
    }
    return await inventoryModel.findOneAndUpdate(filter, update, options)
  }

  static updateByRemovingReservation = async (productId: string, reservation: IInventoryReservation) => {
    const { cart: cartId } = reservation
    const filter = {
      product: productId,
      reservations: {
        $elemMatch: {
          cart: cartId
        }
      }
    }
    const update = {
      $pull: {
        reservations: {
          cart: cartId
        }
      }
    }
    const options = {
      new: true
    }
    return await inventoryModel.findOneAndUpdate(filter, update, options)
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
