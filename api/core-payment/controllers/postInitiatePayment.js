import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostPayment = ({ sendMoney }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams
    const toAdd = await sendMoney({ ref, user })
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transfer successful',
      data: toAdd
    })
  })
}

export default makePostPayment
