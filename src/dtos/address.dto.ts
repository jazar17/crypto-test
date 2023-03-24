import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'

export class CreateAddressesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[]
}

export class AddressDto {
  @IsString()
  public walletAddress: string

  @IsString()
  public name: string
}

export interface AddressWithBalance {
  walletAddress: string
  balance: string
  name: string
}
