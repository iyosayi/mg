import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostInProgress = ({ inProgress }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await inProgress({ user, ref })
    return http.apiResponse({
      status: true,
      message: 'Transaction in Progress',
      statusCode: 200,
      data: null
    })
  })
}

export default makePostInProgress
