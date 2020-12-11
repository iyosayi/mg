import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostDepositEscrow = ({ depositEscrow }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ...details } = httpRequest.body

    await depositEscrow({ user, ...details })
    return apiResponse({
      status: true,
      message: 'Payment Successful',
      data: null,
      statusCode: 200
    })
  })
}
 
export default makePostDepositEscrow
