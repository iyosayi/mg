import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostPayment = ({ sendMoney }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams
    const toAdd = await sendMoney({ ref, user })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transfer successful',
      data: toAdd
    })
  })
}

export default makePostPayment
