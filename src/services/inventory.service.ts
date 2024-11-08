import InventoryRepository from '@/repositories/inventory.repository'
import ProductRepository from '@/repositories/product.repository'
import { CreateNewInventoryDto, UpdateInventoryDto } from '@/shared/dtos/inventory.dto'
import { BadRequest, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewInventoryDto, IUpdateInventoryDto } from '@/shared/types/inventory'
import { ErrorMessages } from '@/shared/constants'

export default class InventoryService {
  static createNewInventory = async (dto: ICreateNewInventoryDto) => {
    const { product: productId, stock } = dto
    const [product, inventory] = await Promise.all([
      ProductRepository.findByIdAndStatus(productId, 'publish'),
      InventoryRepository.findByProduct(productId)
    ])
    /** Check product exists or not */
    if (!product) {
      throw new BadRequest({
        message: ErrorMessages.PRODUCT_NOT_FOUND
      })
    }
    /** Check inventory exists or not */
    if (inventory) {
      throw new BadRequest({
        message: ErrorMessages.INVALID_PRODUCT
      })
    }
    /** Create new inventory */
    const createNewInventoryDto = new CreateNewInventoryDto({
      ...dto
    })
    const newInventory = await InventoryRepository.createNew(createNewInventoryDto)
    /** Update ref product */
    await ProductRepository.updateByModifyingStock(productId, stock)
    /** Populate inventory */
    const paths = [
      {
        path: 'product',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    const populatedInventory = await newInventory.populate(paths)

    return {
      inventory: unGetInfoData(populatedInventory.toObject(), ['__v'])
    }
  }

  static updateInventory = async (inventoryId: string, dto: IUpdateInventoryDto) => {
    /** Update inventory */
    const updateInventoryDto = new UpdateInventoryDto({
      ...dto
    })
    const updatedInventory = await InventoryRepository.updateById(inventoryId, updateInventoryDto)
    if (!updatedInventory) {
      throw new NotFound({
        message: ErrorMessages.INVENTORY_NOT_FOUND
      })
    }
    const { offset } = dto
    if (offset) {
      /** Update ref product */
      const { product: productId } = updatedInventory
      await ProductRepository.updateByModifyingStock(productId, offset)
    }
    /** Populate inventory */
    const paths = [
      {
        path: 'product',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    const populatedInventory = await updatedInventory.populate(paths)

    return {
      inventory: unGetInfoData(populatedInventory.toObject(), ['__v'])
    }
  }
}
