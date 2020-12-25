import { SendGridError, InvalidPropertyError } from '../../helpers/Errors'
import {
  ITransactionDb,
  ITransactionResult
} from '../../transactions/transaction-interfaces/i.transaction'
import { IUserDb, ID, IUserResult } from '../../users/user-interfaces/i.user'
import { URL } from '../../helpers/config'

interface ICreateTransactionTemplate {
  emailTemplate: void
}

interface UserToken {
  id: string | ID
  email: string
}

interface ITransactionInput {
  transactionDb: ITransactionDb
  usersDb: IUserDb
  sendMail: ({ emailTemplate }: ICreateTransactionTemplate) => void
  dashboardURL: ({
    type,
    token
  }: {
    type: URL
    token?: string
  }) => string
  createTransactionTemplate: (
    recipientMail: string,
    currentTransaction: ITransactionResult,
    transactionInitiator: IUserResult,
    url: string
  ) => void
}

const buildMakeSendTransaction = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  createTransactionTemplate
}: ITransactionInput) => {
  return async function sendTransactionMail({
    newTransaction,
    userId
  }: {
    newTransaction: ITransactionResult
    userId: string
  }) {
    try {
      const transactionInitiator = await usersDb.findById({ id: userId })
      if (!transactionInitiator) {
        throw new InvalidPropertyError('Transaction Initiator does not exist.')
      }
      const currentTransaction = await transactionDb.findById({
        id: newTransaction._id
      })

      if (!currentTransaction) {
        throw new InvalidPropertyError('Transaction does not exist.')
      }
      const { email } = currentTransaction
      const transactionRecipient = await usersDb.findByEmail({ email })
      const recipientMail = currentTransaction.email
      
      /**
       * This checks if the transaction recipient exists already in the database.
       * If the recipient is not signed-up yet, a signup url is created dynamically and
       * sent to his/her mail box.
       */
      let createSignupUrl: string
      if (!transactionRecipient) {
        createSignupUrl = dashboardURL({
          type: 'signup',
        })
      }

      /**
       * If the recipient exists in the database already, a login link
       * is generated and sent to him/her
       */
      const transactionRecipientExistsUrl = dashboardURL({
        type: 'login'
      })


      const url = transactionRecipient
        ? transactionRecipientExistsUrl
        : // @ts-ignore
          createSignupUrl
      const emailTemplate = createTransactionTemplate(
        recipientMail,
        currentTransaction,
        transactionInitiator,
        url
      )
      return sendMail({ emailTemplate })
    } catch (error) {
      console.log(error)
      throw new SendGridError(error)
    }
  }
}

export default buildMakeSendTransaction
