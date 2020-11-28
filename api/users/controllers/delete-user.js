import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makeDeleteUser = ({ removeUser }) => {
  return http.wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.pathParams
    const deleted = await removeUser({ id })
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'User deleted',
      data: deleted
    })
  })
}

export default makeDeleteUser
