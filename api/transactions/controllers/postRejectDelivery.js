import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostRejectDeliveredTransaction = ({ rejectDeliveredTransaction }) => {
  return wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    await rejectDeliveredTransaction({ ref })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Delivery Rejected',
      data: null
    })
  })
}

export default makePostRejectDeliveredTransaction
