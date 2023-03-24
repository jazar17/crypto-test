import { AddressController } from '@controllers/address.controller'
import { Routes } from '@interfaces/routes.interface'
import validationMiddleware from '@middlewares/validation.middleware'
import { Router } from 'express'
import { CreateAddressesDto } from '@/dtos'

export class AddressRoute implements Routes {
  public path = '/addresses'
  public router: Router = Router()
  private addressController = new AddressController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.addressController.getAddresses)
    this.router.get('/get-balance', this.addressController.getBalances)
    this.router.post(`${this.path}`, validationMiddleware(CreateAddressesDto, 'body'), this.addressController.addAddresses)
    this.router.delete(`${this.path}/:addressId`, this.addressController.deleteAddress)
  }
}
