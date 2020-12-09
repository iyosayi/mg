import { AddUser } from './add-user'

// import makeEditUser from './edit-user'
// import makeRemoveUser from './remove-user'
// import makeListUser from './list-user'
import usersDb from '../model'

const postMethod = new AddUser(usersDb)

// const addUser = makeAddUser({ usersDb })
// const editUser = makeEditUser({ usersDb })
// const removeUser = makeRemoveUser({ usersDb })
// const listUser = makeListUser({ usersDb })

export { postMethod }
