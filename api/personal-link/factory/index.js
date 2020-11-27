import { createHash } from 'crypto'
import shortId from 'shortid'
import buildMakeVendorFactory from './vendorFactory'

function md5(text) {
  return createHash('md5').update(text, 'utf8').digest('hex')
}

const makeVendor = buildMakeVendorFactory({ md5, shortId })
export default makeVendor
