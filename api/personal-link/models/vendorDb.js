const makeVendorDb = ({ Vendor }) => {
  async function insert({ ...details }) {
    const vendor = new Vendor({ ...details })
    await vendor.save()
    return vendor
  }

  async function findByUrl({ businessName }) {
    return Vendor.findOne({ businessName })
  }

  async function findByEmail({ email }) {
    return Vendor.findOne({ email })
  }

  return Object.freeze({
    insert,
    findByUrl,
    findByEmail
  })
}

export default makeVendorDb
