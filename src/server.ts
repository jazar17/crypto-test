import 'reflect-metadata'
import App from '@/app'
import { AddressRoute } from '@routes/address.route'
import validateEnv from '@utils/validateEnv'

validateEnv()

const app = new App([new AddressRoute()])

app.listen()
