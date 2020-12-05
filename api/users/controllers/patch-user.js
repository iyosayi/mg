import wrapAsync from '../../helpers/try-catch-handler'
import apiResponse from '../../helpers/http-response'

const makePatchUser = ({ editUser }) => {
  return wrapAsync(async (httpRequest) => {
    let { ...userInfo } = httpRequest.body
    const toEdit = { ...userInfo, id: httpRequest.pathParams.id }
    const user = await editUser(toEdit)
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: user
    })
  })
}
export default makePatchUser
