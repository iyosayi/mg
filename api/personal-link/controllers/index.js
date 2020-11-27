import makeGetLink from './post-link'
import makeGetVendor from './get-vendor'
import { vendorLink, getVendor } from '../use-case'

const postLink = makeGetLink({ vendorLink })
const getVendorLink = makeGetVendor({ getVendor })

export { postLink, getVendorLink }
