import usersDB from '../../users/model'
import buildMakeProfilePic from './upload-profile'

const makeProfilePic = buildMakeProfilePic({usersDB})

export default makeProfilePic