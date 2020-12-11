import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makePostDispute = ({ addDispute }) => {
  return wrapAsync(async (httpRequest) => {
    const userId = httpRequest.user.id
    const { ...disputeInfo } = httpRequest.body
    const dispute = await addDispute({ userId, ...disputeInfo })
    return apiResponse({
      status: true,
      message: 'Dispute Created',
      data: dispute,
      statusCode: 201
    })
  })
}

export default makePostDispute
