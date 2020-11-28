import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostRejectDeliveredTransaction = ({ rejectDeliveredTransaction }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    await rejectDeliveredTransaction({ ref })
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Delivery Rejected',
      data: null
    })
  })
}

export default makePostRejectDeliveredTransaction
