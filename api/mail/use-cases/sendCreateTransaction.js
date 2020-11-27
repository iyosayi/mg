import { SendGridError } from '../../helpers/errors'

const buildMakeSendTransaction = ({
  transactionDb,
  usersDb,
  sendMail,
  createToken,
  getTransactionEmailURL,
  createTransactionTemplate
}) => {
  return async function sendTransactionMail({ newTransaction, userId }) {
    try {
      const sender = await usersDb.findById({ id: userId })
      const receiver = await transactionDb.findById({ id: newTransaction._id })
      const { email } = receiver
      const exists = await usersDb.findByEmail({ email })
      const toSend = {
        id: receiver._id,
        email: receiver.email,
        emailVerified: receiver.emailVerified
      }
      const transactionRef = createToken(toSend)
      const { title, description, amount, status } = receiver
      const transaction = {
        title,
        description,
        amount,
        status
      }
      const url = getTransactionEmailURL(transactionRef)
      const url2 = 'http://localhost:3000/login'
      const emailTemplate = createTransactionTemplate(
        receiver,
        sender,
        transaction,
        exists ? url2 : url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error.message)
    }
  }
}

export default buildMakeSendTransaction
