import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostTransfer = ({ walletTransfer }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const { ...walletDetails } = httpRequest.body

    await walletTransfer({ id, ...walletDetails })
    return http.apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Transfer successful'
      // data: null
    })
  })
}

export default makePostTransfer
