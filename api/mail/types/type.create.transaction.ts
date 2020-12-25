import dotenv from 'dotenv'
import { urlGenerator } from '../../helpers/config'
import { ITransactionResult } from '../../transactions/transaction-interfaces/i.transaction'
import { IUserResult } from '../../users/user-interfaces/i.user'

dotenv.config()

const getTransactionEmailURL = () =>
  process.env.EMAIL_ENV === 'production'
    ? urlGenerator('signup')
    : `http://localhost:3000/signup`

const createTransactionTemplate = (
  recipientMail: string,
  currentTransaction: ITransactionResult,
  transactionInitiator: IUserResult,
  url: string
) => {
  const from = 'imoneyguard@gmail.com'
  const to = recipientMail
  const username = recipientMail
  const name = transactionInitiator.email || transactionInitiator.fullName
  const subject = 'You have a new transaction pending'
  const html = `
    <p>Hi ${username}, you have a new transaction from ${name} awaiting your confirmation.</p>
    <p>Click this link to accept the transaction <a href=${url}>${url}</a></p>
    <p>Here is the summary of the transaction details.</p>

    <table> 
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Status</th>
    </tr> 
    <tr>
      <td>${currentTransaction.title}</td> 
      <td>${currentTransaction.description}</td>
      <td>${currentTransaction.amount / 100}</td>
      <td>${currentTransaction.status}</td>
    <tr>
  </table>

    <p>Please click this link to access your dashboard to accept this transaction.</p>

    <p>Thank you</p> 
    <p>MoneyGuard</p>
  `
  return { from, to, username, name, subject, html }
}

export { getTransactionEmailURL, createTransactionTemplate }
