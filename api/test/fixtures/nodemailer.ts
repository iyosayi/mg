import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'a72beb37af634f',
    pass: '64fae9831d984c'
  }
})

export const sendMail = ({ emailTemplate }: { emailTemplate: any }) => {
  return transport.sendMail(emailTemplate)
}
