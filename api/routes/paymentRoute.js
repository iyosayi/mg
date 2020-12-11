import makeExpressCallback from '../express'
import { postDepositEscrow } from '../transactions/controllers'
import decodeToken from '../middleware/auth'

export const path = '/api/v1/payment'

export function config(router) {
  router.post(
    '/paystack/callback',
    makeExpressCallback(decodeToken(postDepositEscrow))
  )
  return router
}
