import { PostController } from '../../http'
import { escrowDeposit } from '../use-cases'
export const postFund = new PostController(escrowDeposit)
