import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostReleaseFunds = ({ releaseFunds }) => {
  return wrapAsync(async (httpRequest) => {
    const { referenceId } = httpRequest.pathParams
    const response = await releaseFunds({ referenceId })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transfer successful',
      data: response
    })
  })
}

export default makePostReleaseFunds
