  import makeExpressCallback from '../express'
  import { multerUploads } from '../configuration/multer/multer';
  import { postUser } from '../users/controllers'
  import { uploadProfilePic } from '../uploads/controllers'

  export const path = '/api/v1/users'
  export function config(router) {
    router
      .get('/', (req, res) => res.json({ msg: 'Hello' }))
      .post('/', makeExpressCallback(postUser))
      .post('/upload-profile-pic',  makeExpressCallback(uploadProfilePic))
    return router
  }
