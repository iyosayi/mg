// import makePostUser from './post-user'
// import makeDeleteUser from './delete-user'
// import makePatchUser from './patch-user'
import { addUser,  editUser } from '../use-cases'

// const postUser = makePostUser({ addUser })
// const deleteUser = makeDeleteUser({ removeUser })
// const patchUser = makePatchUser({ editUser })

// export { postUser, deleteUser, patchUser }

import { PostController, PatchController } from '../../http'
const postUser = new PostController(addUser)
const patchUser = new PatchController(editUser)

export { postUser, patchUser }
