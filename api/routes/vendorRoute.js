import makeExpressCallback from '../express'
import { getVendorLink, postLink } from '../personal-link/controllers'

export const path = '/api/v1/vendor'
export function config(router) {
  router
    .post('/store/new', makeExpressCallback(postLink))
    .get('/store/:businessName', makeExpressCallback(getVendorLink))
  return router
}
