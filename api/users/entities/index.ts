import buildMakeUserFactory from './user.factory'
import { isValidPassword, isValidEmail, makeSource } from '../../helpers/utils'

const makeUser = buildMakeUserFactory({
  isValidEmail,
  isValidPassword,
  makeSource
})

export default makeUser
