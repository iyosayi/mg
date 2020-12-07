import profilePicFactory from '../factory'
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const makeUploadProfilePic = ({imageDB, handleUrl}) => {
  return async function addProfilePic({
    id = requiredParam('Id'),
    image,
    ...imageDetails
  } = {}){
    profilePicFactory(id, image)
    const { imageName } = imageDetails
    const exists = await imageDB.findByName(imageName)
    if(exists){
      return await imageDB.update({id: exists._id, imageName})
    }

    const url = await handleUrl(image)
    if(url) {
      const finalDetails = {
        imageName,
        image: url.secure_url,
        imageID: url.public_id
      }

      return await uploadImage(finalDetails)
    }

    throw new Error('Could not access server')
  }

  async function uploadImage(...finalDetails){
    const imageUploaded = await imageDB.insert({
      id,
      ...finalDetails,
    })

    if(!imageUploaded){
      throw new InvalidPropertyError('An error occured')
    }

    return imageUploaded
  }
}

//const makeUpload = makeUploadProfilePic()

export default makeUploadProfilePic
