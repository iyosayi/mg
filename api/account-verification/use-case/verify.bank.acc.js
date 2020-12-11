/* eslint-disable camelcase */
import request from 'request'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors'

const { verifyAccount } = require('../../paystack/paystack')(request)

export default function makeVerifyBankAccount({ usersDb }) {
  return async function verifyBankAccount({ userId, ...details }) {
    const { bankAccount } = details
    if (!userId) {
      throw new RequiredParameterError('Id')
    }
    const form = {
      bankAccount
    }
    verifyAccount(form, async (err, body) => {
      if (err) {
        console.error(err)
      }

      let response = JSON.parse(body)
      const { account_name, account_number } = response.data
      const user = await usersDb.findById({ id: userId })
      if (!user) {
        throw new InvalidPropertyError('User does not exist.')
      }
      // const {hasBankVerified} = user
      const fullName = account_name
      const updated = await usersDb.update({
        id: userId,
        fullName,
        bankAccount: account_number,
        hasBankVerified: true
      })
      return updated
    })
  }
}
