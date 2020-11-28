import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostWithdraw = ({ walletWithdraw }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest

    await walletWithdraw({ user, ...walletDetails })
    return http.apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Withdrawal Successful',
      data: null
    })
  })
}

export default makePostWithdraw
