import IndividualUserFactory from './UserFactory'
import {
  makeSource,
  upperFirst,
  isValidPassword,
  isValidEmail
} from '../../helpers/utils'

const userFactory = new IndividualUserFactory(
  upperFirst,
  isValidEmail,
  isValidPassword,
  makeSource
)

export default userFactory
