import { ITransactionResult } from '../../transactions/transaction-interfaces/i.transaction'
import { IUserResult } from '../../users/user-interfaces/i.user'

const inProgressEmailTemplate = (
  transactionInitiator: IUserResult,
  transactionRecipient: IUserResult,
  currentTransaction: ITransactionResult,
  url: string
) => {
  const from = 'imoneyguard@gmail.com'
  const to = transactionInitiator.email
  const username = transactionInitiator.fullName || transactionInitiator.email
  const name = transactionRecipient.fullName || transactionRecipient.email
  const subject = 'Your Product/Service is being Delivered'
  const html = `
    <p>Hi ${username}, your product is on its way to you. You will get it on or before the due date assigned</p>
    <p>You can visit your dashboard to see the status of your product.</p>
    <p>Click this link to go to your dashboard <a href=${url}>${url}</a></p>
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

    <p>Thank you</p>
    <p>FastCash</p>
  `
  return { from, to, username, name, subject, html }
}

export default inProgressEmailTemplate
