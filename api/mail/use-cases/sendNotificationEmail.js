import { SendGridError } from '../../helpers/errors'

const makeSendNotificationEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  acceptanceEmailTemplate
}) => {
  return async function sendNotificationEmail({ ref, user }) {
    try {
      const receiver = await transactionDb.findByRef({ ref })
      // const transactionRef = receiver.reference
      const {
        status,
        title,
        description,
        amount
      } = receiver
      const transaction = {
        title,
        description,
        amount,
        status
      }
      const url = dashboardURL()
      const emailTemplate = acceptanceEmailTemplate(
        receiver,
        user,
        transaction,
        url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error.message)
    }
  }
}

export default makeSendNotificationEmail
