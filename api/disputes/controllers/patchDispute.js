import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePatchDispute = ({ editDispute }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...changes } = httpRequest.body
    const { id } = httpRequest.pathParams
    await editDispute({ id, ...changes })
    return apiResponse({
      status: true,
      message: 'Dispute Updated',
      data: null,
      statusCode: 200
    })
  })
}

export default makePatchDispute
