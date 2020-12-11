import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostRejectTransaction = ({ rejectTransactionRequest }) => {
  return wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const transaction = await rejectTransactionRequest({ ref })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Rejected',
      data: transaction
    })
  })
}

export default makePostRejectTransaction
