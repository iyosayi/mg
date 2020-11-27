/* eslint-disable no-return-assign */
import requiredParam from '../../helpers/requireParam'

const buildMakeVendorFactory = ({ md5, shortId }) => {
  return function makeLink({
    email = requiredParam('Email'),
    businessName = requiredParam('Business Name'),
    phoneNumber = requiredParam('Phone number'),
    socialMedia,
    username = requiredParam('Username'),
    facebook,
    instagram,
    twitter,
    createdAt = Date.now()
  } = {}) {
    let hash
    let url
    return Object.freeze({
      getEmail: () => email.toLowerCase(),
      getCreated: () => createdAt,
      getBusinessName: () => businessName.toLowerCase(),
      getPhoneNumber: () => phoneNumber,
      getSocialMedia: () => socialMedia,
      getUserName: () => username,
      getHash: () => hash || (hash = makeHash()),
      getUrl: () => url || (url = generateURL()),
      getFacebook: () => facebook,
      getInstagram: () => instagram,
      getTwitter: () => twitter
    })
    function makeHash() {
      return md5(email + username + createdAt)
    }

    function generateURL() {
      return shortId.generate()
    }
  }
}

export default buildMakeVendorFactory
