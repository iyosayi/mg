import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostTransaction = ({ createTransaction }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { source = {}, ...transactionInfo } = httpRequest.body
    const userId = httpRequest.user.id
    source.ip = httpRequest.ip
    source.browser = httpRequest.headers['User-Agent']
    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer
    }
    const transaction = await createTransaction({
      userId,
      source,
      ...transactionInfo
    })
    return http.apiResponse({
      status: 'OK',
      message: 'Transaction Created',
      data: [transaction],
      statusCode: 201
    })
  })
}

export default makePostTransaction
