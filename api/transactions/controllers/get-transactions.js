import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeGetTransactions = ({ listTransactions }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const transactions = await listTransactions({ id })
    return http.apiResponse({
      status: true,
      message: 'Transactions',
      data: [transactions],
      statusCode: 200
    })
  })
}

export default makeGetTransactions
