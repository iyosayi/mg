import { apiResponse } from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makeGetLink = ({ vendorLink }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...details } = httpRequest.body

    const link = await vendorLink({ ...details })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Vendor Link',
      data: [link]
    })
  })
}

export default makeGetLink
