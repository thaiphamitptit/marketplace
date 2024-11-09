import InventoryRepository from '@/repositories/inventory.repository'
import ProductRepository from '@/repositories/product.repository'
import {
  CreateNewInventoryDto,
  GetHighStockInventoriesDto,
  GetInventoriesDto,
  SearchInventoriesDto,
  UpdateInventoryDto
} from '@/shared/dtos/inventory.dto'
import { BadRequest, Forbidden, NotFound } from '@/shared/responses/error.response'
import { unGetInfoData } from '@/shared/utils'
import {
  ICreateNewInventoryDto,
  IGetHighStockInventoriesDto,
  IGetInventoriesDto,
  ISearchInventoriesDto,
  IUpdateInventoryDto
} from '@/shared/types/inventory'
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

  static deleteInventory = async (inventoryId: string) => {
    /** Check inventory exists or not */
    const inventory = await InventoryRepository.findById(inventoryId)
    if (!inventory) {
      throw new NotFound({
        message: ErrorMessages.INVENTORY_NOT_FOUND
      })
    }
    /** Check inventory has reservations or not */
    const { product: productId, stock, reservations } = inventory
    if (reservations && reservations.length > 0) {
      throw new Forbidden({
        message: ErrorMessages.INVENTORY_CAN_NOT_DELETED
      })
    }
    /** Update ref product */
    await ProductRepository.updateByModifyingStock(productId, -stock)
    /** Delete inventory */
    const deletedInventory = await InventoryRepository.deleteById(inventoryId)
    if (!deletedInventory) {
      throw new NotFound({
        message: ErrorMessages.INVENTORY_NOT_FOUND
      })
    }

    return {
      inventory: inventoryId
    }
  }

  static getInventory = async (inventoryId: string) => {
    /** Get inventory */
    const foundInventory = await InventoryRepository.findById(inventoryId)
    if (!foundInventory) {
      throw new NotFound({
        message: ErrorMessages.INVENTORY_NOT_FOUND
      })
    }
    /** Populate inventory */
    const paths = [
      {
        path: 'product',
        select: ['name', 'thumb', 'pricing', 'rating']
      }
    ]
    const populatedInventory = await foundInventory.populate(paths)

    return {
      inventory: unGetInfoData(populatedInventory.toObject(), ['__v'])
    }
  }

  static getInventories = async (dto: IGetInventoriesDto) => {
    /** Get inventories combined filter and pagination */
    const getInventoriesDto = new GetInventoriesDto({
      ...dto
    })
    const { page, limit } = getInventoriesDto
    const foundInventories = await InventoryRepository.findByFilterAndPagination(getInventoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      inventories: foundInventories
    }
  }

  static searchInventories = async (dto: ISearchInventoriesDto) => {
    /** Search inventories combined filter and pagination */
    const searchInventoriesDto = new SearchInventoriesDto({
      ...dto
    })
    const { page, limit } = searchInventoriesDto
    const foundInventories = await InventoryRepository.findByKeywordFilterAndPagination(searchInventoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      inventories: foundInventories
    }
  }

  static getHighStockInventories = async (dto: IGetHighStockInventoriesDto) => {
    /** Get high stock inventories combined filter and pagination */
    const { filter } = dto
    const getHighStockInventoriesDto = new GetHighStockInventoriesDto({
      ...dto,
      filter: {
        ...filter,
        $expr: {
          $gt: ['$stock', '$threshold']
        }
      }
    })
    const { page, limit } = getHighStockInventoriesDto
    const highStockInventories = await InventoryRepository.findByFilterAndPagination(getHighStockInventoriesDto)

    return {
      pagination: {
        page,
        limit
      },
      inventories: highStockInventories
    }
  }
}
