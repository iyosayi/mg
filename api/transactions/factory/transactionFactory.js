import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const buildMakeTransactionFactory = ({
  makeSource,
  isValidAmount,
  isValidEmail,
  uuidv4,
  upperFirst,
  moment,
  shortid
}) => {
  return function makeTransaction({
    phoneNumber = requiredParam('Phone number'),
    email = requiredParam('Email'),
    title = requiredParam('Transaction Title'),
    description = requiredParam('Transaction Description'),
    dueDate = requiredParam('Due date'),
    source = requiredParam('Source'),
    amount = requiredParam('Amount'),
    type = requiredParam('Type'),
    shippingFee,
    chargeBearer = requiredParam('Charge bearer'),
    productTitle,
    quantity,
    createdOn = Date.now(),
    modifiedOn = Date.now()
  } = {}) {
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Email is invalid')
    }
    if (!isValidAmount(amount)) {
      throw new InvalidPropertyError(
        'Amount is must be a valid number and must be greater than zero.'
      )
    }

    if (shippingFee && !isValidAmount(shippingFee)) {
      throw new InvalidPropertyError(
        'Shipping fee must be a valid number and must be greater than zero.'
      )
    }

    let reference
    let partyId
    let inspectionPeriod = Date.now()
    const validSource = makeSource(source)
    const validInspectionPeriod = moment()
      .add(inspectionPeriod, 'days')
      .valueOf()
    const validDueDate = moment(dueDate).valueOf()

    function makeReference() {
      return uuidv4()
    }

    function makePartyId() {
      return shortid.generate()
    }

    return Object.freeze({
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email.toLowerCase(),
      getTitle: () => upperFirst(title),
      getDesc: () => description,
      getInspectionPeriod: () => validInspectionPeriod,
      getDueDate: () => validDueDate,
      getSource: () => validSource,
      getAmount: () => amount * 100,
      getRef: () => reference || (reference = makeReference()),
      getProductTitle: () => upperFirst(productTitle),
      getQuantity: () => quantity,
      getType: () => type,
      getCharge: () => chargeBearer,
      getShippingFee: () => shippingFee,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getPartyId: () => partyId || (partyId = makePartyId()),
    })
  }
}

export default buildMakeTransactionFactory
