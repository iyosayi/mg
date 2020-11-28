import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostAcceptTransaction = ({ acceptTransaction }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const result = await acceptTransaction({ ref })
    console.log(result)
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Accepted',
      data: result
    })
  })
}

export default makePostAcceptTransaction
