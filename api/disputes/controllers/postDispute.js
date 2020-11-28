import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePostDispute = ({ addDispute }) => {
  return http.wrapAsync(async (httpRequest) => {
    const userId = httpRequest.user.id
    const { ...disputeInfo } = httpRequest.body
    const dispute = await addDispute({ userId, ...disputeInfo })
    return http.apiResponse({
      status: true,
      message: 'Dispute Created',
      data: dispute,
      statusCode: 201
    })
  })
}

export default makePostDispute
