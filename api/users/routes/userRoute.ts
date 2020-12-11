import { Application } from 'express'
import { postUser, patchUser } from '../controllers'

export class UserRoutes {
  public routes(app: Application): void {
    app.route('/api/v1/users').post(postUser.add)
    app.route('/api/v1/users/:id').patch(patchUser.update)
  }
}
