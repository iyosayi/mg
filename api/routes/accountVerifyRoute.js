import makeExpressCallback from '../express'
import { getVerifiedBank} from '../account-verification/controllers'
import decodeToken from '../middleware/auth'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const path = '/api/v1/verify-account'
export function config(router) {
  router
    .post('/', makeExpressCallback(decodeToken(getVerifiedBank)))
  return router
}