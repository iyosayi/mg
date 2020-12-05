import makeProfilePic from './profile-pic-user'
import { uploadProfilePicUser } from '../use-cases'

const uploadProfilePic = makeProfilePic({ uploadProfilePicUser })
console.log(typeof uploadProfilePicUser)

const picController = Object.freeze({
    uploadProfilePic
})

export default picController
export { uploadProfilePic }