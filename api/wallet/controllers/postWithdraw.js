import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostWithdraw = ({ walletWithdraw }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest

    await walletWithdraw({ user, ...walletDetails })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Withdrawal Successful',
      data: null
    })
  })
}

export default makePostWithdraw
