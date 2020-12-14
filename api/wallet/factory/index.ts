import { v4 as uuidv4 } from 'uuid'
import buildMakeWalletFactory from './wallet.factory'

const makeWallet = buildMakeWalletFactory({ uuidv4 })
export default makeWallet
