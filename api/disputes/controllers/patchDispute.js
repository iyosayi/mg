import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePatchDispute = ({ editDispute }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ...changes } = httpRequest.body
    const { id } = httpRequest.pathParams
    await editDispute({ id, ...changes })
    return http.apiResponse({
      status: true,
      message: 'Dispute Updated',
      data: null,
      statusCode: 200
    })
  })
}

export default makePatchDispute
