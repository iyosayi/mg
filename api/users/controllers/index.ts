import { addUser, editUser, listUser } from '../use-cases'

import { PostController, PatchController, GetController } from '../../http'
const postUser = new PostController(addUser)
const patchUser = new PatchController(editUser)
const getUser = new GetController(listUser)

export { postUser, patchUser, getUser }
