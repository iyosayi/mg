import makeProfilePic from './profile-pic-user'
import handleUrl from '../../configuration/cloudinary/cloudinary'
import imageDB from '../model'

const uploadProfilePicUser = makeProfilePic({ imageDB, handleUrl })
console.log(typeof uploadProfilePicUser)

const profileService = Object.freeze({
    uploadProfilePicUser
})

export default profileService
export { uploadProfilePicUser }