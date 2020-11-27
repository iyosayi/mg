import makeVendorLink from './create-link'
import makeGetVendor from './get-vendor'
import usersDb from '../../users/model'
import vendorDb from '../models'

const vendorLink = makeVendorLink({ usersDb, vendorDb })
const getVendor = makeGetVendor({ vendorDb })
export { vendorLink, getVendor }
