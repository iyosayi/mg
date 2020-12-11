import wrapAsync from '../../helpers/try-catch-handler'

const makeGetEmail = ({ verifyEmail }) => {
  return wrapAsync(async (httpRequest) => {
    const { ...details } = httpRequest.pathParams
    const redirect = '/api/v1/email/verify'
    const user = await verifyEmail({ ...details })
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      data: user,
      statusCode: 200,
      redirect
    }
  })
}

export default makeGetEmail
