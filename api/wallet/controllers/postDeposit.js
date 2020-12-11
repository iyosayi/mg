import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostDeposit = ({ walletDeposit }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest
    const userId = user.id
    const deposit = await walletDeposit({ ...walletDetails, userId })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Deposit successful',
      data: [{ deposit }]
    })
  })
}

export default makePostDeposit
