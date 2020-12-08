import wrapAsync from '../../helpers/try-catch-handler'
import apiResponse from '../../helpers/http-response'


const makeGetTransactions = ({ listTransactions}) => {
  return wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user  
    const transactions = await listTransactions({ id })
    return apiResponse({
      status: true,
      message: 'Transactions',
      data: [transactions],
      statusCode: 200
    })
  })
}

export default makeGetTransactions
