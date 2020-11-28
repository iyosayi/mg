import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostDeposit = ({ walletDeposit }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest
    const userId = user.id
    const deposit = await walletDeposit({ ...walletDetails, userId })
    return http.apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Deposit successful',
      data: [{ deposit }]
    })
  })
}

export default makePostDeposit
