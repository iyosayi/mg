const disputeMailTemplate = (receiver, sender, transaction, url) => {
  const from = 'imoneyguard@gmail.com'
  const to = receiver.email
  const username = receiver.fullName ? receiver.fullName :  'there'
  const name = sender.fullName ? sender.fullName : sender.email
  const subject = `${username} Has Created A Dispute Regarding Your Product`
  const html = `
    <p>Hi ${username}, ${name} has created a dispute regarding the product which is ${
    transaction.title
  }.
    <p>Please login to your dashboard to see reasons why, as well as contact ${name} to settle the issue.</p>
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

export default disputeMailTemplate
