import { Address } from '@prisma/client'
import { AddressService } from './address.service'
import { Chance } from 'chance'

describe('Address Service Test', () => {
  let chance: Chance.Chance

  beforeAll(() => {
    chance = new Chance.Chance()
  })

  it('should request a balance', async () => {
    const service = new AddressService()

    const amount = await service.getAccountBalance('0x55b784c825d79135e6BEE158004a716c077AE746')
    expect(amount).not.toBeUndefined()
  })

  describe('Find addresses', () => {
    it('should successfully return addresses', async () => {
      const service = new AddressService()

      const addresses: Address[] = [
        {
          id: chance.integer({ min: 0, max: 10 }),
          name: chance.string(),
          walletAddress: chance.guid(),
        },
        {
          id: chance.integer({ min: 0, max: 10 }),
          name: chance.string(),
          walletAddress: chance.guid(),
        },
      ]

      const mockFindMany = jest.spyOn(service.address, 'findMany')
      mockFindMany.mockResolvedValue(addresses)

      const returnedAddresses = await service.findAllAddresses()

      expect(returnedAddresses).toMatchObject(addresses)
    })
  })

  describe('Add address', () => {
    it('should throw when param is invalid in addAddress', async () => {
      const service = new AddressService()

      const promise = service.addAddress(null)

      expect(promise).rejects.toThrowError('addressData is empty')
    })
  })

  describe('Delete Address', () => {
    it('should throw when id does not exist', async () => {
      const service = new AddressService()

      const mockFindUnique = jest.spyOn(service.address, 'findUnique')
      mockFindUnique.mockResolvedValue(null)

      const promise = service.deleteAddress(chance.guid())

      expect(promise).rejects.toThrowError("Address doesn't exist")
    })
  })
})
