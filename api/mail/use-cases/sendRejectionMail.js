import { SendGridError } from '../../helpers/errors'

const makeRejectionEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  rejectionEmailTemplate
}) => {
  return async function sendRejectionEmail({ ref, user }) {
    try {
      const receiver = await usersDb.findById({ id: user.id })
      const sender = await transactionDb.findByRef({ ref })
      const transactionRef = sender.reference
      const {
        title,
        description,
        amount,
        status
      } = sender
      const transaction = {
        title,
        description,
        amount,
        status
      }
      const url = dashboardURL(transactionRef)
      const emailTemplate = rejectionEmailTemplate(
        receiver,
        sender,
        transaction,
        url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error.message)
    }
  }
}

export default makeRejectionEmail
