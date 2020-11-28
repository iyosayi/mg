import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostCreateWallet = ({ createWallet }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const wallet = await createWallet({ user })
    return http.apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: [{ wallet }]
    })
  })
}

export default makePostCreateWallet
