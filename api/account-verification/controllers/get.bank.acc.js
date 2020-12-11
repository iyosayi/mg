import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'


const makeGetVerifyBankAccount = ({ verifyBankAccount }) => {
  return wrapAsync(async (httpRequest) => {
    const userId = httpRequest.user.id
    const {...details} = httpRequest.body

    const user = await verifyBankAccount({ userId, ...details })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'User account retrived successfully',
      data: user
    })
  })
}

export default makeGetVerifyBankAccount
