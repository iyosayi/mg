import { InvalidPropertyError, SendGridError } from '../../helpers/Errors'
import { ITransactionDb } from '../../transactions/transaction-interfaces/i.transaction'
import { IUserDb } from '../../users/user-interfaces/i.user'

interface IDeliveryEmail {
  transactionDb: ITransactionDb
  sendMail: Function
  usersDb: IUserDb
  dashboardURL: Function
  deliveryEmailTemplate: (
    transactionRecipient: { email: string; fullName: string },
    transactionInitiator: { email: string; fullName: string },
    currentTransaction: {
      title: string
      description: string
      amount: number
      status: string
    },
    url: string
  ) => void
}

const makeDeliveryEmail = ({
  transactionDb,
  sendMail,
  usersDb,
  dashboardURL,
  deliveryEmailTemplate
}: IDeliveryEmail) => {
  return async function sendDeliveryEmail({
    referenceId,
    initiatorId
  }: {
    referenceId: string
    initiatorId: string
  }) {
    try {
      const transactionInitiator = await usersDb.findById({ id: initiatorId })
      if (!transactionInitiator) {
        throw new InvalidPropertyError('User does not exist.')
      }
      
      const currentTransaction = await transactionDb.findByRef({ referenceId })
      if (!currentTransaction) {
        throw new InvalidPropertyError('Transaction not found.')
      }
      const transactionRef = currentTransaction.referenceId
      const { email } = currentTransaction
      const transactionRecipient = await usersDb.findByEmail({ email })
      if (!transactionRecipient) {
        throw new InvalidPropertyError('Transaction recipient does not exist.')
      }
      const url = dashboardURL(transactionRef)
      const emailTemplate = deliveryEmailTemplate(
        transactionRecipient,
        transactionInitiator,
        currentTransaction,
        url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error.message)
    }
  }
}

export default makeDeliveryEmail
