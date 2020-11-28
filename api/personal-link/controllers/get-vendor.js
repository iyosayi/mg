import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeGetVendor = ({ getVendor }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { businessName } = httpRequest.pathParams

    const vendor = await getVendor({ businessName })
    return http.apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Vendor',
      data: [vendor]
    })
  })
}

export default makeGetVendor
