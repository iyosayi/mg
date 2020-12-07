import uploadProfilePic from './profile-pic-user'
import { addProfilePic } from '../use-cases'

const profileUpload = uploadProfilePic({addProfilePic})
console.log(typeof profileUpload)

// const picController = Object.freeze({
//     uploadProfilePic
// })

// export default picController
export { profileUpload }