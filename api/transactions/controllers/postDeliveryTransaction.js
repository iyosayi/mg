import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostDeliveryTransaction = ({ deliveryComplete }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await deliveryComplete({ user, ref })
    return http.apiResponse({
      status: true,
      message: 'Transaction Delivered',
      data: null,
      statusCode: 200
    })
  })
}

export default makePostDeliveryTransaction
