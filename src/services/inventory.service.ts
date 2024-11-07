import InventoryRepository from '@/repositories/inventory.repository'
import ProductRepository from '@/repositories/product.repository'
import { CreateNewInventoryDto } from '@/shared/dtos/inventory.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import { ICreateNewInventoryDto } from '@/shared/types/inventory'
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
}
