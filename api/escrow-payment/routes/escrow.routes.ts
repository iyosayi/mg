import { Application } from 'express'
import { postFund } from '../controllers'

export class EscrowRoutes {
  public routes(app: Application): void {
    app.route('/api/v1/deposit').post(postFund.add)
  }
}
