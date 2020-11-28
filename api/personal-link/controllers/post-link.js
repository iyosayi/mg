import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeGetLink = ({ vendorLink }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { ...details } = httpRequest.body

    const link = await vendorLink({ ...details })
    return http.apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Vendor Link',
      data: [link]
    })
  })
}

export default makeGetLink
