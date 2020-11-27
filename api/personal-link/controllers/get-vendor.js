import { apiResponse } from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makeGetVendor = ({ getVendor }) => {
  return wrapAsync(async (httpRequest) => {
    const { businessName } = httpRequest.pathParams

    const vendor = await getVendor({ businessName })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Vendor',
      data: [vendor]
    })
  })
}

export default makeGetVendor
