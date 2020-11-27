import { InvalidPropertyError } from '../../helpers/errors'

const makeGetVendor = ({ vendorDb }) => {
  return async function generateLink({ businessName }) {
    const found = await vendorDb.findByUrl({ businessName })
    if (!found) {
      throw new InvalidPropertyError('Link is invalid')
    }
    return found
  }
}

export default makeGetVendor
