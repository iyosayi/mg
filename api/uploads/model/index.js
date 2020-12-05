import ProfilePicDB from './profilePicDB'
import models from '../../database/models'

const { ProfilePic } = models

const profileDB = ProfilePicDB({ ProfilePic })

export default profileDB