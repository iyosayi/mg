import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeGetWalletHistory = ({ walletHistory }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const wallet = await walletHistory({ id })
    return http.apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: wallet
    })
  })
}

export default makeGetWalletHistory
