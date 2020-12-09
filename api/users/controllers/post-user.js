import { apiResponse} from 'mguard-utils'

const http = new HttpUtils()
const makePostUser = ({ addUser }) => {
  return http.wrapAsync(async (httpRequest) => {
    let { source = {}, ...userInfo } = httpRequest.body
    source.ip = httpRequest.ip
    source.browser = httpRequest.headers['User-Agent']
    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer
    }

    const user = await addUser({ source, ...userInfo })

    return http.apiResponse({
      status: true,
      statusCode: 201,
      data: [user],
      message: 'User created'
    })
  })
}

export default makePostUser
