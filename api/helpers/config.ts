import dotenv from 'dotenv'

dotenv.config()

export default process.env.CLOUDAMQP_URL || 'amqp://localhost'

export function urlGenerator(type: string, token?: string) {
  switch (type) {
    case 'dashboard':
      return `https://money-guard.herokuapp.com/dashboard`

    case 'signup':
      return `https://money-guard.herokuapp.com/signup`

    case 'login':
      return `https://money-guard.herokuapp.com/login`

    case 'verify':
      return `https://money-guard.herokuapp.com/email/verify/${token}`
    default:
      return `https://money-guard.herokuapp.com/`
  }
}

export type URL = 'signup' | 'dashboard' | 'login' | 'verify'
export const dashboardURL = ({ type, token }: { type: URL; token?: string }) =>
  process.env.EMAIL_ENV === 'production'
    ? urlGenerator(type, token)
    : `http://localhost:3000/${type}`
