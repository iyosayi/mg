import {
  InvalidPropertyError,
  RequiredParameterError,
  SendGridError
} from '../../helpers/Errors'
import {
  ID,
  ITransactionDb,
  ITransactionResult
} from '../../transactions/transaction-interfaces/i.transaction'
import { IUserDb, IUserResult } from '../../users/user-interfaces/i.user'
import { URL } from '../../helpers/config'

interface IInprogressDeps {
  transactionDb: ITransactionDb
  usersDb: IUserDb
  sendMail: ({ emailTemplate }: { emailTemplate: void }) => void
  dashboardURL: ({ type, token }: { type: URL; token?: string }) => string
  inProgressEmailTemplate: (
    transactionRecipient: IUserResult,
    transactionInitiator: IUserResult,
    currentTransaction: ITransactionResult,
    url: string
  ) => void
}
const makeInProgressEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  inProgressEmailTemplate
}: IInprogressDeps) => {
  return async function sendInProgressMail({
    referenceId,
    initiatorId
  }: {
    referenceId: string
    initiatorId: string | ID
  }) {
    try {
      /**
       * The initiator of the transaction is meant to get the email stating the recipient is delivering the product or service.
       * The initiator in this case is the incoming user object.
       */
      if (!referenceId) {
        throw new RequiredParameterError('Reference Id')
      }

      if (!initiatorId) {
        throw new RequiredParameterError('Initiator Id')
      }
      const transactionInitiator = await usersDb.findById({ id: initiatorId })
      if (!transactionInitiator) {
        throw new InvalidPropertyError('Transaction initiator does not exist.')
      }
      const currentTransaction = await transactionDb.findByRef({ referenceId })
      if (!currentTransaction) {
        throw new InvalidPropertyError('Transaction does not exist.')
      }
      const { email } = currentTransaction

      const transactionRecipient = await usersDb.findByEmail({ email })
      if (!transactionRecipient) {
        throw new InvalidPropertyError('Transaction recipient does not exist.')
      }
      const url = dashboardURL({ type: 'login' })
      const emailTemplate = inProgressEmailTemplate(
        transactionInitiator,
        transactionRecipient,
        currentTransaction,
        url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error)
    }
  }
}

export default makeInProgressEmail
