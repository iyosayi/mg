import wrapAsync from '../../helpers/try-catch-handler'
import { apiResponse } from '../../helpers/http-response'

const uploadProfilePic = ({ profileUpload }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...info } = httpRequest.body
    const { image } = info
    const toPost = { ...info, image, id: httpRequest.pathParams.id  }
    const imageRet = await profileUpload(toPost)
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'User Profile Picture Uploaded',
      data: [imageRet]
    })
  })
}

export default uploadProfilePic
