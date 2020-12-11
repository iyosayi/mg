const transactionEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'imoneyguard@gmail.com'
  const to = receiver.email
  const username = receiver.fullName || 'there'
  const name = sender.fullName
  const subject = 'Your Transaction Has Been Accepted'
  const html = `
    <p>Hi ${username}, ${name} has accepted your transaction, you can go ahead and make payment on your dashboard.</p>
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
        <td>${transaction.title}</td>
        <td>${transaction.description}</td>
        <td>${transaction.amount / 100}</td>
        <td>${transaction.status}</td>
      <tr>
    </table>

    <p>Thank you</p>
    <p>MoneyGuard</p>
  `
  return { from, to, username, name, subject, html }
}

export default transactionEmailTemplate
