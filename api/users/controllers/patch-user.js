import { HttpUtils } from 'mguard-utils'

const http = new HttpUtils()

const makePatchUser = ({ editUser }) => {
  return http.wrapAsync(async (httpRequest) => {
    let { ...userInfo } = httpRequest.body
    const toEdit = { ...userInfo, id: httpRequest.pathParams.id }
    const user = await editUser(toEdit)
    return http.apiResponse({
      status: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: user
    })
  })
}
export default makePatchUser
