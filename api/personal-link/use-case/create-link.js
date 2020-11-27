/**
 * To create a personal link as a vendor, what do I need to achieve that?
 * 1) I could use my email to signup which when then use the crypto library to generate a string
 *    that has my email and business phoneNumber details embedded in it which is encrypted and decrypted to be sure my email
 *    ana business phoneNumber is embedded in that link.
 *
 * What details should the link have?
 * 1) Email
 * 3) Buisness Name
 * 4) Social Media handle/names
 * 5) Vendor's personal details
 * 6) Wallet - When the vendor updates personal details, the wallet and transactions will appear
 * 7) Transactions (Pending and Completed) - History
 *
 * ==========CUSTOMER==============
 * What is the transaction flow like?
 * 1) First, I as the customer should be able to visit that link.
 * 2) Upon when the page has loaded, I should be able to see
 *    a) Vendor's Business name
 *    b) Social Media Name - if provided
 *    c) A form that has the following fields
 *       a) My name as the customer
 *       b) My email
 *       c) My Phone number
 *       d) The description of what I am purchasing
 *       e) The inspection period
 *       f) The due date and the amount I am meant to Pay
 *
 * 3) Upon successful payment, I and the Vendor should be notified immediately via Phone number and Email
 *    that I have paid XYZ amount into Escrow
 * 4) The transaction Reference should be sent to my email and phone number
 *
 * ===========VENDOR===========
 * 1) I as the vendor, upon successful signup I should be able to see an overview of how much I have gotten so far
 * 2) I should see 4 tabs which have the following names -
 *    a) Pending
 *    b) On-going which also entails Delivered
 *    c) Completed
 *    d) Total Transactions
 * 3) When I click on a certain transaction Information, I should be able so see the following.
 *    a) The name of the customer
 *    b) How much was paid by the customer
 *    c) The date when the transaction was initiated and when it was completed.
 *
 */

import { UniqueConstraintError } from '../../helpers/errors'
import makeVendor from '../factory'

const makeVendorLink = ({ usersDb, vendorDb }) => {
  return async function vendorLink(details) {
    const validParam = makeVendor(details)
    const exists = await usersDb.findByEmail({ email: validParam.getEmail() })
    const found = await vendorDb.findByEmail({ email: validParam.getEmail() })
    if (exists) {
      throw new UniqueConstraintError('Email')
    }

    if (found) {
      throw new UniqueConstraintError('Email')
    }
    return vendorDb.insert({
      email: validParam.getEmail(),
      createdAt: validParam.getCreated(),
      businessName: validParam.getBusinessName(),
      phoneNumber: validParam.getPhoneNumber(),
      socialMedia: {
        facebook: validParam.getFacebook(),
        twitter: validParam.getTwitter(),
        instagram: validParam.getInstagram()
      },
      username: validParam.getUserName(),
      hash: validParam.getHash(),
      url: validParam.getUrl()
    })
  }
}

export default makeVendorLink
