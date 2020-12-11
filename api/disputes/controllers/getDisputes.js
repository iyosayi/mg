import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makeGetDisputes = ({ listDisputes }) => {
  return wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user
    const disputes = await listDisputes({ id })
    return apiResponse({
      status: true,
      message: 'Transaction Disputes',
      data: [disputes],
      statusCode: 200
    })
  })
}

export default makeGetDisputes
