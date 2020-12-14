import { Application } from 'express'
import { postUser, patchUser, getUser } from '../controllers'

export class UserRoutes {
  public routes(app: Application): void {
    app
      .route('/api/v1/users')
      .get(getUser.get)
      .post(postUser.add)
      .patch(patchUser.update)
  }
}
