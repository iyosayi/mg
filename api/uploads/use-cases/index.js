import makeUploadProfilePic from './profile-pic-user'
import handleUrl from '../../configuration/cloudinary/cloudinary'
import imageDB from '../model'

const addProfilePic = makeUploadProfilePic({ imageDB, handleUrl })
console.log(typeof addProfilePic)

// const profileService = Object.freeze({
//     addProfilePic
// })

// export default profileService
export { addProfilePic }