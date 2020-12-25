import { v4 as uuidv4 } from 'uuid'
import shortid from 'shortid'
import { makeSource, upperFirst, isValidEmail } from '../../helpers/utils'
import buildMakeTransactionFactory from './transaction.factory'

const makeTransaction = buildMakeTransactionFactory({
  makeSource,
  upperFirst,
  uuidv4,
  isValidEmail,
  shortid
})
export default makeTransaction
