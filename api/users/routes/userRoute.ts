import { Application } from 'express'
import { postUser } from '../controllers/PostUser'
import {PostController} from '../../http/Post'

export class UserRoutes {
  public routes(app: Application): void {
    app.route('/api/v1/users').post(postUser.add)
  }
}
