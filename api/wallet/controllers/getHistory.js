import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makeGetWalletHistory = ({ walletHistory }) => {
  return wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const wallet = await walletHistory({ id })
    return apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: wallet
    })
  })
}

export default makeGetWalletHistory
