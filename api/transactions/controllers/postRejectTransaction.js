import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostRejectTransaction = ({ rejectTransactionRequest }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const transaction = await rejectTransactionRequest({ ref })
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Rejected',
      data: transaction
    })
  })
}

export default makePostRejectTransaction
