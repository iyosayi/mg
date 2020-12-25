import { v4 as uuidv4 } from 'uuid'
import buildMakeEscrowDetails from './escrow.factory'

const makeEscrow = buildMakeEscrowDetails({ uuidv4 })

export default makeEscrow
