const deliveryEmailTemplate = (
  transactionRecipient: {email: string, fullName: string},
  transactionInitiator: {email: string, fullName: string},
  currentTransaction: { title: string; description: string, amount: number, status: string},
  url: string
) => {
  const from = 'imoneyguard@gmail.com'
  const to = transactionRecipient.email
  const username = transactionRecipient.fullName || transactionRecipient.email
  const initiator = transactionInitiator.fullName || transactionInitiator.email
  const subject = 'Your Order has Been Delivered'
  const html = `
    <p>Hi ${username}, ${initiator} has delivered your product, please goto your dashboard and confirm the delivery.</p>
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
  return { from, to, username, initiator, subject, html }
}

export default deliveryEmailTemplate
