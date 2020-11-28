import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeGetDisputes = ({ listDisputes }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const disputes = await listDisputes({ id })
    return http.apiResponse({
      status: true,
      message: 'Transaction Disputes',
      data: [disputes],
      statusCode: 200
    })
  })
}

export default makeGetDisputes
