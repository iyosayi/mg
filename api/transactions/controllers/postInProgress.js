import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostInProgress = ({ inProgress }) => {
  return wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await inProgress({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction in Progress',
      statusCode: 200,
      data: null
    })
  })
}

export default makePostInProgress
