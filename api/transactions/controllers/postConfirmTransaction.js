import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostConfirmTransaction = ({ confirmTransaction }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await confirmTransaction({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction Delivery Confirmed',
      data: null,
      statusCode: 200
    })
  })
}

export default makePostConfirmTransaction
