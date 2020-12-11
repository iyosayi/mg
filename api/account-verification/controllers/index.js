/* eslint-disable import/prefer-default-export */
import makeGetVerifyBankAccount from './get.bank.acc'
import { verifyBankAccount } from '../use-case'

export const getVerifiedBank = makeGetVerifyBankAccount({ verifyBankAccount })
