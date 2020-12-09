/* eslint-disable no-console */
import ipRegex from 'ip-regex'

interface ValidIp {
  isValidIp(ip: string): boolean
}
// To get the ip address of the buyer
const buildMakeSource = ({ isValidIp }: ValidIp) => {
  return function makeSource({
    ip,
    browser,
    referrer
  }: {
    ip: string
    browser: string
    referrer: string | undefined
  }): object {
    if (!isValidIp(ip)) {
      throw new Error('Source must have a valid ip.')
    }

    if (!ip) {
      throw new Error('Source must have an ip.')
    }

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    })
  }
}

const isValidIp = (ip: string) => {
  return ipRegex({ exact: true }).test(ip)
}

// Final export of the makeSource function.
const makeSource = buildMakeSource({ isValidIp })

/**
 * Utitlity functions,
 * To capitalize the first letter
 */

const upperFirst = (word: string): string => {
  if (word.length === 1) {
    return word
  }

  return word[0].toUpperCase() + word.substring(1)
}

/**
 * Email and Password Validation
 * Using RegExp
 */

const isValidEmail = (email: string) => {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  return valid.test(email)
}

const isValidPassword = (password: string) => {
  const validate = new RegExp(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
  )
  return validate.test(password)
}

const isValidAmount = (amount: string) => {
  const valid = new RegExp(/^[0-9]+$/)
  return valid.test(amount)
}

export { makeSource, upperFirst, isValidEmail, isValidAmount, isValidPassword }
