import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostAcceptTransaction = ({ acceptTransaction }) => {
  return wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const result = await acceptTransaction({ ref })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Accepted',
      data: result
    })
  })
}

export default makePostAcceptTransaction
