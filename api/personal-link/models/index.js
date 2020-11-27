import model from '../../database/models'
import makeVendorDb from './vendorDb'

const { Vendor } = model
const vendorDb = makeVendorDb({ Vendor })

export default vendorDb
