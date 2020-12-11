const makeVerifyEmail = ({ decodeToken, usersDb }) => {
  return async function verifyEmail({ ...details } = {}) {
    const toDecode = decodeToken(details.token)
    console.log({toDecode})
    let { isVerified, userId } = toDecode
    isVerified = true
    return usersDb.update({
      isVerified,
      id: userId
    })
  }
}

export default makeVerifyEmail
 