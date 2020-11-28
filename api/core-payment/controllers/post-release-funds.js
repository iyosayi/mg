import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostReleaseFunds = ({ releaseFunds }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { referenceId } = httpRequest.pathParams
    const response = await releaseFunds({ referenceId })
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transfer successful',
      data: response
    })
  })
}

export default makePostReleaseFunds
