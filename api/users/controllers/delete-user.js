import apiResponse from '../../helpers/http-response'
import wrapAsync from '../../helpers/try-catch-handler'

const makeDeleteUser = ({ removeUser }) => {
  return wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.pathParams
    const deleted = await removeUser({ id })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'User deleted',
      data: deleted
    })
  })
}

export default makeDeleteUser
