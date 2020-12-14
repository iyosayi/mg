import { AddUser } from './add.user'
import { EditUser } from './edit.user'
import { ListUser } from './list.user'
import usersDb from '../model'

const addUser = new AddUser(usersDb)
const editUser = new EditUser(usersDb)
const listUser = new ListUser(usersDb)

export { addUser, editUser, listUser }
