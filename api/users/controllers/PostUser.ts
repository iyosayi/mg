import { PostController } from '../../http/Post'
import { addUser,  } from '../use-cases'

// const post = postMethod.add
export const postUser = new PostController(addUser)

// console.log(postUser.add)
