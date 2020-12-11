import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostCreateWallet = ({ createWallet }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const wallet = await createWallet({ user })
    return apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: [{ wallet }]
    })
  })
}

export default makePostCreateWallet
