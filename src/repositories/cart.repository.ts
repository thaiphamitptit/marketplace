import { cartModel } from '@/models/cart.model'
import { ICartItem, ICreateNewCartDto } from '@/shared/types/cart'

export default class CartRepository {
  static createNew = async (dto: ICreateNewCartDto) => {
    const { user: userId, items } = dto
    const filter = {
      user: userId,
      status: 'active'
    }
    const update = {
      $addToSet: {
        items: {
          $each: items
        }
      }
    }
    const options = {
      upsert: true,
      new: true
    }
    return await cartModel.findOneAndUpdate(filter, update, options)
  }

  static findByUserAndStatus = async (userId: string, status: 'active' | 'completed' | 'failed' | 'pending') => {
    const filter = {
      user: userId,
      status
    }
    return await cartModel.findOne(filter)
  }

  static findByUserAndItemProduct = async (userId: string, productId: string) => {
    const filter = {
      user: userId,
      items: {
        $elemMatch: {
          product: productId
        }
      },
      status: 'active'
    }
    return await cartModel.findOne(filter)
  }

  static updateByAddingItem = async (userId: string, item: ICartItem) => {
    const filter = {
      user: userId,
      status: 'active'
    }
    const update = {
      $push: {
        items: item
      }
    }
    const options = {
      new: true
    }
    return await cartModel.findOneAndUpdate(filter, update, options)
  }

  static updateByModifyingItem = async (userId: string, item: ICartItem) => {
    const { product: productId, quantity, ...args } = item
    const filter = {
      user: userId,
      items: {
        $elemMatch: {
          product: productId
        }
      },
      status: 'active'
    }
    const update = {
      $set: args,
      $inc: {
        'items.$.quantity': quantity
      }
    }
    const options = {
      new: true
    }
    return await cartModel.findOneAndUpdate(filter, update, options)
  }

  static updateByRemovingItem = async (userId: string, item: ICartItem) => {
    const { product: productId } = item
    const filter = {
      user: userId,
      items: {
        $elemMatch: {
          product: productId
        }
      },
      status: 'active'
    }
    const update = {
      $pull: {
        items: {
          product: productId
        }
      }
    }
    const options = {
      new: true
    }
    return await cartModel.findOneAndUpdate(filter, update, options)
  }
}
