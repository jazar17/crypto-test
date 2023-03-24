import { HttpException } from '@exceptions/HttpException'
import { Address, Prisma, PrismaClient } from '@prisma/client'
import { isEmpty } from '@utils/util'
import { ethers } from 'ethers'
import { GOERLI_NETWORK } from '@/config'

export class AddressService {
  public address: Prisma.AddressDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>
  private provider: ethers.JsonRpcProvider

  constructor() {
    console.log('init service')
    this.address = new PrismaClient().address
    this.provider = new ethers.JsonRpcProvider(GOERLI_NETWORK, { chainId: 5, name: 'Goerli test network' })
  }

  public async findAllAddresses(): Promise<Address[]> {
    const addresses: Address[] = await this.address.findMany()
    return addresses
  }

  public async findAllAddressesWithAccountBalances(): Promise<Array<Address & { balance: string }>> {
    const addresses: Address[] = await this.address.findMany()

    const promises: Promise<bigint>[] = []
    for (const address of addresses) {
      const promise = this.getAccountBalance(address.walletAddress)
      promises.push(promise)
    }

    const addressesWithBalances = await Promise.all(promises)

    return addresses.map((address, index) => ({ ...address, balance: addressesWithBalances[index].toString() }))
  }

  public async addAddress(addressData: Prisma.AddressCreateInput): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(400, 'addressData is empty')

    const findUser: Address = await this.address.findUnique({ where: { walletAddress: addressData.walletAddress } })
    if (findUser) throw new HttpException(409, `This walletAddress ${addressData.walletAddress} already exists`)

    const createAddressData: Address = await this.address.create({ data: { ...addressData } })
    return createAddressData
  }

  public async deleteAddress(addressId: string): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(400, "Address doesn't exist")

    const findAddress: Address = await this.address.findUnique({ where: { walletAddress: addressId } })
    if (!findAddress) throw new HttpException(409, "Address doesn't exist")

    const deleteAddressData = await this.address.delete({ where: { walletAddress: addressId } })
    return deleteAddressData
  }

  public async getAccountBalance(walletAddress: string): Promise<bigint> {
    try {
      const balance = await this.provider.getBalance(walletAddress)

      return balance
    } catch (error) {
      throw new Error('Error getting balance from the network', { cause: error })
    }
  }
}
