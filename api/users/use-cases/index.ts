import { AddUser } from './add-user'
import {EditUser} from './edit.user'
import usersDb from '../model'

const addUser = new AddUser(usersDb)
const editUser = new EditUser(usersDb)


export { addUser, editUser }
