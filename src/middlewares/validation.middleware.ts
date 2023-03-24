import { logger } from '@/utils/logger'
import { HttpException } from '@exceptions/HttpException'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const errors = await validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted })
      if (errors.length > 0) {
        // logger.info({ errors })

        const message = getConstraints(errors)
        logger.info({ message })
        // const message = errors.map((error: ValidationError) => Object.values(error?.constraints)).join(', ')
        next(new HttpException(400, message))
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

const getConstraints = (errors: ValidationError[]): any => {
  let constraints: string[] = []
  for (const error of errors) {
    logger.info({ error })
    if (error.children && error.children.length > 0) {
      constraints = constraints.concat(getConstraints(error.children))
    }

    if (!error.children || error.children.length <= 0) {
      if (error?.constraints) {
        constraints = constraints.concat(Object.values(error?.constraints))
      }
    }
  }

  return constraints
}

export default validationMiddleware
