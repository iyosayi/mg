import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostDeliveryTransaction = ({ deliveryComplete }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await deliveryComplete({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction Delivered',
      data: null,
      statusCode: 200
    })
  })
}

export default makePostDeliveryTransaction
