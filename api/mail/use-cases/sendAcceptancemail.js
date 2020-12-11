import { SendGridError } from '../../helpers/errors'

const makeAcceptanceEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  transactionEmailTemplate
}) => {
  return async function sendAcceptanceEmail({ _id, initiator }) {
    try {
      const receiver = await usersDb.findById({ id: initiator })
      const transactionDetails = await transactionDb.findById({
        id: _id
      })
      const {
        title,
        description,
        amount,
        // reference,
        email,
        status
      } = transactionDetails
      // const transactionRef = reference
      const sender = await usersDb.findByEmail({ email })
      const transaction = {
        title,
        description,
        amount,
        status
      }
      const url = dashboardURL()
      const emailTemplate = transactionEmailTemplate(
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

export default makeAcceptanceEmail
