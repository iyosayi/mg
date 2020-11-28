import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostDepositEscrow = ({ depositEscrow }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { user } = httpRequest
    const { ...details } = httpRequest.body

    await depositEscrow({ user, ...details })
    return http.apiResponse({
      status: true,
      message: 'Payment Successful',
      data: null,
      statusCode: 200
    })
  })
}

export default makePostDepositEscrow
