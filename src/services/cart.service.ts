import CartRepository from '@/repositories/cart.repository'
import ProductRepository from '@/repositories/product.repository'
import InventoryRepository from '@/repositories/inventory.repository'
import { CreateNewCartDto } from '@/shared/dtos/cart.dto'
import { IAddItemsToCartDto, IDeleteItemFromCartDto, IUpdateItemInCartDto } from '@/shared/types/cart'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ErrorMessages } from '@/shared/constants'

export default class CartService {
  static addItemsToCart = async (dto: IAddItemsToCartDto) => {
    const { user: userId, items } = dto
    const cartItems = await Promise.all(
      items.map(async (item) => {
        /** Check cart item valid or not */
        const { product: productId, quantity } = item
        const product = await ProductRepository.findByIdAndStatus(productId, 'publish')
        if (!product) {
          throw new BadRequest({
            message: ErrorMessages.INVALID_CART_ITEMS
          })
        }
        /** Check cart item quantity valid or not */
        const { stock } = product
        if (quantity > stock) {
          throw new BadRequest({
            message: ErrorMessages.INVALID_CART_ITEMS_QUANTITY
          })
        }
        /** Update product inventory stock */
        await Promise.all([
          InventoryRepository.updateByModifyingStock(productId, -quantity),
          ProductRepository.updateByModifyingStock(productId, -quantity)
        ])
        return {
          product: productId,
          quantity,
          pricing: product.pricing
        }
      })
    )
    const cart = await CartRepository.findByUserAndStatus(userId, 'active')
    if (!cart || !cart.items.length) {
      /** Create new cart */
      const createNewCartDto = new CreateNewCartDto({
        ...dto,
        items: cartItems
      })
      await CartRepository.createNew(createNewCartDto)
    } else {
      /** Update cart */
      const productIds = cart.items.map((item) => item.product)
      await Promise.all(
        cartItems.map(async (cartItem) => {
          if (productIds.includes(cartItem.product)) {
            await CartRepository.updateByModifyingItem(userId, cartItem)
          } else {
            await CartRepository.updateByAddingItem(userId, cartItem)
          }
        })
      )
    }
    /** Update cart */
    const newCart = await CartRepository.findByUserAndStatus(userId, 'active')
    if (!newCart) {
      throw new NotFound({
        message: ErrorMessages.CART_NOT_FOUND
      })
    }
    /** Update inventory reservations */
    const { _id: cartId } = newCart
    await Promise.all(
      cartItems.map(async (cartItem) => {
        const { product: productId } = cartItem
        const reservation = {
          cart: cartId,
          quantity: cartItem.quantity
        }
        const inventory = await InventoryRepository.findByProductAndReservation(productId, reservation)
        if (!inventory) {
          await InventoryRepository.updateByAddingReservation(productId, reservation)
        } else {
          await InventoryRepository.updateByModifyingReservation(productId, reservation)
        }
      })
    )

    return {
      cart: unGetInfoData(newCart.toObject(), ['__v'])
    }
  }

  static updateItemInCart = async (userId: string, dto: IUpdateItemInCartDto) => {
    const { product: productId, quantity } = dto
    /** Check cart item exists or not */
    const product = await ProductRepository.findByIdAndStatus(productId, 'publish')
    if (!product) {
      throw new NotFound({
        message: ErrorMessages.CART_ITEM_NOT_FOUND
      })
    }
    /** Check cart exists or not */
    const cart = await CartRepository.findByUserAndItemProduct(userId, productId)
    if (!cart) {
      throw new NotFound({
        message: ErrorMessages.CART_NOT_FOUND
      })
    }
    /** Update cart item */
    const { stock } = product
    await Promise.all(
      cart.items.map(async (item) => {
        if (productId === item.product) {
          if (quantity - item.quantity > stock) {
            throw new BadRequest({
              message: ErrorMessages.INVALID_CART_ITEM_QUANTITY
            })
          }
          const cartItem = {
            product: productId,
            quantity: quantity - item.quantity
          }
          await CartRepository.updateByModifyingItem(userId, cartItem)
          /** Update product inventory stock */
          await Promise.all([
            InventoryRepository.updateByModifyingStock(productId, item.quantity - quantity),
            ProductRepository.updateByModifyingStock(productId, item.quantity - quantity)
          ])
          /** Update inventory reservations */
          const { _id: cartId } = cart
          const reservation = {
            cart: cartId,
            quantity: quantity - item.quantity
          }
          await InventoryRepository.updateByModifyingReservation(productId, reservation)
        }
      })
    )
    /** Update cart */
    const updatedCart = await CartRepository.findByUserAndStatus(userId, 'active')
    if (!updatedCart) {
      throw new NotFound({
        message: ErrorMessages.CART_NOT_FOUND
      })
    }
    return {
      cart: unGetInfoData(updatedCart.toObject(), ['__v'])
    }
  }

  static deleteItemFromCart = async (userId: string, dto: IDeleteItemFromCartDto) => {
    const { product: productId } = dto
    /** Check cart item exists or not */
    const product = await ProductRepository.findByIdAndStatus(productId, 'publish')
    if (!product) {
      throw new NotFound({
        message: ErrorMessages.CART_ITEM_NOT_FOUND
      })
    }
    /** Check cart exists or not */
    const cart = await CartRepository.findByUserAndItemProduct(userId, productId)
    if (!cart) {
      throw new NotFound({
        message: ErrorMessages.CART_NOT_FOUND
      })
    }
    /** Update cart item */
    await Promise.all(
      cart.items.map(async (item) => {
        if (productId === item.product) {
          const cartItem = {
            product: productId,
            quantity: item.quantity
          }
          await CartRepository.updateByRemovingItem(userId, cartItem)
          /** Update product inventory stock */
          await Promise.all([
            InventoryRepository.updateByModifyingStock(productId, item.quantity),
            ProductRepository.updateByModifyingStock(productId, item.quantity)
          ])
          /** Update inventory reservations */
          const { _id: cartId } = cart
          const reservation = {
            cart: cartId,
            quantity: item.quantity
          }
          await InventoryRepository.updateByRemovingReservation(productId, reservation)
        }
      })
    )

    return {
      item: productId
    }
  }
}
