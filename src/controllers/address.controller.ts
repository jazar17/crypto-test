import { Address } from '@prisma/client'
import { AddressService } from '@services/address.service'
import { NextFunction, Request, Response } from 'express'
import { AddressWithBalance, CreateAddressesDto } from '@/dtos'

export class AddressController {
  private addressService: AddressService

  constructor() {
    this.addressService = new AddressService()
    console.log('init controller')
  }

  public getAddresses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addresses: Address[] = await this.addressService.findAllAddresses()

      res.status(200).json(addresses)
    } catch (error) {
      next(error)
    }
  }

  public getBalances = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addresses: AddressWithBalance[] = await this.addressService.findAllAddressesWithAccountBalances()

      res.status(200).json(addresses)
    } catch (error) {
      next(error)
    }
  }

  public addAddresses = async (req: Request<any, any, CreateAddressesDto, any, any>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateAddressesDto = req.body

      const promises: Promise<Address>[] = []
      for (const address of body.addresses) {
        const promise = this.addressService.addAddress(address)
        promises.push(promise)
      }

      const addresses = await Promise.all(promises)

      res.status(201).json(addresses)
    } catch (error) {
      next(error)
    }
  }

  public deleteAddress = async (req: Request<DeleteAddressParam, any, any, any, any>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const address = req.params.addressId
      const deleteUserData: Address = await this.addressService.deleteAddress(address)

      res.status(200).json({ data: deleteUserData, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}

type DeleteAddressParam = {
  addressId: string
}
