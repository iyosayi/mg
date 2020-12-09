import { PostController } from '../../http/Post'
import { addUser, postMethod } from '../use-cases'

// const post = postMethod.add
export const postUser = new PostController(postMethod)

// console.log(postUser.add)
