import makeExpressCallback from '../express'
import {
  postTransaction,
  getTransactions,
  postAcceptTransaction,
  rejectTransactions,
  postDeliverTransaction,
  postConfirmTransaction,
  postInProgress,
  postRejectDelivery
} from '../transactions/controllers'
import decodeToken from '../middleware/auth'
 
export const path = '/api/v1/transactions'
export function config(router) {
  router
    .get('/', makeExpressCallback(decodeToken(getTransactions))) // get all users transactions
    .post('/', makeExpressCallback(decodeToken(postTransaction))) // post create a transaction
    .patch(
      '/accept-transaction/:ref',
      makeExpressCallback(decodeToken(postAcceptTransaction)) // post accept transaction by recipient
    )
    .patch(
      '/reject-delivery/:ref',
      makeExpressCallback(decodeToken(postRejectDelivery)) // post reject delivery by customer/buyer
    )
    .patch('/reject/:ref', makeExpressCallback(decodeToken(rejectTransactions))) // reject initial transaction request
    .patch(
      '/deliver/:ref',
      makeExpressCallback(decodeToken(postDeliverTransaction)) // post deliver a transaction triggered by seller/recipient
    ) // sets transaction status to deliver
    .patch(
      '/confirm/:ref',
      makeExpressCallback(decodeToken(postConfirmTransaction)) // post confirms transaction by buyer/customer
    )
    .patch('/progress/:ref', makeExpressCallback(decodeToken(postInProgress))) // sets transaction status to in progress
    
  return router
}
