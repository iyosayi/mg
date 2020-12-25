import moment from 'moment'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import {
  ITransactionUtils,
  ITransactionFactory
} from '../transaction-interfaces/i.transaction'

const buildMakeTransactionFactory = ({
  makeSource,
  isValidEmail,
  uuidv4,
  upperFirst,
  shortid
}: ITransactionUtils) => {
  return function makeTransaction({
    phoneNumber,
    email,
    title,
    description,
    currency,
    dueDate,
    source,
    amount,
    type,
    chargeBearer
  }: // createdOn = Date.now(),
  // modifiedOn = Date.now()
  ITransactionFactory) {
    if (!phoneNumber) {
      throw new RequiredParameterError('Phone number')
    }
    if (!email) {
      throw new RequiredParameterError('Email')
    }
    if (!title) {
      throw new RequiredParameterError('Title')
    }
    if (!description) {
      throw new RequiredParameterError('Description')
    }
    if (!dueDate) {
      throw new RequiredParameterError('Due date')
    }
    if (!amount) {
      throw new RequiredParameterError('Amount')
    }
    if (!type) {
      throw new RequiredParameterError('Type')
    }
    if (!chargeBearer) {
      throw new RequiredParameterError('Charge Bearer')
    }
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Email is invalid')
    }
    if (typeof amount !== 'number' || amount <= 100) {
      throw new InvalidPropertyError(
        'Amount is must be a valid number and must be greater than 100.'
      )
    }

    let referenceId: string
    let partyId: string
    let inspectionPeriod = 3
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
      getCurrency: () => currency,
      getInspectionPeriod: () => validInspectionPeriod,
      getDueDate: () => validDueDate,
      getSource: () => validSource,
      getAmount: () => amount * 100,
      getRef: () => referenceId || (referenceId = makeReference()),
      getType: () => type,
      getCharge: () => chargeBearer,
      // getCreatedOn: () => createdOn,
      // getModifiedOn: () => modifiedOn,
      getPartyId: () => partyId || (partyId = makePartyId())
    })
  }
}

export default buildMakeTransactionFactory
