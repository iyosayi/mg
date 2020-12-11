/* eslint-disable import/prefer-default-export */
import makeVerifyBankAccount from './verify.bank.acc'
import usersDb from '../../users/model'

export const verifyBankAccount = makeVerifyBankAccount({ usersDb })
