import { config } from 'dotenv'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const { NODE_ENV, PORT, LOG_FORMAT, LOG_DIR, ORIGIN, GOERLI_NETWORK } = process.env
