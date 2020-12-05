import wrapAsync from '../../helpers/try-catch-handler'
import apiResponse from '../../helpers/http-response'

const uploadProfilePic = ({ profilePic }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...info } = httpRequest.body
    const { image } = info
    const imageRet = await profilePic({ ...info, image, id: httpRequest.pathParams.id  })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'User Profile Picture Uploaded',
      data: imageRet
    })
  })
}

export default uploadProfilePic
